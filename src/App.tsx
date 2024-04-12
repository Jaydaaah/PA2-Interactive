import { useCallback, useEffect, useState } from 'react'
import MainDisplay from './components/MainDisplay';

// Components
import AskName from './components/AskName';

// Actions
import { removeUser } from './Action/database';

// Context
import { EmojiProvider } from './Context/Emoji';

// Stylesheets
import './Styles/Style.css';
import './Styles/App.css';
import { AuthProvider, defineNewAuth, emptyAuth } from './Context/Auth';
import { removeSessionAuth } from './Action/session';


function App() {
  const _auth = useState(emptyAuth);
  const [auth, setAuth] = _auth;

  const logOutClickHandler = useCallback(() => {
    removeSessionAuth();
    removeUser(auth);
    setAuth(emptyAuth);
  }, [auth]);

  useEffect(() => {
    const session_saved_name = sessionStorage.getItem('name');
    const session_saved_uuid = sessionStorage.getItem('uuid');
    if (session_saved_name && session_saved_uuid) {
      setAuth(defineNewAuth(session_saved_name, session_saved_uuid));
    }
    else {
      setAuth(emptyAuth);
    }
  }, []);

  return (
    <>
    <AuthProvider auth={_auth}>
      {
      (auth == emptyAuth ?
      <AskName/> :
      <EmojiProvider>
        <MainDisplay logOutHandler={logOutClickHandler}/>
      </EmojiProvider>)
      }
    </AuthProvider>
    </>
  )
}

export default App
