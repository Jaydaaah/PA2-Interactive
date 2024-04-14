import React, { useCallback, useEffect } from "react";

// Components
import SideBar from "./AdminComponents/Sidebar";
import QuestionHeader from "./AdminComponents/QuestionHeader";

// Context
import { Item, useSelectedItem } from "./AdminComponents/Context/selectedItem";
import { retrieveQuestion } from "../Action/database";

const Admin: React.FC = () => {
    const {setItemlist} = useSelectedItem();

    const retrieveQuestionHandler = useCallback((retrieved_itemlist: Item[]) => {
        if (setItemlist) {
            setItemlist(retrieved_itemlist);
        }
    }, []);

    useEffect(() => {
        retrieveQuestion(retrieveQuestionHandler);
    }, []);

    return <>
    <div>
        <QuestionHeader/>
        <SideBar/>
    </div>
    </>
};

export default Admin;