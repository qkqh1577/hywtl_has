import React, {memo, useContext} from "react";
import dayjs from "dayjs";
import {areEqual, FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {GRID_CONSTANT} from "../HowooGanttCommon";
import {GanttContext} from "../HowooGantt";

export default function GridBackground() {

    const {refs, gridRange, headerDays, headerFlagState,zoom} = useContext(GanttContext);
    const {dayWidth:rawDayWidth} = {...GRID_CONSTANT};
    const dayWidth = rawDayWidth * zoom;
    const {gridBackgroundRef} = {...refs};

    const BackgroundRow = memo((props: any) => {
        const index: number = props.index;
        const x = index * dayWidth;
        const y = 0;

        const height = document.body.clientHeight;
        const currentDay = gridRange.start.add(index, 'day');
        const dayOfWeek = currentDay.get('day');

        let dayClassName = 'day';

        const isFirstDay = currentDay.get('date') === 1;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        isWeekend && (dayClassName = `${dayClassName} weekend`);
        const isToday = dayjs().isSame(currentDay, 'day');
        isToday && (dayClassName = `${dayClassName} today`);

        let groupClassName = '';
        headerFlagState[index] && (groupClassName = `${groupClassName} flagged`);
        //isFirstDay && (groupClassName = `${groupClassName} split-month`);

        return (
            <g className={groupClassName}>
                <rect
                    className={dayClassName}
                    x={x} y={y}
                    width={dayWidth} height={height}
                />
                {isFirstDay && (
                    <line
                        x1={x}
                        y1={y}
                        x2={x}
                        y2={height}
                        className="month-split"
                    />
                )}
            </g>
        );
    }, areEqual);

    return (
        <AutoSizer>
            {({height, width}) => (
                <List
                    overscanCount={14}
                    layout="horizontal"
                    height={height}
                    innerElementType="svg"
                    itemCount={headerDays.length}
                    itemSize={dayWidth}
                    width={width}
                    itemData={headerDays}
                    className="grid-background"
                    ref={gridBackgroundRef}
                >
                    {BackgroundRow as any}
                </List>
            )}
        </AutoSizer>
    );
}