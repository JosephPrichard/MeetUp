import react, { useState } from "react";
import { useParams } from "react-router-dom";
import { AgreeableTasks, AT } from "../../components/agreeableTasks/AgreeableTasks";
import { Group, Groups } from "../../components/groups/Groups";
import { Schedule } from "../../components/schedule/Schedule";
import styles from "./Group.page.module.css";

const sampleGroup = {
    id: "id1",
    name: "AwesomeGroup",
    startDate: new Date(2020, 11, 10),
    days: 10
}

export const GroupPage = () => {

    const { id } = useParams();

    const [group, setGroup] = useState<Group>(sampleGroup);

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