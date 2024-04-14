import React, { useCallback, useEffect, useState } from "react";

// Context
import { EmojiList } from "../../Context/Emoji";
import { emptyItem, useSelectedItem } from "./Context/selectedItem";

// Stylesheets
import '../../Styles/AdminStyles/ChoicePoll.css';


interface Props {
    index: number
    percent: number;
    isdisable: boolean;
    editMode: boolean;
}

const ChoicePoll: React.FC<Props> = ({ index, percent, isdisable, editMode }) => {
    const {selectedItem, editIteminlist, getIndexItem} = useSelectedItem();
    const [text, setText] = useState('');
    const [hasEdit, setHasEdit] = useState(false);

    // initialize text updates each time selectedItem changes
    useEffect(() => {
        if (selectedItem != emptyItem) {
            setText(selectedItem.poll.ans[index])
        }
        else {
            setText("");
        }
        setHasEdit(false);
    }, [selectedItem]);

    // set the choice poll text
    const OnBlurHandler = useCallback(() => {
        if (hasEdit) {
            const selected_item_index = getIndexItem(selectedItem);
            const ans: [string, string, string, string] = [...selectedItem.poll.ans];
            ans[index] = text;
            selectedItem.poll.ans = ans;
            editIteminlist(selected_item_index, selectedItem);
            setHasEdit(false);
        }
    }, [text]);


    // capture keyboard input
    const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (editMode) {
            setText(event.target.value);
            setHasEdit(true);
        }
    }, [editMode]);

    return <>
    <div className={"ChoiceBar " + (isdisable ? "disabled" : "")}>
        <div className="progress" style={{
            background: EmojiList[index].color,
            width: `${isdisable ? 0 : percent}%`    
        }}></div>
        <div className="text-container">
            <span>{EmojiList[index].char}</span>
            <input type="text" disabled={isdisable} onBlur={OnBlurHandler} onChange={onChangeHandler} value={text}/>
            <i>{isdisable ? "" : `${percent}%`}</i>
        </div>
    </div>
    </>
};

export default ChoicePoll;