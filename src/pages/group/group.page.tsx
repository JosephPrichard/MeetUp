import react from "react";
import { useParams } from "react-router-dom";

export const GroupPage = () => {

    const { id } = useParams();

    console.log("id", id)

    if(id) {
        return (
            <div>
                { id }
            </div>
        );
    } else {
        return (
            <div>
                
            </div>
        );
    }
}