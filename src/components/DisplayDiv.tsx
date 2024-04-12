import React from "react";
import "../Styles/DisplayDiv.css";
import { useEmoji } from "../Context/Emoji.js";

const DisplayDiv: React.FC = () => {
    const { emoji } = useEmoji();

    return <>
    <div className={`mainDiv ${emoji.char}`}>
        <span className="child">{emoji.char}</span>
    </div>
    </>
}

export default DisplayDiv;
