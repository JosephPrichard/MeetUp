import { Button, Input, Modal, Paper, Textarea, TextInput, Title } from "@mantine/core";
import react, { useState } from "react";
import { Plus, X } from "react-feather";
import { AgreeableTask, calcVotes } from "./agreeableTask/AgreeableTask";
import styles from "./AgreeableTasks.module.css";

const sampleTasks = [
    {
        id: "id1",
        name: "Task1",
        groupId: "Group1",
        location: "Mexico",
        link: "http://google.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis dui rutrum, blandit metus vitae, porta turpis. Sed aliquam commodo velit. Vestibulum hendrerit, erat ullamcorper vehicula iaculis, tellus felis gravida tellus, ac ultrices est turpis in quam. Nam posuere elit neque, ac finibus massa tempus laoreet.",
        yesVotes: [],
        noVotes: ["hi"]
    },
    {
        id: "id2",
        name: "Task1",
        groupId: "Group1",
        location: "Mexico",
        link: "http://google.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis dui rutrum, blandit metus vitae, porta turpis. Sed aliquam commodo velit. Vestibulum hendrerit, erat ullamcorper vehicula iaculis, tellus felis gravida tellus, ac ultrices est turpis in quam. Nam posuere elit neque, ac finibus massa tempus laoreet.",
        yesVotes: [],
        noVotes: ["hi"]
    },
    {
        id: "id3",
        name: "Task1",
        groupId: "Group1",
        location: "Mexico",
        link: "http://google.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis dui rutrum, blandit metus vitae, porta turpis. Sed aliquam commodo velit. Vestibulum hendrerit, erat ullamcorper vehicula iaculis, tellus felis gravida tellus, ac ultrices est turpis in quam. Nam posuere elit neque, ac finibus massa tempus laoreet.",
        yesVotes: [],
        noVotes: ["hi"]
    },
    {
        id: "id4",
        name: "Task1",
        groupId: "Group1",
        location: "Mexico",
        link: "http://google.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis dui rutrum, blandit metus vitae, porta turpis. Sed aliquam commodo velit. Vestibulum hendrerit, erat ullamcorper vehicula iaculis, tellus felis gravida tellus, ac ultrices est turpis in quam. Nam posuere elit neque, ac finibus massa tempus laoreet.",
        yesVotes: [],
        noVotes: ["hi"]
    },
    {
        id: "id5",
        name: "Task1",
        groupId: "Group1",
        location: "Mexico",
        link: "http://google.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis dui rutrum, blandit metus vitae, porta turpis. Sed aliquam commodo velit. Vestibulum hendrerit, erat ullamcorper vehicula iaculis, tellus felis gravida tellus, ac ultrices est turpis in quam. Nam posuere elit neque, ac finibus massa tempus laoreet.",
        yesVotes: [],
        noVotes: ["hi"]
    },
    {
        id: "id6",
        name: "Task2",
        groupId: "Group2",
        location: "Canada",
        link: "http://google.com",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        yesVotes: [],
        noVotes: []
    }
];

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

    const [tasks, setTasks] = useState<AT[]>(sort(sampleTasks));

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
            {tasks.map((task, i) => {
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
                <Button 
                    className={styles.Button}
                    onClick={() => {

                    }}
                >
                    Create
                </Button>
            </Modal>
        </Paper>
    );
}