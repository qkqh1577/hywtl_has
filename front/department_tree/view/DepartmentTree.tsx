import React, {createRef, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import produce from 'immer';
import {Box, Button, ListItem, ListItemText} from '@mui/material';
import {
  Apartment as HQIcon,
  ArrowDownwardSharp as ArrowDownwardIcon,
  ArrowForwardSharp as ArrowForwardIcon,
  Badge as PersonIcon,
  Domain as CompanyIcon,
  FlightSharp as FlightIcon,
  Group as PartIcon,
  Groups as TeamIcon,
  GroupWork as ExtraIcon,
  KeyboardTab as DropOverIcon,
  VerticalAlignBottom as DropBottomIcon,
  VerticalAlignTop as DropTopIcon
} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';
import Tree, {BasicDataNode, FieldDataNode} from 'rc-tree';
import {DataNode, EventDataNode, IconType, Key} from 'rc-tree/lib/interface';
import {NodeDragEventParams} from 'rc-tree/lib/contextTypes';
import {DepartmentCategory, ListDepartment} from 'department_tree/entity';
import useDepartment from "../hook";
import {DepartmentChangeTreeParameter, DepartmentTreeParameter} from "../parameter";
import {snackbarAction, SnackbarSeverityType} from "../../components/Snackbar/action";
import {useDispatch} from "react-redux";
import useDialog from "../../dialog/hook";

type Node = Omit<DataNode, 'children'> & { data: ListDepartment, children: Node[] | undefined };

export default function DepartmentTree() {
  const classes = useStyle();
  const treeRef = createRef<Tree>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialog = useDialog();
  const {departmentState: {list}, getAll, changeTree} = useDepartment();

  const openSnackbar = useCallback((message, severity: SnackbarSeverityType = SnackbarSeverityType.warning) => {
    dispatch(snackbarAction.show({message, severity}));
  }, [dispatch]);

  const [root, setRoot] = useState<Node[]>([]);
  const [expend, setExpend] = useState<number[]>([]);
  const [treeHash, setTreeHash] = useState<string | undefined>();

  const toNode = (item: ListDepartment): Node => {
    const children: ListDepartment[] = list ? list.filter(childItem => childItem.parentId === item.id) : [];
    return {
      key: item.id,
      title: (
        <ListItem>
          <ListItemText primary={item.name}/>
        </ListItem>
      ),
      children: children.length === 0 ? undefined : children.map(toNode),
      icon: getIconType(item.category),
      data: item,
    };
  };
  const initRoot = list ? () => list.filter(item => !item.parentId).map(toNode) : [];
  const handler = {
    navigateToList : () => {
      navigate('/admin/department-management');
    },
    cancel: () => {
      dialog.confirm({
        title: '확인',
        children: '작업을 취소하겠습니까? 변경 사항은 반영되지 않습니다',
        confirmText: '작업 취소',
        afterConfirm: () => {
          setRoot(initRoot);
          openSnackbar('취소하였습니다', SnackbarSeverityType.warning);
        }
      });
    },
    submit: () => {
      dialog.confirm({
        title: '확인',
        children: '현재 부서 구조를 저장하겠습니까?',
        confirmText: '저장',
        afterConfirm: () => {
          type Param = DepartmentTreeParameter & { children?: DepartmentTreeParameter[] }
          const loop = (item: Node, index: number, parentId?: number): Param => ({
            id: item.key as number,
            seq: index + 1,
            parentId,
            children: item.children ? item.children.map((child, i) => loop(child, i, item.key as number)) : undefined
          });

          const flatLoop = (itemList: Param[], temp: Param[][] = []): DepartmentTreeParameter[] => {
            temp.push(itemList.map(item => ({...item, children: undefined})));
            itemList.forEach(item => {
              if (item.children && item.children.length > 0) {
                flatLoop(item.children, temp);
              }
            });
            const result: DepartmentTreeParameter[] = [];
            temp.forEach(item => item.forEach(child => result.push(child)));
            return result.sort((a, b) => a.id > b.id ? 1 : -1);
          };
          const params: DepartmentChangeTreeParameter = {
            list: flatLoop(root.map((item, i) => loop(item, i)))
          };
          changeTree(params, () => {
            openSnackbar('저장하였습니다', SnackbarSeverityType.info);
          });
        }
      });
    }
  };

  const onDragStart = (params: NodeDragEventParams) => {
    const {node} = params;
    setRoot(produce(((draft) => draft.map((item) => create(item, ((item) => ({
      icon: item.key === node.key ? <FlightIcon/> : getIconType(item.data.category),
    })))))));
  };
  const onDragEnd = () => {
    setRoot(produce(((draft) => draft.map((item) => create(item, ((item) => ({
      icon: getIconType(item.data.category),
    })))))));
  };

  const onDragInOut = (params: NodeDragEventParams) => {
    const {node} = params;
    const icon = (item: Node): IconType => {
      if (item.key === node.key) {
        if (node.dragOver) {
          return <DropOverIcon/>;
        }
        if (node.dragOverGapBottom) {
          return <DropBottomIcon/>;
        }
        if (node.dragOverGapTop) {
          return <DropTopIcon/>;
        }
      }
      return getIconType(item.data.category);
    };
    setRoot(produce((draft) => draft.map((item) => create(item, ((item) => ({
        icon: icon(item)
      })))
    )));
  };

  const onDrop = (params: NodeDragEventParams & {
    dragNode: EventDataNode<any>;
    dragNodesKeys: Key[];
    dropPosition: number;
    dropToGap: boolean;
  }) => {
    const {dragNode, node, dropToGap} = params;
    const findTarget = flat(root).find(item => item.key === dragNode.key);
    if (!findTarget) {
      openSnackbar('부서 목록 조정 중 오류가 발생했습니다. 화면을 새로고침 후 다시 시도하시길 바랍니다', SnackbarSeverityType.error);
      return;
    }

    const loop = sortTreeData(node, dropToGap, dragNode, findTarget);
    setRoot(
      produce(
        (draft) => draft.filter(
          item => item.key !== dragNode.key
        ).map(loop)
      )
    );
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    setRoot(initRoot);
  }, [list]);

  useEffect(() => {
    if (root.length > 0) {
      const nowHash = hash(root);
      if (treeHash !== nowHash) {
        setTreeHash(nowHash);
      }
      setExpend(flat(root).map(item => item.key as number));
    } else {
      setTreeHash(undefined);
      setExpend([]);
    }
  }, [root]);

  return (
    <>
      <Box sx={{
        width: '100%',
        height: '100%',
      }}>
        <Tree
          className={classes.tree}
          ref={treeRef}
          treeData={root}
          expandedKeys={expend}
          draggable
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragInOut}
          onDragOver={onDragInOut}
          onDragLeave={onDragInOut}
          switcherIcon={(props) => {
            if (props.isLeaf) {
              return false;
            }
            return props.expanded ? <ArrowDownwardIcon/> : <ArrowForwardIcon/>;
          }}
          onExpand={(e, info) => {
            const key: number = info.node.key as number;
            if (expend.includes(key)) {
              setExpend(expend.filter(id => key !== id));
            } else {
              setExpend([...expend, key]);
            }
          }}
        >
        </Tree>
      </Box>
      {list && treeHash !== hash(list.filter(item => !item.parentId).map(toNode)) && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          mt: '40px',
        }}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handler.cancel}
          >
            취소
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handler.submit}
          >
            저장
          </Button>
        </Box>
      )}
    </>
  );
};

const useStyle = makeStyles(() => ({
  tree: {
    display: 'flex',
    width: '100%',
    '& .rc-tree-list-holder': {
      display: 'flex'
    },
    '& [class*="rc-tree-"]': {
      display: 'flex',
    },
    '& .rc-tree-indent > .rc-tree-indent-unit': {
      width: '20px',
    },
    '& .drop-target': {
      color: '#f00'
    },
    '& .rc-tree-treenode.dragging': {
      color: '#0f0',
      backgroundColor: '#999',
    }
  }
}));

type CustomDataNode = {
  key: React.Key;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  loaded: boolean;
  loading: boolean;
  halfChecked: boolean;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  pos: string;
  active: boolean
} & BasicDataNode & {
  key: string | number;
  title?: React.ReactNode | ((data: DataNode) => React.ReactNode)
} & Partial<Record<"children", FieldDataNode<{ key: string | number; title?: React.ReactNode | ((data: DataNode) => React.ReactNode) }>[]>>

function sortTreeData(node: CustomDataNode , dropToGap: boolean, dragNode, findTarget) {
  const loop = (item: Node): Node => {
    if (item.key === node.key) {
      if (!dropToGap) {
        const children = item.children
          ? item.children
            .filter(child => child.key !== dragNode.key)
            .map(loop)
          : [];
        children.push({
          ...findTarget,
          icon: getIconType(findTarget.data.category),
          children: findTarget.children
            ? findTarget.children
              .filter(child => child.key !== dragNode.key)
              .map(loop)
            : undefined
        });
        return {
          ...item,
          icon: getIconType(item.data.category),
          children,
        };
      }
    }
    if (item.children && item.children.length > 0) {
      if (dropToGap && item.children.find(child => child.key === node.key)) {
        const children: Node[] = [];
        item.children.forEach((child) => {
          if (child.key !== dragNode.key) {
            children.push({
              ...child,
              icon: getIconType(child.data.category),
              children: child.children
                ? child.children
                  .filter(child => child.key !== dragNode.key)
                  .map(loop)
                : undefined
            });
          }
          if (child.key === node.key) {
            children.push({
              ...findTarget,
              icon: getIconType(findTarget.data.category),
              children: findTarget.children
                ? findTarget.children
                  .filter(child => child.key !== dragNode.key)
                  .map(loop)
                : undefined
            });
          }
        });
        return {
          ...item,
          icon: getIconType(item.data.category),
          children: children.length === 0 ? undefined : children
        };
      }
    }
    return {
      ...item,
      icon: getIconType(item.data.category),
      children: item.children
        ? item.children
          .filter(child => child.key !== dragNode.key)
          .map(loop)
        : undefined
    };
  };
  return loop;
}

const getIconType = (category: DepartmentCategory) => {
  switch (category) {
    case 'COMPANY':
      return <CompanyIcon/>;
    case 'HQ':
      return <HQIcon/>;
    case 'TEAM':
      return <TeamIcon/>;
    case 'PART':
      return <PartIcon/>;
    case 'PERSON':
      return <PersonIcon/>;
    case 'EXTRA':
      return <ExtraIcon/>;
  }
};

const create = (item: Node, mapper: (item: Node) => Partial<Node>): Node => ({
  ...item,
  ...mapper(item),
  children: item.children && item.children.length > 0
    ? item.children.map((child) => create(child, mapper)) : undefined
});

const flat = <T extends Node>(itemList: T[], temp: T[][] = []): T[] => {
  temp.push(itemList.map(item => ({
    ...item,
    children: undefined
  })));
  itemList.forEach((item) => {
    if (item.children && item.children.length > 0) {
      flat(item.children, temp);
    }
  });
  const result: T[] = [];
  temp.forEach(i => i.forEach(item => result.push(item)));
  return result.sort((a, b) => a.key > b.key ? 1 : -1);
};

const hash = (itemList: Node[]): string => {
  const loop = (item: Node, index: number, depth: number): Node & {
    depth: number;
    index: number;
  } => ({
    ...item,
    index,
    depth,
    children: item.children ? item.children.map((child, i) => loop(child, i, depth + 1)) : undefined
  });
  return flat(itemList.map((item, i) => loop(item, i, 0)))
    .map(item => `(${item.depth}-${item.index}-${item.key})`)
    .reduce((a, b) => a + b, '');
};