import React, { useCallback } from "react";
import "../Styles/Choice.css";
import { Emoji, useEmoji } from "../Context/Emoji";

interface Props {
    Value: Emoji
}

const Choice: React.FC<Props> = ({ Value }) => {
    const { emoji, setEmoji} = useEmoji();

    const clickHandler = useCallback(() => {
        if (setEmoji) {
            setEmoji(Value);
        }
    }, []);

    return <button className={`emoji ${emoji === Value ? 'current' : ''}`} onClick={clickHandler}>
        <span>{Value.char}</span>
    </button>
}

export default Choice;
