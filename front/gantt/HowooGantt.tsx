import React, {createContext, RefObject, useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import './HowooGantt.css';
import GridBackground from "./component/GridBackground";
import GridHeader from "./component/GridHeader";
import TaskTable from "./component/TaskTable";
import {
    diffDay,
    generateTestData,
    getGridRange,
    getMixedGanttItems, getZoomSupportClass,
    GRID_CONSTANT,
    sortGanttItems
} from "./HowooGanttCommon";
import GridBody from './component/GridBody';
import {
    GanttItem,
    MixedGanttItem,
    GanttContextProps,
    GroupItem, HeaderFlag, GroupFilter
} from "./types/HowooGanttTypes";

export interface HowooGanttProps {
    containerRef: RefObject<HTMLDivElement>
    showGroup?: boolean,
    name?: string,
    tasks?: GanttItem[],
    onTaskClick?: (task: GanttItem) => void,
    onGroupClick?: (item: GroupItem) => void,
    onTaskDragDone?: (task: GanttItem) => void,
    taskDraggable?: boolean,
    testMode?: boolean,
    testItemCount?: number
}

export const GanttContext = createContext<GanttContextProps>({
    headerFlagState: {},
    headerDays: [],
    taskDraggable: false,
    showGroup: false,
    groupFilter: {},
    setGroupFilter: () => {
    },
    tasks: [],
    mixedTasks: [],
    setMixedTasks: () => {
    },
    gridRange: {start: dayjs(), end: dayjs()},
    zoom: 1
});

export default function HowooGantt(props: HowooGanttProps) {
    const {showGroup, containerRef, taskDraggable, onTaskClick, onTaskDragDone, onGroupClick} = {...props};
    const [tasks, setTasks] = useState<GanttItem[]>(
        props.testMode ?
            generateTestData(props.testItemCount ? props.testItemCount : 1000)
            : props.tasks ?
                props.tasks : []
    );
    const [mixedTasks, setMixedTasks] = useState<MixedGanttItem[]>([]);
    const [headerFlagState, setHeaderFlagState] = useState<HeaderFlag>({});
    const [gridRange, setGridRange] = useState(getGridRange(tasks));
    const [navigationDays, setNavigationDays] = useState(diffDay(gridRange.end, gridRange.start));
    const [headerDays, setHeaderDays] = useState(Array(navigationDays).fill(0));
    const [groupFilter, setGroupFilter] = useState<GroupFilter>({});
    const [zoom, setZoom] = useState(1);

    !showGroup && sortGanttItems(tasks);
    useEffect(() => {
        console.debug('refresh ----- tasks, groupFilter');
        showGroup && sortGanttItems(tasks);
        showGroup && setMixedTasks(getMixedGanttItems(tasks, groupFilter));
        const newGridRange = getGridRange(tasks);
        setGridRange(newGridRange);
        const newNavigationDays = diffDay(gridRange.end, gridRange.start);
        setNavigationDays(newNavigationDays);
        setHeaderDays(Array(newNavigationDays).fill(0))
    }, [tasks, groupFilter]);

    const ganttName = props.name ? props.name : 'react-howoo-gantt';
    const showVersion = !props.name;
    const height = (containerRef.current) ? containerRef.current.clientHeight : 500;

    const tableRef = useRef();
    const gridRef = useRef();
    const gridHeaderRef = useRef();
    const gridBackgroundRef = useRef();

    const taskClickHandler = (task: GanttItem) => {
        if (onTaskClick) {
            onTaskClick(task);
        } else {
            alert(`No onTaskClick handler found. Serve a default handler.\n${task.name}\n${task.start.toISOString()} ~ ${task.end.toISOString()}`)
        }
    };

    const groupClickHandler = (group: GroupItem) => {
        if (onGroupClick) {
            onGroupClick(group);
        } else {
            alert(`No onGroupClick handler found. Serve a default handler.\n${group.name}\nID = ${group.id}`);
        }
    };

    const contextValue: GanttContextProps = {
        headerFlagState: headerFlagState,
        headerDays: headerDays,
        taskDraggable: taskDraggable ? taskDraggable : false,
        showGroup: showGroup ? showGroup : false,
        tasks: tasks,
        mixedTasks: mixedTasks,
        setMixedTasks: setMixedTasks,
        gridRange: gridRange,
        groupFilter: groupFilter,
        setGroupFilter: setGroupFilter,
        setTasks: setTasks,
        setHeaderFlagState: setHeaderFlagState,
        onTaskClick: taskClickHandler,
        onGroupClick: groupClickHandler,
        onTaskDragDone: onTaskDragDone,
        zoom: zoom,
        refs: {
            tableRef, gridHeaderRef, gridRef, gridBackgroundRef
        }
    };

    const [foldTable, setFoldTable] = useState(false);
    const getFoldSupportClass = () => foldTable ? 'fold' : '';

    return (
        <GanttContext.Provider value={contextValue}>
            <div className={`"howoo-gantt" ${getZoomSupportClass(zoom)} ${getFoldSupportClass()}`}
                 style={{height: `${height}px`}}>
                <div className="header">
                    <div className="table-header">
                        <div className="table-toggle">
                            <button onClick={() => {
                                setFoldTable((prvState) => {
                                    return !prvState;
                                });
                            }}>☰
                            </button>
                        </div>
                        <h1>{ganttName} {showVersion && `v${GRID_CONSTANT.version}`}</h1>
                        <div className="row">
                            <div>ACTIVITY</div>
                            <div>FROM</div>
                            <div>TO</div>
                            <div></div>
                        </div>
                    </div>
                    <div className="grid-header">
                        <GridHeader/>
                    </div>
                </div>
                <div className="body">
                    <div className="table-container">
                        <TaskTable/>
                        <div className="controls">
                            <button onClick={() => {
                                setZoom(prvZoom => {
                                    return prvZoom < GRID_CONSTANT.maxZoom ? prvZoom + GRID_CONSTANT.zoomStep : prvZoom;
                                });
                            }}>+
                            </button>
                            <button onClick={() => {
                                setZoom(1);
                            }}>1:1
                            </button>
                            <button onClick={() => {
                                setZoom(prvZoom => {
                                    return prvZoom > GRID_CONSTANT.minZoom ? prvZoom - GRID_CONSTANT.zoomStep : prvZoom;
                                });
                            }}>−
                            </button>
                            <button onClick={() => {
                                setGroupFilter({});
                            }}>
                                ▽
                            </button>
                            <button onClick={() => {
                                setGroupFilter((prvGroupFilter) => {
                                    Object.keys(prvGroupFilter).forEach(groupId => {
                                        prvGroupFilter[parseInt(groupId)] = false;
                                    });
                                    return {...prvGroupFilter};
                                });
                            }}>
                                △
                            </button>
                            <button
                                className="clear"
                                onClick={() => {
                                    setHeaderFlagState([]);
                                }}>CLEAR
                            </button>
                        </div>
                    </div>
                    <div className="grid-container">
                        <GridBackground/>
                        <GridBody/>
                    </div>
                </div>
            </div>
        </GanttContext.Provider>
    );
}