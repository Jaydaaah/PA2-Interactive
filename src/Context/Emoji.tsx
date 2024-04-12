import React, {createContext, useContext, useState} from "react";

export interface Emoji {
    char: string,
    color: string,
    value: number
}

const EmojiList: Emoji[] = [{
        char: "🐝",
        color: "yellow",
        value: 0,
    }, {
        char: "🦋",
        color: "aqua",
        value: 1,
    }, {
        char: "🌷",
        color: "#c1adea",
        value: 2,
    }, {
        char: "😭",
        color: "greenyellow",
        value: 3,
    }
];

const EmojiContext = createContext<Emoji>(EmojiList[0]);
const SetterEmojiContext = createContext<React.Dispatch<React.SetStateAction<Emoji>> | undefined>(undefined);

interface Prop {
    children: React.ReactNode
}

const EmojiProvider: React.FC<Prop> = ({ children }) => {
    const [emoji, setEmoji] = useState(EmojiList[0]);

    return <>
    <EmojiContext.Provider value={emoji}>
        <SetterEmojiContext.Provider value={setEmoji}>
            {children}
        </SetterEmojiContext.Provider>
    </EmojiContext.Provider>
    </>
};

const useEmoji = () => {
    return {
        emoji: useContext(EmojiContext),
        setEmoji: useContext(SetterEmojiContext)
    }
};

export {EmojiList, EmojiProvider, useEmoji};