import dayjs, {Dayjs} from "dayjs";
import {
    GanttItem,
    GanttItemMap,
    GridRange,
    GroupFilter,
    MixedGanttItem,
    MixedGanttItemType
} from "./types/HowooGanttTypes";

dayjs.locale('ko');

export const GRID_CONSTANT = {
    dayWidth: 40,
    gridHeaderHeight: 60,
    taskIdPrefix: 'gantt_task_',
    taskHeight: 26,
    taskRoundness: 5,
    taskGap: 5,
    taskBackground: '#d0d0ff',
    gridRangeLeadDays: 1,
    monthPostfix: '월',
    version: 0.1,
    zoomStep: 0.1,
    minZoom: 0.6,
    maxZoom: 1.6,
    scrollAnimationDuration: 300,
};

export function getGridRange(tasks: GanttItem[]): GridRange {

    if (tasks && tasks.length > 0) {
        const maxEndDayTimestamp = Math.max.apply(Math, tasks.map((task) => {
            return task.end.add(GRID_CONSTANT.gridRangeLeadDays, 'day').toDate().getTime();
        }));
        const minStartDayTimestamp = Math.min.apply(Math, tasks.map((task) => {
            return task.start.add(GRID_CONSTANT.gridRangeLeadDays * -1, 'day').toDate().getTime();
        }));
        return {
            start: dayjs(minStartDayTimestamp),
            end: dayjs(maxEndDayTimestamp)
        }
    } else {
        const now = new Date();
        return {
            start: dayjs(`${now.getFullYear()}-01-01`),
            end: dayjs(`${now.getFullYear()}-12-31`)
        }
    }
}

export function getMixedGanttItems(tasks: GanttItem[], groupFilter: GroupFilter) {
    let prvGroupId = -1;
    const result: MixedGanttItem[] = [];

    tasks.forEach((task) => {

        if (groupFilter[task.group.id] === undefined) {
            groupFilter[task.group.id] = true;
        }

        if (task.group.id !== prvGroupId) {
            result.push({
                type: MixedGanttItemType.GROUP,
                data: task.group,
                visible: true
            });
        }
        result.push({
            type: MixedGanttItemType.TASK,
            data: task,
            visible: groupFilter[task.group.id]
        });
        prvGroupId = task.group.id;
    });
    return result;
}

export function stripItemIdPrefix(taskId: string | null) {
    if (!taskId) return 0;
    return parseInt(taskId.replace(GRID_CONSTANT.taskIdPrefix, ''));
}

export function getMixedGanttItemMap(tasks: MixedGanttItem[] | GanttItem[]) {
    const taskIdMap: GanttItemMap = {};
    tasks && tasks.forEach((item, index) => {

        const isGroup = isGroupType(item);
        if (isGroup) {
            if ((item as MixedGanttItem).type === MixedGanttItemType.GROUP) {
                return true;
            }
        }

        const taskId = isGroup ? (item as MixedGanttItem).data.id : (item as GanttItem).id;
        taskIdMap[taskId] = {
            task: isGroup ? (item as MixedGanttItem).data as GanttItem : item as GanttItem,
            index: index
        };
    });
    return taskIdMap;
}

export function sortGanttItems(tasks: GanttItem[]) {
    tasks.sort((a, b) => {
        if (a.group.id > b.group.id) {
            return 1;
        } else if (a.group.id < b.group.id) {
            return -1;
        // } else if (a.start.isAfter(b.start)) {
        //     return 1;
        // } else if (a.start.isBefore(b.start)) {
        //     return -1;
        } else {
            return 0;
        }
    });
}

export function diffDay(date1: Dayjs, date2: Dayjs) {
    const hours = date1.diff(date2, 'hours');
    return Math.floor(hours / 24) + 1;
}

export function createGroupNode(className: string) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('class', className);
    return group;
}

export function isGroupType(item: any) {
    return Object.keys(item).indexOf('type') > -1;
}

export function getZoomSupportClass(zoom: number) {
    let className;
    if (zoom <= GRID_CONSTANT.minZoom * 1.2) {
        className = 'scale-small';
    } else if (zoom >= GRID_CONSTANT.maxZoom * 0.8) {
        className = 'scale-large';
    } else {
        className = 'scale-normal';
    }
    return className;
}

export enum ScrollDirections {
    VERTICAL = 'VERTICAL',
    HORIZONTAL = 'HORIZONTAL'
}

export function scrollTo(element: HTMLDivElement, direction: ScrollDirections, to: number, duration: number) {

    const easeInOutQuad = (
        currentTime: number, startValue: number, changeInValue: number, duration: number) => {
        currentTime /= duration / 2;
        if (currentTime < 1) return changeInValue / 2 * currentTime * currentTime + startValue;
        currentTime--;
        return -changeInValue / 2 * (currentTime * (currentTime - 2) - 1) + startValue;
    };

    let start = (direction === ScrollDirections.VERTICAL) ? element.scrollTop : element.scrollLeft,
        change = to - start,
        currentTime = 0,
        increment = 5;

    let animateScroll = function () {
        currentTime += increment;

        if (direction === ScrollDirections.VERTICAL) {
            element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
        } else {
            element.scrollLeft = easeInOutQuad(currentTime, start, change, duration);
        }
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

export function generateTestData(testItemCount: number) {
    const result: GanttItem[] = [];
    const refDay = dayjs('2022-03-19');
    const tasksPerGroup = 35;
    const groupCount = Math.ceil(testItemCount / tasksPerGroup);


    for (let groupId = 0; groupId < groupCount; groupId++) {

        let prvParent = -1;
        let childrenCount = 0;

        for (let i = 0; i < tasksPerGroup; i++) {

            const id = i + 1 + groupId * tasksPerGroup;
            let tmp = i;
            if (i % 5 === 0) {
                tmp = i - 1;
            }

            const randomDayOffset = Math.round(Math.random() * 10) + 1;
            let start = refDay.add(tmp * 3, 'day');
            const end = start.clone().add(randomDayOffset, "day");

            // if (id % 9 === 8) {
            //     start = result[id - 2].start.clone();
            // }

            if (i > 1) {
                if (Math.random() > 0.6) {
                    prvParent = i - 1 + groupId * tasksPerGroup;
                    childrenCount = Math.floor(Math.random() * 10) % 10;
                } else {
                    childrenCount--;
                    if(childrenCount>0){
                        prvParent = -1;
                    }
                }
            }

            const item: GanttItem = {
                id: id,
                group: {
                    id: groupId,
                    name: `그룹 ${groupId}`
                },
                name: `테스트 이벤트 ${i}`,
                start: start,
                end: end,
                progress: 0,
                children: [],
                parent: prvParent
            };

            // assign child to parent
            result[prvParent]?.children?.push(id);

            if (i % 4 === 3) {
                item.color = ["#594F4F", "#547980", "#45ADA8", "#9DE0AD", "#E5FCC2", "#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"][Math.floor(Math.random() * 10)];
            }

            if (i % 15 === 2) {
                item.locked = true;
            }

            result.push(item);
        }
    }
    return result;
}