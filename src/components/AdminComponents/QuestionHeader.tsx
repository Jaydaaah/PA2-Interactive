import React, { useCallback, useEffect, useState } from "react";
import { emptyItem, useSelectedItem } from "./Context/selectedItem";

// Components
import ChoicePoll from "./ChoicePoll";

// Stylesheet
import '../../Styles/AdminStyles/QuestionHeader.css';
import { computeUser, removeQuestion, resetChoices, setQuestion } from "../../Action/database";
import { useAuth } from "../../Context/Auth";

const QuestionHeader: React.FC = () => {
    const { logout } = useAuth();
    const { selectedItem, setSelectedItem, getIndexItem, editIteminlist, removeItemfromlist } = useSelectedItem();
    const [editMode, setEditMode] = useState(false);
    const [hasEdit, setHasEdit] = useState(false);
    const [isdisable, setIsdisable] = useState(false);
    const [text, setText] = useState('');
    const [computeScore, setComputeScore] = useState<[number, number, number, number, number]>([0, 0, 0, 0, 0]);

    // initialize the text input each time selected item changes
    useEffect(() => {
        setText(selectedItem.poll.question);
        setHasEdit(false);
        setIsdisable(selectedItem == emptyItem);
        setComputeScore([0, 0, 0, 0, 0]);
    }, [selectedItem])

    // toggle edit mode
    const onClickEditToggleHandler = useCallback(() => {
        if (editMode) {
            setQuestion(selectedItem);
        }
        setEditMode(!editMode);
    }, [editMode]);

    // compute percentage
    const ComputeHandler = useCallback((compute_score: [number, number, number, number, number]) => {
        setComputeScore(compute_score);
    }, [setComputeScore]);

    // reset computer score
    const onClickResetHandler = useCallback(() => {
        setComputeScore([0, 0, 0, 0, 0]);
        resetChoices();
    }, [setComputeScore]);

    // delete the item
    const onClickDeleteHandler = useCallback(() => {
        removeQuestion(selectedItem);
        removeItemfromlist(selectedItem);
        if (setSelectedItem) {
            setSelectedItem(emptyItem);
        }
    }, [selectedItem]);
    
    // capture keyboard input
    const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
        setHasEdit(true);
    }, [selectedItem]);

    // saves the changes to the selected item
    const OnBlurHandler = useCallback(() => {
        if (hasEdit) {
            const index = getIndexItem(selectedItem);
            selectedItem.text = text.substring(0, 8);
            selectedItem.poll.question = text;
            editIteminlist(index, selectedItem);
        }
    }, [text]);

    return <>
    <div className="adminFullDiv">
        <div className="adminToolbox">
            <button onClick={() => computeUser(ComputeHandler)} disabled={isdisable}>Compute</button>
            <button onClick={onClickResetHandler}>Reset</button>
            <button onClick={onClickEditToggleHandler} disabled={isdisable}>{editMode ? "Save" : "Edit"}</button>
            <button onClick={onClickDeleteHandler} disabled={isdisable}>Delete</button>
            <button onClick={logout}>Log out</button>
        </div>
        <textarea value={text}
        onChange={onChangeHandler}
        onBlur={OnBlurHandler}
        disabled={isdisable || !editMode}></textarea>

        <div className="choicepolloutdiv">
            {
                [0, 1, 2, 3].map((i) => {
                    return <ChoicePoll key={i} index={i}
                    vote={{
                        count: computeScore[i],
                        base: computeScore[4]
                    }}
                    isdisable={isdisable} editMode={editMode}/>
                })
            }
        </div>
    </div>
    </>
};

export default QuestionHeader;