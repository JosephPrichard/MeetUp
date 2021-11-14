import axios from "axios";
import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AgreeableTasks, AT } from "../../components/agreeableTasks/AgreeableTasks";
import { Group, Groups } from "../../components/groups/Groups";
import { Schedule } from "../../components/schedule/Schedule";
import { BASE_URL } from "../../globals";
import styles from "./Group.page.module.css";

export const GroupPage = () => {

    const { id } = useParams();

    console.log("id", id)

    const [group, setGroup] = useState<Group>();

    console.log(group)

    useEffect(() => {
        axios.get<Group>("/api/group?id=" + id, { withCredentials: true, baseURL: BASE_URL  })
            .then(r => setGroup(r.data))
    }, [id]);

    const [selectingAt, setSelectingAt] = useState<AT | undefined>(undefined);

    if(id) {
        return (
            <div 
                className={styles.GroupPage}
                style={{
                    minWidth: window.screen.availWidth
                }}
            >
                <Groups/>
                <div className={styles.Wrapper}>
                    <AgreeableTasks selectingAt={selectingAt} setSelectingAt={setSelectingAt} groupId={id}/>
                </div>
                <Schedule selectingAt={selectingAt} group={group}/>
            </div>
        );
    } else {
        return (
            <div>
                
            </div>
        );
    }
}