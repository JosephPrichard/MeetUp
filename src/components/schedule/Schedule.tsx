import { Paper } from "@mantine/core";
import { ReactElement, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { AT } from "../agreeableTasks/AgreeableTasks";
import { Group } from "../groups/Groups";
import { Day } from "./day/Day";
import styles from "./Schedule.module.css";

const sampleTasks = [
    {
        id: "pt1",
        at: {
            id: "id2",
            name: "Task2",
            groupId: "Group2",
            location: "Canada",
            link: "http://google.com",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            yesVotes: [],
            noVotes: []
        },
        days: 4,
        timeBlockStart: 8,
        timeBlockDuration: 4
    },
    {
        id: "pt1",
        at: {
            id: "id2",
            name: "Task2",
            groupId: "Group2",
            location: "Canada",
            link: "http://google.com",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            yesVotes: [],
            noVotes: []
        },
        days: 0,
        timeBlockStart: 8,
        timeBlockDuration: 4
    }
];

export interface PT {
    id: string;
    at: AT;
    days: number;
    timeBlockStart: number;
    timeBlockDuration: number;
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
    group: Group;
    selectingAt?: AT;
}

function getDaysArray(group: Group, pts: PT[]): PT[][] {
    const daysArr: PT[][] = [];

    for(let i = 0; i < group.days; i++) {
        daysArr.push([]);
    }

    for(const pt of pts) {
        if (pt.days < group.days) {
            daysArr[pt.days].push(pt);
        }
    }

    return daysArr;
}

export const Schedule = (props: Props) => {

    const [tasks, setTasks] = useState<PT[]>(sampleTasks);

    const addTask = useCallback((pt: PT) => {
        const newTasks = tasks.map(t => t);
        newTasks.push(pt);
        setTasks(newTasks);
    }, [tasks]);

    const dayPts = getDaysArray(props.group, tasks);

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
                                pts={dayPts[i]}
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