import React from "react";
import "../Styles/Choice.css";
import getEmoji from "../Model/Emoji.js";

interface Props {
    emojiFix: number;
    currentEmojiSelected: number;
    setter: React.Dispatch<React.SetStateAction<number>>
}

const Choice: React.FC<Props> = ({ emojiFix, currentEmojiSelected, setter }) => {
    const clickHandler = () => {
        setter(emojiFix)
    };

    return <button className={`emoji ${currentEmojiSelected == emojiFix ? 'current' : ''}`} onClick={clickHandler}>
        <span>{getEmoji(emojiFix)}</span>
    </button>
}

export default Choice;
