import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import React, {CSSProperties, memo, useCallback} from 'react';
import {ColorPalette} from 'assets/theme';
import {
    ProjectId,
    projectProgressStatusName,
    ProjectShortVO
} from 'project/domain';
import AutoSizer from "react-virtualized-auto-sizer";
import {areEqual, FixedSizeList} from "react-window";
import {makeStyles} from "@mui/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../../services/reducer";
import CircularProgress from "../../../components/CircularProgress";

export interface ListProps {
    list: ProjectShortVO[];
    openMenu: boolean;
    onRowClick: (item: ProjectShortVO) => void;
    searchFormRef: React.RefObject<HTMLDivElement>;
    id: ProjectId;
    loading: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex !important",
        flex: 1,
        overflowX: 'hidden',
        overflowY: 'hidden',
        padding: '0 10px',
        boxSizing: 'border-box',
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
        "& div": {
            justifyContent: "center",
            "&:nth-child(2)": {
                maxWidth: "160px"
            },
        }
    },
    tbody: {
        display: "flex !important",
        flexDirection: "row",
        width: "100%",
        height: "100%",
    },
    row: {
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
        flexShrink: 0,
        padding: "5px !important",
        "& > span": {
            display: "block",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden"
        },
        "&:nth-child(1)": {
            flexGrow: 0,
            minWidth: "62px"
        },
        "&:nth-child(2)": {
            flexGrow: 1,
            maxWidth: "139px"
        },
        "&:nth-child(3)": {
            flexGrow: 0,
            minWidth: "62px"
        }
    },
    no_result: {
        display: "flex !important",
        width: "100%",
        justifyContent: "center"
    }
}));


export default function List({list, openMenu: open, onRowClick, searchFormRef, id: projectId, loading}: ListProps) {
    const classes = useStyles();

    //TODO: ??? ??????/????????? ???????????? offsetHeight ?????? ???????????? ?????? ??????
    const LIST_HEIGHT_OFFSET = 40;
    const searchFormHeight = searchFormRef.current?.offsetHeight ?? 180;
    const listWithFavorites = [...list.filter((item) => item.isFavorite), ...list].reverse();
    const {id} = useSelector((root: RootState) => root.project);

    const TableRowWrap = memo((props: any) => {
        const index: number = props.index;
        const item = props.data[index];
        const style: CSSProperties = {...props.style};

        let backgroundColor = '';
        if (item.isFavorite) {
            backgroundColor = ColorPalette._d2e7fa;
        } else if (item.id === id) {
            backgroundColor = ColorPalette._cddaf5;
        }

        return (
            <TableRow
                component="div"
                className={classes.row}
                sx={{backgroundColor: {backgroundColor}}}
                style={style}
                onClick={() => {
                    onRowClick(item);
                }}>
                <TableCell className={classes.cell} component="div">
                    {item.code}
                </TableCell>
                <TableCell className={classes.cell} component="div">
                    <span>{item.name}</span>
                </TableCell>
                <TableCell className={classes.cell} component="div">
                    {projectProgressStatusName(item.progressStatus)}
                </TableCell>
            </TableRow>
        );
    }, areEqual);

    return (
        <div
            className={classes.root}
            style={{
                height: `calc(100% - ${searchFormHeight}px)`,
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
                            ??????
                        </TableCell>
                        <TableCell className={classes.cell} component="div">
                            ??????
                        </TableCell>
                        <TableCell className={classes.cell} component="div">
                            ????????????
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody component="div" className={classes.tbody}>
                    {loading && (
                      <TableRow component="div" className={classes.no_result}>
                          <TableCell
                            component="div"
                            colSpan={3} children={<CircularProgress size={30}/>}/>
                      </TableRow>
                    )}
                    {!loading && (!listWithFavorites || listWithFavorites.length === 0) && (
                        <TableRow component="div" className={classes.no_result}>
                            <TableCell
                                component="div"
                                colSpan={3} children="????????? ????????????."/>
                        </TableRow>
                    )}
                    {!loading && (listWithFavorites && listWithFavorites.length > 0) && (
                        <AutoSizer>
                            {({height, width}) => (
                                <FixedSizeList
                                    overscanCount={20}
                                    height={height - LIST_HEIGHT_OFFSET}
                                    itemCount={listWithFavorites && listWithFavorites.length}
                                    itemSize={32}
                                    width={width}
                                    itemData={listWithFavorites}
                                    className="scroll-bar-holder"
                                >
                                    {TableRowWrap as any}
                                </FixedSizeList>
                            )}
                        </AutoSizer>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
