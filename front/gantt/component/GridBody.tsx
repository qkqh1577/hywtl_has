import React, {CSSProperties, memo, MutableRefObject, useContext, useEffect, useRef, useState} from 'react';

import {areEqual, FixedSizeList as List, ListOnItemsRenderedProps} from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer';
import TaskDragEventManager from "./TaskDragEventManager";
import TaskNode from "./TaskNode";
import {
    createGroupNode,
    diffDay,
    getMixedGanttItemMap,
    GRID_CONSTANT,
    isGroupType,
    stripItemIdPrefix
} from "../HowooGanttCommon";
import {GanttItem, GanttItemMap, GridRange, MixedGanttItem, MixedGanttItemType} from "../types/HowooGanttTypes";
import {GanttContext} from "../HowooGantt";

const taskDragEventManager = new TaskDragEventManager();
export default function GridBody() {

    const {
        showGroup,
        taskDraggable,
        gridRange,
        tasks,
        mixedTasks,
        setTasks,
        onTaskClick,
        onTaskDragDone,
        refs,
        zoom
    } = useContext(GanttContext);

    taskDragEventManager.setZoom(zoom);
    const {dayWidth: rawDayWidth, taskGap, taskHeight} = {...GRID_CONSTANT};
    const dayWidth = rawDayWidth * zoom;

    const {tableRef, gridRef, gridHeaderRef, gridBackgroundRef,} = {...refs};
    const taskIdMap = useRef<GanttItemMap>({});
    const navigationDays = diffDay(gridRange.end, gridRange.start);
    const svgRef = useRef<SVGElement>(null);
    const [svgRefReady, setSvgRefReady] = useState(false);

    const refreshConnection = () => {
        svgRef.current && renderConnection(
            svgRef.current,
            gridRange,
            showGroup ? mixedTasks.filter((item) => {
                return item.visible
            }) : tasks,
            taskIdMap.current,
            zoom
        );
    };

    const onItemsRendered = (props: ListOnItemsRenderedProps) => {
        taskDragEventManager.setWindowRange({...props});
        if (svgRef.current) {
            svgRef.current.style.width = `${dayWidth * navigationDays}px`;
            refreshConnection();
            !svgRefReady && setSvgRefReady(true);
        }
    };

    useEffect(() => {
        taskIdMap.current = getMixedGanttItemMap(showGroup ? mixedTasks.filter((item) => {
            return item.visible
        }) : tasks);
        refreshConnection();
        gridRef && gridBackgroundRef && fixGridBodyAndBackgroundSizeMismatch(gridRef, gridBackgroundRef);
    }, [tasks, mixedTasks]);

    useEffect(() => {
        svgRef.current && renderConnection(
            svgRef.current,
            gridRange,
            showGroup ? mixedTasks.filter((item) => {
                return item.visible
            }) : tasks,
            taskIdMap.current,
            zoom
        );

        gridRef && gridBackgroundRef && fixGridBodyAndBackgroundSizeMismatch(gridRef, gridBackgroundRef);
    }, [zoom]);

    useEffect(() => {
        if (gridRef?.current) {
            gridRef.current._outerRef.addEventListener('scroll', () => {
                if (gridRef.current) {
                    const gridScrollLeft = gridRef.current._outerRef.scrollLeft;
                    gridHeaderRef?.current.scrollTo(gridScrollLeft);
                    if (gridBackgroundRef) {
                        gridBackgroundRef.current._outerRef.scrollLeft = gridScrollLeft;
                    }
                }
            });
            gridRef.current._outerRef.addEventListener('mousemove', (event: any) => {
                if (event.buttons === 1) {
                    taskDragEventManager.updateState(event);
                    if (taskDragEventManager.isDragging()) {
                        // document.body.classList.add('gantt-dragging');
                    } else {
                        const x = gridRef.current._outerRef.scrollLeft - event.movementX;
                        const y = gridRef.current._outerRef.scrollTop - event.movementY;
                        gridRef.current._outerRef.scrollLeft = x;
                        gridRef.current._outerRef.scrollTop = y;
                    }
                }
            });
            gridRef.current._outerRef.addEventListener('mouseup', () => {
                setTimeout(() => {
                    if (taskDragEventManager.isDragging()) {
                        if (taskDraggable && svgRef.current) {
                            const dragging = svgRef.current.getElementsByClassName('dragging');
                            dragging.length > 0 && dragging[0].classList.remove('dragging');

                            if (onTaskDragDone) {
                                const node = taskDragEventManager.getActiveNode();
                                if (node) {
                                    const strTaskId = node.getAttribute('id');
                                    const taskId = stripItemIdPrefix(strTaskId);
                                    const taskData = taskIdMap.current[taskId];
                                    const task = taskData.task;
                                    onTaskDragDone(task);
                                }
                            }
                        }
                        // refreshConnection();
                        // setTasks && setTasks(tasks.slice());
                        taskDragEventManager.setDragging(false);
                    }
                }, 0);
            });
            taskDragEventManager.setOnDragDayChangCallback((lastDraggedDay, draggedDay, node) => {
                if (taskDraggable) {
                    const draggedDays = draggedDay - lastDraggedDay;
                    // const rectNode = node.getElementsByTagNameNS("http://www.w3.org/2000/svg", 'rect')[0];
                    // const textNode = node.getElementsByTagNameNS("http://www.w3.org/2000/svg", 'text')[0];
                    //
                    // const strX = rectNode.getAttribute('x');
                    // const x = parseInt(strX ? strX : '0');
                    // rectNode.setAttribute('x', `${x + GRID_CONSTANT.dayWidth * draggedDays}`);
                    // textNode.setAttribute('x', `${x + GRID_CONSTANT.dayWidth * draggedDays}`);

                    if (svgRef.current) {
                        const strTaskId = node.getAttribute('id');
                        const taskId = stripItemIdPrefix(strTaskId);
                        const taskData = taskIdMap.current[taskId];
                        const task = taskData.task;
                        task.start = task.start.add(draggedDays, 'day');
                        task.end = task.end.add(draggedDays, 'day');
                        //refreshConnection();
                        setTasks && setTasks(tasks.slice());
                    } else {
                        console.warn('FAIL TO UPDATE CONNECTION');
                    }
                }
            });
        }
    }, [svgRefReady]);

    const onScroll = (a: any) => {
        if (tableRef && tableRef.current) {
            tableRef.current.scrollTo(a.scrollOffset);
        }
    }

    const TaskRow = memo((props: any) => {
        const index: number = props.index;
        const groupedTask = props.data[index];
        const data = showGroup ? groupedTask.data : groupedTask;
        const type = showGroup ? groupedTask.type : MixedGanttItemType.TASK;
        const style: CSSProperties = props.style;
        const top = style && style.top ? style.top as number : 0;

        if (showGroup && !groupedTask.visible) {
            return <></>;
        }

        if (type === MixedGanttItemType.GROUP) {
            const fontSize = 14;
            const textY = (taskHeight + fontSize) / 2 + top;
            return (
                <g>
                    <text
                        //x={dayIndex * dayWidth + dayWidth / 6}
                        x={10}
                        y={textY}
                        className="group text"
                    >
                        {`▶ ${data.name}`}
                    </text>
                </g>
            );
        } else {
            const task = data as GanttItem;
            const days = diffDay(task.end, task.start);
            const dayIndex = diffDay(task.start, gridRange.start) - 1;
            return (
                <TaskNode
                    key={`${task.group.id}_${task.id}`}
                    task={task}
                    taskDragEventManager={taskDragEventManager}
                    x={dayIndex * dayWidth}
                    y={top}
                    width={days * dayWidth}
                    height={taskHeight}
                    onClick={onTaskClick}
                />
            );
        }
    }, areEqual);

    return (
        <AutoSizer>
            {({height, width}) => (
                <List
                    overscanCount={14}
                    layout="vertical"
                    height={height}
                    innerElementType="svg"
                    innerRef={svgRef}
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
                    ref={gridRef}
                    className="scroll-bar-holder"
                >
                    {TaskRow}
                </List>
            )}
        </AutoSizer>
    );
}

function renderConnection(
    svg: SVGElement,
    gridRange: GridRange,
    groupedTasks: MixedGanttItem[] | GanttItem[],
    taskIdMap: GanttItemMap,
    zoom: number
) {

    const {dayWidth: rawDayWidth, taskHeight, taskGap} = {...GRID_CONSTANT};
    const dayWidth = rawDayWidth * zoom;

    cleanupConnectionNodes(svg);
    const group = createGroupNode('grid-connection');
    const tasksInWindow = getTasksInWindow(groupedTasks);
    tasksInWindow.forEach((item) => {

        if (isGroupType(item)) {
            const groupedTask = (item as MixedGanttItem);
            if (groupedTask.type === MixedGanttItemType.GROUP) {
                return true;
            }
        }

        const task = isGroupType(item) ? (item as MixedGanttItem).data as GanttItem : item as GanttItem;
        if (task.parent < 0) {
            return true;
        }

        const parentData = taskIdMap[task.parent];
        if (!parentData) {
            return true;
        }

        const parentTask = parentData.task;
        const x = diffDay(task.start, gridRange.start) * dayWidth;
        const y = taskIdMap[task.id].index * (taskHeight + taskGap) + taskHeight / 2;
        const px1 = diffDay(parentTask.start, gridRange.start) * dayWidth;
        const px = px1 - dayWidth / 2;
        const py = (parentData.index + 1) * (taskHeight + taskGap) - taskGap;
        group.appendChild(createLineNode(px, py, px, y));
        group.appendChild(createLineNode(px, y, x, y));
    });

    svg.prepend(group);
}

function cleanupConnectionNodes(svg: SVGElement) {
    const connectionNode = svg.getElementsByClassName('grid-connection');
    if (connectionNode.length > 0) {
        for (let i = 0; i < connectionNode.length; i++) {
            connectionNode[i].remove();
        }
    }
}

export function setActiveGridBodyRow(
    gridRef: any,
    index: number,
) {
    const svg = gridRef.current._outerRef.getElementsByTagName('svg')[0]
    const {taskHeight, taskGap} = {...GRID_CONSTANT};
    const y = index * (taskHeight + taskGap);
    const width = svg.clientWidth;
    const height = taskHeight;

    const group = createGroupNode('grid-active-row');
    const node = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    node.setAttribute('x', `${0}`);
    node.setAttribute('y', `${y}`);
    node.setAttribute('width', `${width}`);
    node.setAttribute('height', `${height + taskGap}`);
    group.append(node);

    svg.prepend(group);
}

export function cleanupActiveGridBodyRow(gridRef: any) {
    const svg = gridRef.current._outerRef.getElementsByTagName('svg')[0]
    const activeRows = svg.getElementsByClassName('grid-active-row');
    if (activeRows.length > 0) {
        for (let i = 0; i < activeRows.length; i++) {
            activeRows[i].remove();
        }
    }
}

function createLineNode(x1: number, y1: number, x2: number, y2: number) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", "line");
    node.setAttribute('class', 'connection');
    node.setAttribute('x1', `${x1}`);
    node.setAttribute('y1', `${y1}`);
    node.setAttribute('x2', `${x2}`);
    node.setAttribute('y2', `${y2}`);
    return node;
}

function getTasksInWindow(tasks: MixedGanttItem[] | GanttItem[]) {
    const windowRange = taskDragEventManager.getWindowRange();
    return tasks.slice(windowRange.overscanStartIndex, windowRange.overscanStopIndex + 1);
}

/**
 * zoom 변경 시 body grid svg width style 속성이
 * 최초 1회 스크롤 되기 전까지 update 되지 않는 문제 처리용
 * @param gridRef
 * @param gridBackgroundRef
 */
function fixGridBodyAndBackgroundSizeMismatch(gridRef: MutableRefObject<any>, gridBackgroundRef: MutableRefObject<any>){
    if (gridBackgroundRef && gridRef) {
        if (gridBackgroundRef.current) {

            gridRef.current._outerRef.lastChild.style.width = gridBackgroundRef.current._outerRef.lastChild.style.width;
        }
    }
}