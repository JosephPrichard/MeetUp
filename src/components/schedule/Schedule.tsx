import { Paper } from "@mantine/core";
import axios from "axios";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { BASE_URL } from "../../globals";
import { AT } from "../agreeableTasks/AgreeableTasks";
import { Group } from "../groups/Groups";
import { Day } from "./day/Day";
import styles from "./Schedule.module.css";

export interface PT {
    id: string;
    task: AT;
    startDay: number;
    startTime: number;
    duration: number;
}

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getTime(num: number) {
    if(num === 0) {
        return "";
    } else if (num <= 11) {
        return num + " AM"
    } else if (num == 12) {
        return num + " PM"
    }  else if (num > 12) {
        return (num-12) + " PM"
    }
}

interface Props {
    group?: Group;
    selectingAt?: AT;
}

function createEmptyDays(group: Group) {
    const daysArr: PT[][] = [];
    for(let i = 0; i < group.numDays; i++) {
        daysArr.push([]);
    }
    return daysArr;
}

function getDaysArray(group: Group, pts: PT[]): PT[][] {
    const daysArr = createEmptyDays(group);

    for(const pt of pts) {
        if (pt.startDay < group.numDays) {
            daysArr[pt.startDay].push(pt);
        }
    }

    return daysArr;
}

export const Schedule = (props: Props) => {

    const [tasks, setTasks] = useState<PT[]>();

    useEffect(() => {
        if (props.group?.id) {
            axios.get<PT[]>("/api/placedTask?id=" + props.group.id, { withCredentials: true, baseURL: BASE_URL  })
                .then(r => setTasks(r.data))
        }
    }, [props.group?.id]);

    const addTask = useCallback((pt: PT) => {
        const newTasks = tasks ? tasks.map(t => t) : [];
        newTasks.push(pt);
        setTasks(newTasks);
    }, [tasks]);

    const dayPts = props.group && tasks ? getDaysArray(props.group, tasks) : [];

    const labels: ReactElement[] = [];
    for(let i = 0; i < 24; i++) {
        labels.push(
            <div key={i} className={styles.DayChunk}>
                <div className={styles.Time}>
                    { getTime(i) }
                </div>
            </div>
        );
    }

    return (
        <div className={styles.Schedule}>
            <div className={styles.ArrowRow}>
                <ChevronLeft size={35} className={styles.Icon}/>
            </div>
            <div className={styles.Calender}>
                <div className={styles.DayTitle}>
                    {days.map((name, i) => {
                        return (
                            <div
                                className={styles.Day}
                                key={i}
                            >
                                <div className={styles.Title}>
                                    { name }
                                </div>
                                <div className={styles.Number}>
                                    { 14 + i}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.DayWrapper}>
                    <Paper className={styles.DayLabels}>
                        { labels }
                    </Paper>
                    {days.map((name, i) => {
                        return (
                            <Day 
                                key={i} 
                                name={name} 
                                number={i}
                                pts={dayPts[i] ? dayPts[i] : []}
                                selectingAt={props.selectingAt}
                                addTask={addTask}
                            />
                        );
                    })}
                </div>
            </div>
            <div className={styles.ArrowRow}>
                <ChevronRight size={35} className={styles.Icon}/>
            </div>
        </div>
    );
}