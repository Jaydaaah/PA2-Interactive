import React, { useRef, useState } from "react";

// Actions
import guidGenerator from '../Action/uuidgen';

// Context
import { defineNewAuth, useAuth } from "../Context/Auth";

// StyleSheet
import '../Styles/AskName.css';
import { setSessionAuth } from "../Action/session";


const AskName: React.FC = () => {
    const {setAuth} = useAuth();
    const [name, setName] = useState('');
    const Btn = useRef<HTMLButtonElement>(null);

    const onChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            Btn.current?.click()
        }
    }

    const onClickHandler = () => {
        const uuid = guidGenerator();
        if (setAuth) {
            const new_auth = defineNewAuth(name, uuid);
            setAuth(new_auth);
            setSessionAuth(new_auth);
        }
    }

    return <>
    <div className="asknamepanel">
        <p>Enter your name here: </p>
        <input type="text" placeholder="Your Name" value={name} onChange={onChangedHandler} onKeyDown={onKeyDownHandler}></input>
        <button ref={Btn} onClick={onClickHandler} disabled={name.trim() == ""}>Okay</button>
    </div>
    </>
};

export default AskName;