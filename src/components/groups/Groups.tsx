import { Paper } from "@mantine/core";
import react, { useState } from "react";
import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import { GROUP } from "../../App";
import styles from "./Groups.module.css";

export interface Group {
    id: string;
    name: string;
    startDate: Date;
    days: number;
}

const sampleGroups = [
    {
        id: "id1",
        name: "AwesomeGroup",
        startDate: new Date(2020, 11, 10),
        days: 10
    },
    {
        id: "id2",
        name: "PolaroidTeam",
        startDate: new Date(2020, 5, 10),
        days: 6
    }
];

export const Groups = () => {

    const navigate = useNavigate();

    const [groups, setGroups] = useState<Group[]>(sampleGroups);

    return (
        <Paper className={styles.SideBar}>
            {groups.map((group, i) => {
                return (
                    <div
                        className={styles.Group}
                        key={i}
                        onClick={() => navigate(GROUP + "/" + group.id)}
                    >
                        { group.name[0].toUpperCase() }
                    </div>
                );
            })}
            <div
                className={styles.Group}
                onClick={() => {}}
            >
                <Plus size={14}/>
            </div>
        </Paper>
    );
}