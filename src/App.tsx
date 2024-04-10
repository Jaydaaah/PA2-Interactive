import { useEffect, useState } from 'react'
import MainDisplay from './components/MainDisplay';

// Stylesheets
import './Styles/Style.css';
import './Styles/App.css';
import AskName from './components/AskName';
import { removeUser, setChoice } from './Action/database';


function App() {
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [name, setName] = useState('');
  const [uuid, setuuid] = useState('');

  const logOutClickHandler = () => {
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('uuid');
      setName('');
      setuuid('');
      setEmojiIndex(0);
      removeUser(uuid);
  };

  useEffect(() => {
    let session_saved_name = sessionStorage.getItem('name');
    let session_saved_uuid = sessionStorage.getItem('uuid');
    if (session_saved_name && session_saved_uuid) {
      setName(session_saved_name);
      setuuid(session_saved_uuid);
      setChoice(session_saved_uuid, session_saved_name);
    }
    else {
      setName('');
    }
  }, [name, uuid]);

  useEffect(() => {
    if (uuid && name) {
      setChoice(uuid, name, emojiIndex);
    }
  }, [emojiIndex]);

  return (
    <>
    {
      (name == '' ?
      <AskName setterName={setName}/> : 
      <MainDisplay emojiIndex={emojiIndex} setEmojiIndex={setEmojiIndex} logOutHandler={logOutClickHandler}/>)
    }
    
    </>
  )
}

export default App
