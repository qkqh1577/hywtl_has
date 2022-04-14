import React, { createRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import {
  FlightSharp as FlightIcon,
  ArrowForwardSharp as ArrowForwardIcon,
  ArrowDownwardSharp as ArrowDownwardIcon
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import Tree from 'rc-tree';
import { DataNode } from 'rc-tree/lib/interface';
import useDepartment from 'services/department/hook';
import { ListDepartment } from 'services/department/Department';

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
    }
  }
}));

const DepartmentTreeView = () => {
  const classes = useStyle();
  const treeRef = createRef<Tree>();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    departmentState: { list },
    getAll
  } = useDepartment();
  const [root, setRoot] = useState<DataNode[]>([]);
  const [expend, setExpend] = useState<number[]>([]);

  const toNode = (item: ListDepartment): DataNode => {
    const children: ListDepartment[] = list.filter(childItem => childItem.parentId === item.id);
    return {
      key: item.id,
      title: item.name,
      children: children.length === 0 ? undefined : children.map(toNode)
    };
  };

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {

    setRoot(list.filter(item => !item.parentId).map(toNode));
    setExpend(list.map(item => item.id));
  }, [list]);

  useEffect(() => {
    console.log(root);
  }, [root]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '30px' }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '50px',
        mb: '40px',
      }}>
        <h2>부서 목록</h2>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            navigate('/department', {
              state: {
                filter: (location?.state as any)?.filter,
                expend,
              }
            });
          }}
        >
          리스트로 보기
        </Button>
      </Box>
      <Divider />
      <Box sx={{
        width: '100%',
        mb: '40px',
        height: '500px',
      }}>
        <Tree
          className={classes.tree}
          ref={treeRef}
          treeData={root}
          titleRender={(node) => (
            <ListItem button key={node.key}>
              <ListItemText primary={node.title} />
            </ListItem>
          )}
          expandedKeys={expend}
          draggable
          icon={<FlightIcon />}
          switcherIcon={(props) => {
            if (props.isLeaf) {
              return false;
            }
            return props.expanded ? <ArrowDownwardIcon /> : <ArrowForwardIcon />;
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
    </Paper>
  );
};

export default DepartmentTreeView;
