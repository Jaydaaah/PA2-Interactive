import React, { useEffect } from 'react';
import guidGenerator from '../Action/uuidgen';

// Models
import { getEmojiColor } from '../Model/Emoji';

// Components
import Choice from './Choice';
import DisplayDiv from './DisplayDiv';

interface Props {
    emojiIndex: number;
    setEmojiIndex: React.Dispatch<React.SetStateAction<number>>;
    logOutHandler: () => void;
}

const MainDisplay: React.FC<Props> = ({ emojiIndex, setEmojiIndex, logOutHandler }) => {
    const toggleTheme = () => {
      const metaTag = document.querySelector('meta[name="theme-color"]');
      const color = getEmojiColor(emojiIndex);
      metaTag?.setAttribute("content", color);
    };

  
    useEffect(() => toggleTheme(), [emojiIndex]);  

    return <>
    <DisplayDiv emojiIndex={emojiIndex}></DisplayDiv>
    <div className='choicepanel'>
      {[0, 1, 2, 3].map(
        (i) => {
          return <Choice key={guidGenerator()} emojiFix={i} currentEmojiSelected={emojiIndex} setter={setEmojiIndex}></Choice>
        }
      )}
    </div>
    <div className='logout'>
      <button onClick={logOutHandler}>Logout</button>
    </div>
    </>
};

export default MainDisplay;