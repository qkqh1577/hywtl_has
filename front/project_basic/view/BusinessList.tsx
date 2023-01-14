import React, {CSSProperties, useCallback, useContext} from 'react';
import {Radio, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {BusinessShortVO} from "../../business/domain";
import {FormikContext} from "formik";
import {makeStyles} from "@mui/styles";
import {ColorPalette} from "../../assets/theme";
import AutoSizer from "react-virtualized-auto-sizer";
import {FixedSizeList as List} from "react-window";
import CircularProgress from "../../components/CircularProgress";

interface BusinessListProps {
  list: BusinessShortVO[] | undefined;
  loading: boolean,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex !important",
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'hidden',
    padding: '0',
    border: "1px solid #e4e9f2",
    borderRadius: "5px",
    boxSizing: 'border-box',
    backfaceVisibility: 'hidden',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '10px',
      backgroundColor: ColorPalette._e4e9f2,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: ColorPalette._697183,
    }
  },
  thead: {
    display: "flex !important",
    width: "100%",
    "& > div > div": {
      justifyContent: "center",
      padding: "5px !important",
      borderLeft: "1px solid #e4e9f2 !important",
      borderTop: "1px solid #e4e9f2 !important",
      borderBottom: "5px solid #e4e9f2 !important",
      fontWeight: "normal !important"
    }
  },
  tbody: {
    display: "flex !important",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  row: {
    backfaceVisibility: 'hidden',
    display: "flex !important",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.1)"
    }
  },
  cell: {
    display: "flex !important",
    alignItems: "center",
    flexShrink: 0,
    padding: "0px !important",
    minHeight: "35px",
    backfaceVisibility: 'hidden',
    "& > span": {
      display: "block",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      padding: "0"
    },
    "&:nth-child(1)": {
      flexGrow: 0,
      width: '10%',
      justifyContent: 'center'
    },
    "&:nth-child(2)": {
      flexGrow: 1,
      width: '70%'
    },
    "&:nth-child(3)": {
      flexGrow: 0,
      width: '20%'
    }
  },
  no_result: {
    display: "flex !important",
    width: "100%",
    justifyContent: "center"
  }
}));

export default function BusinessList(props: BusinessListProps) {
  const {loading, list} = props;
  const formik = useContext(FormikContext);
  const classes = useStyles();

  const TableRowWrap = useCallback((props: any) => {
    const index: number = props.index;
    const item = props.data[index];
    const style: CSSProperties = {...props.style};

    return (
      <TableRow
        component="div"
        className={classes.row}
        style={style}
      >
        <TableCell className={classes.cell} component="div">
          <Radio
            disableRipple={true}
            value={item.id}
            checked={formik.values.businessId === item.id}
            onChange={() => {
              formik.setFieldValue('businessId', item.id);
            }}
          />
        </TableCell>
        <TableCell className={classes.cell} component="div">
          <span>{item.name}</span>
        </TableCell>
        <TableCell className={classes.cell} component="div">
          <span>{item.ceoName}</span>
        </TableCell>
      </TableRow>
    );
  }, [formik]);

  return (
    <div
      className={classes.root}
      style={{
        height: '100%',
      }}
    >
      <Table
        component="div"
        stickyHeader
        aria-label="sticky table"
        sx={{
          height: "100%",
          width: "100%"
        }}
      >
        <TableHead component="div" className={classes.thead}>
          <TableRow component="div" className={classes.row}>
            <TableCell className={classes.cell} component="div">
              선택
            </TableCell>
            <TableCell className={classes.cell} component="div">
              업체명
            </TableCell>
            <TableCell className={classes.cell} component="div">
              대표명
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody component="div" className={classes.tbody}>
          {loading && (!list || list.length === 0) && (
            <TableRow component="div" className={classes.no_result}>
              <TableCell
                component="div"
                colSpan={3} children={<CircularProgress size={30}/>}/>
            </TableRow>
          )}
          {!loading && (!list || list.length === 0) && (
            <TableRow component="div" className={classes.no_result}>
              <TableCell
                component="div"
                colSpan={3} children="결과가 없습니다."/>
            </TableRow>
          )}
          {!loading && (list && list.length > 0) && (
            <AutoSizer>
              {({height, width}) => (
                <List
                  height={height}
                  itemCount={list ? list.length : 0}
                  itemSize={35}
                  width={width}
                  itemData={list}
                  className="scroll-bar-holder"
                >
                  {TableRowWrap as any}
                </List>
              )}
            </AutoSizer>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
