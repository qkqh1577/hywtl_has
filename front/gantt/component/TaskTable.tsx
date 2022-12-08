import React, {CSSProperties, memo, useContext, useState} from "react";
import {areEqual, FixedSizeList as List, ListOnItemsRenderedProps} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {diffDay, GRID_CONSTANT, ScrollDirections, scrollTo} from "../HowooGanttCommon";
import {cleanupActiveGridBodyRow, setActiveGridBodyRow} from "./GridBody";
import {GanttItem, MixedGanttItemType} from "../types/HowooGanttTypes";
import {GanttContext} from "../HowooGantt";

export default function TaskTable() {

    const {taskGap, dayWidth, taskHeight, scrollAnimationDuration} = {...GRID_CONSTANT};
    const {
        showGroup,
        tasks,
        mixedTasks,
        onTaskClick,
        onGroupClick,
        groupFilter,
        setGroupFilter,
        refs,
        gridRange,
        zoom
    } = useContext(GanttContext);

    const {tableRef, gridRef} = {...refs};
    const [itemsRange, setItemsRange] = useState<ListOnItemsRenderedProps>();

    const TableRow = memo((props: any) => {
        const index: number = props.index;
        const groupedTask = props.data[index];
        const data = showGroup ? groupedTask.data : groupedTask;
        const type = showGroup ? groupedTask.type : MixedGanttItemType.TASK;
        const style: CSSProperties = {...props.style};

        const scrollToItem = () => {
            if (itemsRange && gridRef) {
                const dayOffset = index - itemsRange.visibleStartIndex;
                const days = diffDay(data.start, gridRange.start);
                const element = gridRef.current._outerRef;
                const scrollTop = (index - dayOffset) * (taskHeight + taskGap);
                scrollTo(element, ScrollDirections.VERTICAL, scrollTop, scrollAnimationDuration);
                const scrollLeft = (days - 1) * (dayWidth * zoom);
                scrollTo(element, ScrollDirections.HORIZONTAL, scrollLeft, scrollAnimationDuration);
            }
        };

        if (type === MixedGanttItemType.GROUP) {
            return (
                <div className='table-row group' style={style} onClick={(event) => {
                    const nodeName = (event.nativeEvent.target as HTMLInputElement).nodeName;
                    if (nodeName !== 'DIV') {
                        return;
                    }
                    onGroupClick && onGroupClick(data);
                }}>
                    <div className="cell">
                        <p>
                            {data.name}
                        </p>
                    </div>
                    <div className="cell">
                        <button
                            className="target"
                            onClick={() => {
                                if(gridRef){
                                    const element = gridRef.current._outerRef;
                                    scrollTo(element, ScrollDirections.HORIZONTAL, 1, scrollAnimationDuration);
                                }
                            }}
                        >
                            →
                        </button>

                        <input type="checkbox"
                               className="visible-toggle"
                               checked={groupFilter[data.id] !== undefined ? groupFilter[data.id] : true}
                               onChange={(event) => {
                                   const visible = event.target.checked;
                                   mixedTasks.forEach(item => {
                                       if (item.type === MixedGanttItemType.TASK) {
                                           const groupId = (item.data as GanttItem).group.id;
                                           if (groupId === data.id) {
                                               item.visible = visible;
                                           }
                                       }
                                   });

                                   setGroupFilter(prvGroupFilter => {
                                       const newState = {...prvGroupFilter};
                                       newState[data.id] = visible;
                                       return newState;
                                   });
                                   return false;
                               }}
                        />

                    </div>
                </div>
            );
        }

        return (
            <div
                className='table-row'
                onClick={() => {
                    scrollToItem();
                    onTaskClick && onTaskClick(data as GanttItem);
                }}
                onMouseEnter={() => {
                    setActiveGridBodyRow(
                        gridRef,
                        index,
                    );
                }}
                onMouseLeave={() => {
                    cleanupActiveGridBodyRow(
                        gridRef
                    );
                }}
                style={style}>
                <div className="cell">
                    <p>{data.name}</p>
                </div>
                <div className="cell">
                    {data.start.format('MM/DD(ddd)')}
                </div>
                <div className="cell">
                    {data.end.format('MM/DD(ddd)')}
                </div>
            </div>
        );
    }, areEqual);

    const onScroll = (a: any) => {
        if (gridRef && gridRef.current) {
            if (gridRef.current._outerRef.scrollTop !== tableRef?.current._outerRef.scrollTop) {
                gridRef.current.scrollTo(a.scrollOffset);
            }
        }
    }

    const onItemsRendered = (props: ListOnItemsRenderedProps) => {
        setItemsRange({...props});
        tableRef && tableRef.current && tableRef.current._outerRef.addEventListener('scroll', () => {
            cleanupActiveGridBodyRow(
                gridRef
            );
        });

    };

    return (
        <div className="table">
            <AutoSizer>
                {({height, width}) => (
                    <List
                        overscanCount={20}
                        height={height}
                        itemCount={showGroup ? mixedTasks.filter((item) => {
                            return item.visible
                        }).length : tasks.length}
                        itemSize={taskHeight + taskGap}
                        width={width}
                        itemData={showGroup ? mixedTasks.filter((item) => {
                            return item.visible
                        }) : tasks}
                        onItemsRendered={onItemsRendered}
                        onScroll={onScroll}
                        ref={tableRef}
                        className="scroll-bar-holder"
                    >
                        {TableRow as any}
                    </List>
                )}
            </AutoSizer>
        </div>
    );
}

