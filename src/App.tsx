import { useEffect } from 'react'
import MainDisplay from './components/MainDisplay';

// Components
import AskName from './components/AskName';

// Context
import { EmojiProvider } from './Context/Emoji';

// Stylesheets
import './Styles/Style.css';
import './Styles/App.css';
import { emptyAuth, useAuth } from './Context/Auth';
import Admin from './components/Admin';
import { SelectedItemProvider } from './components/AdminComponents/Context/selectedItem';


function App() {
  const {auth, login, logout} = useAuth();

  useEffect(() => {
    const session_saved_name = sessionStorage.getItem('name');
    const session_saved_uuid = sessionStorage.getItem('uuid');
    if (session_saved_name && session_saved_uuid) {
      login(session_saved_name, session_saved_uuid);
    }
    else {
      logout();
    }
  }, []);

  return (
    <>
    {
    (auth == emptyAuth ?
    <AskName/> : (
      auth.name === "admin321" ?
      <SelectedItemProvider>
        <Admin/>
      </SelectedItemProvider> :
      <EmojiProvider>
        <MainDisplay/>
      </EmojiProvider>
    )
    )
    }
    </>
  )
}

export default App;
