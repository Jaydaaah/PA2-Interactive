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


const MainDisplay: React.FC = () => {
  const { emoji } = useEmoji();
  const { auth, logout } = useAuth();

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
    <button onClick={logout}>Logout</button>
  </div>
  </>
};

export default MainDisplay;