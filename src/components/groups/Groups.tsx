import { Paper } from "@mantine/core";
import axios from "axios";
import react, { useCallback, useState } from "react";
import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import { GROUP } from "../../App";
import { BASE_URL } from "../../globals";
import styles from "./Groups.module.css";

export interface Group {
    id: string;
    startDay: Date;
    numDays: number;
}

export const Groups = () => {

    const navigate = useNavigate();

    const [groups, setGroups] = useState<Group[]>([]);

    const addGroup = useCallback((group: Group) => {
        const newGroups = groups ? groups.map(g => g) : [];
        newGroups.push(group);
        setGroups(newGroups)
    }, [groups]);

    return (
        <Paper className={styles.SideBar}>
            {groups.map((group, i) => {
                return (
                    <div
                        className={styles.Group}
                        key={i}
                        onClick={() => navigate(GROUP + "/" + group.id)}
                    >
                        G
                    </div>
                );
            })}
            <div
                className={styles.Group}
                onClick={() => {
                    axios.post<Group>("/api/group", {}, { withCredentials: true, baseURL: BASE_URL })
                        .then(r => addGroup(r.data));
                }}
            >
                <Plus size={14}/>
            </div>
        </Paper>
    );
}