import {ListOnItemsRenderedProps} from "react-window";
import {GRID_CONSTANT} from "../HowooGanttCommon";

export default class TaskDragEventManager {
    private dragging: boolean = false;
    private movementX: number = 0;
    private movementY: number = 0;
    private activeNode: any = null;
    private activeEvent: any = null;
    private lastDraggedDay: number = 0;
    private windowRange: ListOnItemsRenderedProps;
    private zoom: number = 0;

    private onDraggedDayChange: (
        lastDraggedDay: number,
        draggedDay: number,
        activeNode: SVGElement,
        event: any,
    ) => void = () => {
    };

    constructor() {
        console.debug('Create a new TaskDragEventManager instance')
        this.windowRange = {
            overscanStartIndex: 0,
            visibleStopIndex: 0,
            visibleStartIndex: 0,
            overscanStopIndex: 0,
        }
    }

    public setZoom(zoom:number){
        this.zoom = zoom;
    }

    public setWindowRange(range: ListOnItemsRenderedProps) {
        this.windowRange = range;
    }

    public getWindowRange() {
        return this.windowRange;
    }

    public setActiveNode(node: SVGElement) {
        this.activeNode = node;
    }

    public getActiveNode() {
        return this.activeNode;
    }

    public getActiveNodeId() {
        if (this.activeNode) {
            return this.activeNode.getAttribute('id');
        } else {
            return undefined;
        }
    }

    public isDragging() {
        return this.dragging;
    }

    public setDragging(dragState: boolean) {
        this.dragging = dragState;
    }

    public setOnDragDayChangCallback(callback: (
        lastDraggedDay: number, draggedDay: number, activeNode: SVGElement, event: any
    ) => void) {
        this.onDraggedDayChange = callback;
    }

    public updateState(event: any) {
        if (this.dragging) {
            this.activeEvent = event;
            this.movementX += event.movementX;
            this.movementY += event.movementY;

            const draggedDay = this.getDraggedDays();
            if (draggedDay !== this.lastDraggedDay) {
                if (this.activeNode) {
                    this.onDraggedDayChange(
                        this.lastDraggedDay,
                        draggedDay,
                        this.activeNode,
                        this.activeEvent);
                } else {
                    console.warn('TaskDragEventManager.updateState >>> no active node found. skip calling callback()');
                }
            }
            this.lastDraggedDay = draggedDay;
        }
    }

    public getDraggedDays() {
        return Math.floor(this.movementX / (GRID_CONSTANT.dayWidth * this.zoom));
    }

    public resetState() {
        this.movementX = 0;
        this.movementY = 0;
        this.dragging = false;
        this.activeNode = null;
        this.lastDraggedDay = 0;
    }
}