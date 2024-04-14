import React, { useRef, useState } from "react";

// Context
import { useAuth } from "../Context/Auth";

// StyleSheet
import '../Styles/AskName.css';


const AskName: React.FC = () => {
    const { login } = useAuth();
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

    const onClickHandler = () => login(name);

    return <>
    <div className="asknamepanel">
        <p>Enter your name here: </p>
        <input type="text" placeholder="Your Name" value={name} onChange={onChangedHandler} onKeyDown={onKeyDownHandler}></input>
        <button ref={Btn} onClick={onClickHandler} disabled={name.trim() == ""}>Okay</button>
    </div>
    </>
};

export default AskName;