import React, { useState } from "react";
import '../Styles/AskName.css';
import { setChoice } from "../Action/database";
import guidGenerator from '../Action/uuidgen';

interface Props {
    setterName: React.Dispatch<React.SetStateAction<string>>
}

const AskName: React.FC<Props> = ({ setterName }) => {
    const [name, setName] = useState('');

    const onChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setName(newValue);
    };

    const onClickHandler = () => {
        const uuid = guidGenerator();
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('uuid', uuid);
        setterName(name);
        setChoice(uuid, name);
    }

    return <>
    <div className="asknamepanel">
        <p>Enter your name here: </p>
        <input type="text" value={name} onChange={onChangedHandler}></input>
        <button onClick={onClickHandler}>Okay</button>
    </div>
    </>
};

export default AskName;