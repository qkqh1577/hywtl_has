import React from "react";
import TaskDragEventManager from "./TaskDragEventManager";
import {GRID_CONSTANT, stripItemIdPrefix} from "../HowooGanttCommon";
import {GanttItem} from "../types/HowooGanttTypes";

interface TaskNodeProps {
    task: GanttItem,
    taskDragEventManager: TaskDragEventManager,
    x: number,
    y: number,
    width: number,
    height: number,
    onClick?: (task: GanttItem) => void
}

export default function TaskNode(props: TaskNodeProps) {
    const {
        task,
        taskDragEventManager,
        x,
        y,
        width,
        height,
        onClick
    } = {...props};
    const fontSize = 14;
    const textY = (height + fontSize) / 2 + y;
    let className = 'task';
    if (taskDragEventManager.getActiveNodeId()) {
        const nodeId = taskDragEventManager.getActiveNodeId();
        const taskId = stripItemIdPrefix(nodeId);
        className = taskId === task.id ? 'task dragging' : 'task';
    }
    task.locked && (className = `${className} locked`);
    return (
        <g
            id={`${GRID_CONSTANT.taskIdPrefix}${task.id}`}
            className={className}
            onClick={() => {
                if (!taskDragEventManager.isDragging()) {
                    onClick && onClick(task);
                }
            }}
            onMouseMove={(event) => {
                if (event.buttons === 1) {
                    !task.locked && taskDragEventManager.setDragging(true);
                }
            }}
            onMouseDown={(event) => {
                !task.locked && taskDragEventManager.setActiveNode(event.currentTarget);
            }}
            onMouseUp={(event) => {
                !task.locked && event.currentTarget.classList.remove('dragging');
            }}
        >
            <rect
                x={x} y={y}
                width={width} height={height}
                className="task box"
                fill={task.color ? task.color : GRID_CONSTANT.taskBackground}
                rx={GRID_CONSTANT.taskRoundness}
                ry={GRID_CONSTANT.taskRoundness}
            />
            <text
                x={x} y={textY}
                className="task text"
            >
                {task.locked && '🔒 '}{task.name}
            </text>
        </g>
    );
}