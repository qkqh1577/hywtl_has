import React, {useRef} from 'react';
import {AppRoute} from "../../services/routes";
import HowooGantt from "../HowooGantt";
import {GanttItem, GroupItem} from "../types/HowooGanttTypes";

function Element() {

    const tabRef = useRef(null);

    const onTaskClick = (task: GanttItem) => {
        console.debug('task clicked');
        console.debug(task);
    };

    const onGroupClick = (group: GroupItem) => {
        console.debug('group clicked');
        console.debug(group);
    };

    const onTaskDragDone = (task: GanttItem) => {
        console.debug('task drag done');
        console.debug(task);
    }

    return (
        <div style={{height:'calc(100% - 30px)',padding:'15px'}} ref={tabRef}>
            <HowooGantt
                showGroup={true}
                containerRef={tabRef}
                taskDraggable={true}
                onTaskClick={onTaskClick}
                onGroupClick={onGroupClick}
                onTaskDragDone={onTaskDragDone}
                testMode={true}
                testItemCount={1000}
            />
        </div>
    )
}

const ganttPageRoute: AppRoute = {
    path: '/gantt',
    element: <Element/>
}

export default ganttPageRoute;