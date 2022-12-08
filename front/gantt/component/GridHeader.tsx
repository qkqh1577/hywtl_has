import React, {memo, useContext} from "react";
import {areEqual, FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {GRID_CONSTANT} from "../HowooGanttCommon";
import {GanttContext} from "../HowooGantt";

export default function GridHeader() {
    const {refs, gridRange, headerFlagState, headerDays, setHeaderFlagState, zoom} = useContext(GanttContext);
    const {dayWidth: rawDayWidth, gridHeaderHeight, monthPostfix} = {...GRID_CONSTANT};
    const dayWidth = rawDayWidth * zoom;
    const {gridRef, gridHeaderRef, gridBackgroundRef} = {...refs};

    const HeaderRow = memo((props: any) => {
        const index: number = props.index;
        const dayMonthY = gridHeaderHeight / 3;
        const x = index * dayWidth;
        const y = 0;
        const width = dayWidth;
        const height = gridHeaderHeight;
        const day = gridRange.start.add(index, 'day');

        const isFirstDay = index === 0 || day.get('date') === 1;
        const isSunday = day.get('day') === 0;
        const isSaturday = day.get('day') === 6;

        let dayClassName = 'day';
        isSaturday && (dayClassName = `${dayClassName} saturday`);
        isSunday && (dayClassName = `${dayClassName} sunday`);

        let className = 'header-cell';
        headerFlagState[index] && (className = `${className} flagged`);

        return (
            <g
                className={className}
                onClick={() => {
                    headerFlagState[index] = headerFlagState[index] ? !headerFlagState[index] : true;
                    setHeaderFlagState && setHeaderFlagState({...headerFlagState});
                }}
            >
                <rect
                    className="box top"
                    x={x} y={y}
                    width={width} height={height}
                />
                {isFirstDay &&
                    <>
                        <text className="month"
                              x={x+1} y={dayMonthY}
                        >
                            {`${day.format('M')}${monthPostfix}`}
                        </text>
                        <line
                            x1={x}
                            y1={0}
                            x2={x}
                            y2={height}
                            className="month-split"
                        />
                    </>
                }

                <rect
                    className="box bottom"
                    x={x} y={y + height / 2}
                    width={width} height={height / 2}
                />
                <text className={dayClassName}
                      x={x+1} y={y + height / 6 * 5}
                >
                    {day.format('DD')}
                </text>
            </g>
        );
    }, areEqual);

    const onScroll = (a: any) => {
        if (gridRef && gridRef.current) {
            gridRef.current._outerRef.scrollLeft = a.scrollOffset;
        }
        if (gridBackgroundRef && gridBackgroundRef.current) {
            gridBackgroundRef.current._outerRef.scrollLeft = a.scrollOffset;
        }
    }

    return (
        <AutoSizer>
            {({height, width}) => (
                <List
                    layout="horizontal"
                    height={height}
                    innerElementType="svg"
                    itemCount={headerDays.length}
                    itemSize={dayWidth}
                    width={width}
                    itemData={headerDays}
                    onScroll={onScroll}
                    ref={gridHeaderRef}
                    className="scroll-bar-holder grid-header-scroll-bar-holder"
                >
                    {HeaderRow as any}
                </List>
            )}
        </AutoSizer>
    );
}
