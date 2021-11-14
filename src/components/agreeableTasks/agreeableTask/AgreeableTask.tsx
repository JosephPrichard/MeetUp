import { Button, Paper, Title } from "@mantine/core";
import react from "react";
import { ChevronDown, ChevronUp, X } from "react-feather";
import { AT } from "../AgreeableTasks";
import styles from "./AgreeableTask.module.css"

interface Props {
    task: AT;
    showDelete: boolean;
    selected: boolean;
    onClick: () => void;
}

export function calcVotes(task: AT) {
    return task.yesVotes.length - task.noVotes.length;
}

function voteString(task: AT) {
    const votes = calcVotes(task);
    if (votes >= 0) {
        return "+" + votes;
    } else {
        return votes;
    }
}

export const AgreeableTask = (props: Props) => {

    console.log(props.task);

    return (
        <Paper 
            className={styles.AgreeableTask}
            style={{
                backgroundColor: props.selected ? "rgb(58, 60, 67)" : "rgb(58,114,192)"
            }}
            onClick={props.onClick}
        >
            <div className={styles.Fade}>
                <div className={styles.Main}>
                    <Title order={4}>
                        { props.task.name }
                    </Title>
                    <span className={styles.Location}>
                        { props.task.location }
                    </span>
                    {/* <iframe width="100%" height={80} src={props.task.link} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">

                    </iframe> */}
                    <div className={styles.Desc}>
                        { props.task.description }
                    </div>
                </div>
                <div className={styles.Side}>
                    <button className={styles.Button}>
                        <ChevronUp size={20} className={styles.Icon}/>
                    </button>
                    <div className={styles.Votes}>
                        { voteString(props.task) }
                    </div>
                    <button className={styles.Button}>
                        <ChevronDown size={20} className={styles.Icon}/>
                    </button>
                </div>
            </div>
            {!props.showDelete || <Button className={styles.TrashCan} color="red">
                <X size={14}/>
            </Button>}
        </Paper>
    );
}