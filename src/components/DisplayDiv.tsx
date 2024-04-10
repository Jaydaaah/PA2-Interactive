import React from "react";
import "../Styles/DisplayDiv.css";
import getEmoji from "../Model/Emoji.js";

interface Props {
    emojiIndex: number;
}

const DisplayDiv: React.FC<Props> = ({ emojiIndex }) => {
    return <>
    <div className={`mainDiv ${getEmoji(emojiIndex)}`}>
        <span className="child">{getEmoji(emojiIndex)}</span>
    </div>
    </>
}

export default DisplayDiv;
