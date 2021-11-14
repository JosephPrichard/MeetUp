import { Paper } from "@mantine/core";
import { ReactElement, useState } from "react";
import { AT } from "../../agreeableTasks/AgreeableTasks";
import { PT } from "../Schedule";
import styles from "./Day.module.css";

interface Props {
    name: string;
    number: number;
    pts: PT[];
    selectingAt: AT | undefined;
    addTask: (pt: PT) => void;
}

export const Day = (props: Props) => {

    const elements: ReactElement[] = [];
    for(let i = 0; i < 24; i++) {
        elements.push(
            <div 
                key={i} 
                className={styles.DayChunk}
                onClick={() => {
                    if (props.selectingAt) {
                        props.addTask({
                            id: Math.random().toString(),
                            at: Object.assign({}, props.selectingAt),
                            days: props.number,
                            timeBlockStart: i * 4,
                            timeBlockDuration: 4
                        })
                    }
                }}
            />
        );
    }

    return (
        <Paper className={styles.Day}>
            { elements }
            {props.pts.map((pt, i) => {
                return (
                    <div 
                        key={i} 
                        className={styles.Pt}
                        style={{
                            position: "absolute",
                            height: 10.25 * pt.timeBlockDuration,
                            top: 10.25 * pt.timeBlockStart,
                            width: 110,
                            backgroundColor: "rgb(58,114,192)"
                        }}
                    >
                        { pt.at.name }
                    </div>
                );
            })}
        </Paper>
    );
}