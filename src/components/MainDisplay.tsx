import React, { useEffect } from 'react';
import guidGenerator from '../Action/uuidgen';

// Components
import Choice from './Choice';
import DisplayDiv from './DisplayDiv';

// Context
import { EmojiList, useEmoji } from '../Context/Emoji';
import toggleTheme from '../Action/toggleTheme';
import { useAuth } from '../Context/Auth';
import { setChoice } from '../Action/database';

interface Props {
  logOutHandler: () => void;
}

const MainDisplay: React.FC<Props> = ({ logOutHandler }) => {
  const { emoji } = useEmoji();
  const { auth } = useAuth();

  useEffect(() => {
    toggleTheme(emoji);
    setChoice(auth, emoji.value);
  }, [emoji, auth]);

  return <>
  <DisplayDiv/>
  <div className='choicepanel'>
    {EmojiList.map(
      (emoji) => {
        return <Choice key={guidGenerator()} Value={emoji}></Choice>
      }
    )}
  </div>
  <div className='logout'>
    <button onClick={logOutHandler}>Logout</button>
  </div>
  </>
};

export default MainDisplay;