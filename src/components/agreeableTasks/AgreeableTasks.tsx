import { Button, Input, Modal, Paper, Textarea, Title } from "@mantine/core";
import axios from "axios";
import react, { useCallback, useEffect, useState } from "react";
import { Plus, X } from "react-feather";
import { BASE_URL } from "../../globals";
import { AgreeableTask, calcVotes } from "./agreeableTask/AgreeableTask";
import styles from "./AgreeableTasks.module.css";

export interface AT {
    id: string;
    name: string;
    groupId: string;
    location: string;
    link: string;
    description: string;
    yesVotes: string[];
    noVotes: string[];
}

interface Props { 
    groupId: string;
    selectingAt: AT | undefined;
    setSelectingAt: (at: AT | undefined) => void;
}

function sort(tasks: AT[]) {
    return tasks.sort((task1, task2) => calcVotes(task2) - calcVotes(task1));
}

export const AgreeableTasks = (props: Props) => {

    const [tasks, setTasks] = useState<AT[]>();

    const addTasks = useCallback((at: AT) => {
        const newTasks = tasks ? tasks.map(a => a) : [];
        newTasks.push(at);
        setTasks(newTasks);
    }, [tasks]);

    useEffect(() => {
        axios.get<AT[]>("/api/task?id=" + props.groupId, { withCredentials: true, baseURL: BASE_URL })
            .then(r => setTasks(sort(r.data)))
    }, [props.groupId]);

    const [name, setName]= useState("");
    const [location, setLocation] = useState("");
    const [desc, setDesc] = useState("");

    const [showDelete, setShowDelete] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    return (
        <Paper className={styles.AgreeableTasks}>
            <div>
                <Title order={2} className={styles.TaskTitle}>
                    Tasks
                </Title>
                <Button 
                    className={styles.AddTaskButton}
                    onClick={() => setShowCreate(true)}
                >
                    <Plus size={14}/>
                </Button>
                <Button 
                    className={styles.TrashCan} 
                    color="red" 
                    onClick={() => setShowDelete(!showDelete)}
                >
                    <X size={14}/>
                </Button>
            </div> 
            {!tasks || tasks.map((task, i) => {
                return (
                    <AgreeableTask
                        task={task}
                        showDelete={showDelete}
                        selected={task.id !== props.selectingAt?.id}
                        onClick={() => {
                            if (task.id !== props.selectingAt?.id) {
                                props.setSelectingAt(task)
                            } else {
                                props.setSelectingAt(undefined);
                            }
                        }}
                        removeTask={(id: string) => {
                            props.setSelectingAt(undefined);
                            const newTasks = tasks ? tasks.map(a => a) : [];
                            for (let i = 0; i < newTasks.length; i++) {
                                if (newTasks[i].id === id) {
                                    newTasks.splice(i, 1);
                                    setTasks(newTasks);
                                    return;
                                }
                            }
                        }}
                        key={i}
                    />
                );
            })}
             <Modal
                opened={showCreate}
                onClose={() => setShowCreate(false)}
                title="Create Agreeable Task"
                className={styles.Modal}
                size="md"
                overlayOpacity={0.75}
                styles={{
                    modal: { backgroundColor: "rgb(47, 49, 54)" }
                }}
            >
                <form onSubmit={(e) => {
                    e.preventDefault();

                    const body = {
                        name: name,
                        groupId: props.groupId,
                        location: location,
                        link: "",
                        description: desc
                    }

                    axios.post<AT>("/api/task", body, { withCredentials: true, baseURL: BASE_URL })
                        .then(r => addTasks(r.data));
                }}>
                    <Input
                        className={styles.Field}
                        placeholder="Name"
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.currentTarget.value)}
                        styles={{
                            input: { backgroundColor: "rgb(39,41,44)" }
                        }}
                    />
                    <Input
                        className={styles.Field}
                        placeholder="Location"
                        value={location}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLocation(event.currentTarget.value)}
                        styles={{
                            input: { backgroundColor: "rgb(39,41,44)" }
                        }}
                    />
                    <Textarea
                        placeholder="Description"
                        value={desc}
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(event.currentTarget.value)}
                        styles={{
                            input: { 
                                backgroundColor: "rgb(39,41,44)",
                            }
                        }}
                        classNames={{
                            input: styles.Description
                        }}
                    />
                    <Button className={styles.Button} type="submit">
                        Create
                    </Button>
                </form>
            </Modal>
        </Paper>
    );
}