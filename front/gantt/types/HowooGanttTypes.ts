import {Dayjs} from "dayjs";
import {Dispatch, MutableRefObject, SetStateAction} from "react";

export interface GanttContextProps {
    taskDraggable: boolean,
    headerFlagState: HeaderFlag,
    headerDays: number[],
    showGroup: boolean,
    tasks: GanttItem[],
    mixedTasks: MixedGanttItem[],
    setMixedTasks: Dispatch<SetStateAction<MixedGanttItem[]>>,
    gridRange: GridRange,
    groupFilter: GroupFilter,
    setGroupFilter: Dispatch<SetStateAction<GroupFilter>>,
    setTasks?: Dispatch<SetStateAction<GanttItem[]>>,
    setHeaderFlagState?: Dispatch<SetStateAction<HeaderFlag>>,
    zoom: number,
    onTaskClick?: (task: GanttItem) => void,
    onGroupClick?: (item: GroupItem) => void,
    onTaskDragDone?: (task: GanttItem) => void,
    refs?: {
        tableRef: MutableRefObject<any>,
        gridHeaderRef: MutableRefObject<any>,
        gridRef: MutableRefObject<any>,
        gridBackgroundRef: MutableRefObject<any>,
    }
}

export interface HeaderFlag {
    [key: number]: boolean
}

export interface GanttItem {
    group: {
        id: number,
        name: string
    },
    id: number,
    name: string,
    start: Dayjs,
    end: Dayjs,
    progress: number,
    parent: number,
    locked?: boolean,
    color?: string,
    symbol?: string,
    children?: number[],
}

export interface GanttItemMap {
    [id: number]: {
        task: GanttItem,
        index: number
    }
}

export enum MixedGanttItemType {
    GROUP = 'GROUP',
    TASK = 'TASK'
}

export interface GroupItem {
    id: number,
    name: string
}

export interface GroupFilter {
    [key: number]: boolean
}

export interface MixedGanttItem {
    type: MixedGanttItemType,
    data: GanttItem | GroupItem,
    visible: boolean
}

export interface GridRange {
    start: Dayjs,
    end: Dayjs
}