import { Paper } from "@mantine/core";
import axios from "axios";
import { ReactElement, useState } from "react";
import { BASE_URL } from "../../../globals";
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

                        const body = {
                            taskId: props.selectingAt.id,
                            startDay: props.number,
                            startTime: i * 4,
                            duration: 4
                        };

                        axios.post<PT>("/api/placedTask", body, { withCredentials: true, baseURL: BASE_URL })
                            .then(r => {
                                console.log("creatept", r.data);
                                props.addTask(r.data)
                            });
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
                            height: 10.25 * pt.duration,
                            top: 10.25 * pt.startTime,
                            width: 110,
                            backgroundColor: "rgb(58,114,192)"
                        }}
                    >
                        { pt.task.name }
                    </div>
                );
            })}
        </Paper>
    );
}