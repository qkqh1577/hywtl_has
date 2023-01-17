import React, {useContext} from 'react';
import {TreeItem, TreeView} from "@mui/lab";
import {ListDepartment} from "../../department_tree/entity";
import {DepartmentId} from "../../department/domain";
import {makeStyles} from "@mui/styles";

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CircularProgress from "../CircularProgress";
import TextBox from "../../layouts/Text";
import {FormikContext} from "formik";

interface DepartmentTreePros {
  departmentList: ListDepartment[] | undefined
}

interface Node {
  id: DepartmentId,
  name: string,
  children: Node[],
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& [role=group]': {
      borderLeft: '1px solid #c1c1c1'
    },
    // "& .MuiTreeItem-content .MuiTreeItem-label": {
    //   backgroundColor: "transparent"
    // },
    // "& .MuiTreeItem-content .MuiTreeItem-label:hover, .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label": {
    //   backgroundColor: "rgba(0,0,0,0.2)"
    // }
  },
  item: {
    display: 'block',
    width: '100%',
    fontSize: '13px',
    padding: '3px 0'
  }
}));

export default function DepartmentTree(props: DepartmentTreePros) {
  const classes = useStyles();
  const formik = useContext(FormikContext);
  const list = props.departmentList;

  if (!list || list.length === 0) {
    return (
      <TextBox variant="body2" sx={{width: '100%', height: '100%'}}>
        <CircularProgress size={30} sx={{justifyContent: 'center', alignItems: 'center'}}/>
      </TextBox>
    );
  }

  const toNode = (item: ListDepartment): Node => {
    const children: ListDepartment[] = list ? list.filter(childItem => childItem.parentId === item.id) : [];
    return {
      id: item.id,
      name: item.name,
      children: children.length === 0 ? [] : children.map(toNode),
    };
  };

  const initRoot = toNode(list[0]);
  const expanded: string[] = [];

  const renderLabel = item => (
    <span
      className={classes.item}
      onClick={event => {
        formik.setFieldValue('keyword', undefined);
        formik.setFieldValue('departmentId', item.id);
        formik.handleSubmit();
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {item.name}
    </span>
  );

  const renderTree = (nodes: Node) => {
    expanded.push(nodes.id.toString());
    return (
      <TreeItem
        className={formik.values.departmentId == nodes.id ? 'Mui-focused howoocast' : ''}
        onClick={(event) => {
          event.nativeEvent.stopPropagation();
          return false;
        }}
        key={nodes.id} nodeId={nodes.id.toString()} label={renderLabel(nodes)}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  }

  return (
    <TreeView
      className={`${classes.root} scroll-bar-holder`}
      aria-label="customized"
      defaultExpanded={expanded}
      defaultSelected={[`${formik.values.departmentId}`]}
      defaultCollapseIcon={<RemoveCircleOutlineIcon/>}
      defaultExpandIcon={<ControlPointIcon/>}
      // defaultEndIcon={<CloseSquare />}

      sx={{width: '100%', height: '100%', flexGrow: 1, overflowY: 'auto', overflowX: 'hidden'}}
    >
      {renderTree(initRoot)}
    </TreeView>
  );
}