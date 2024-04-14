import React, { createContext, useCallback, useContext, useState } from "react";
import { removeSessionAuth, setSessionAuth } from "../Action/session";
import { removeUser } from "../Action/database";
import guidGenerator from "../Action/uuidgen";

export interface Authentication {
    name: string;
    uuid: string;
}

const defineNewAuth = (name: string, uuid: string) => {
    const new_auth: Authentication = {
        name: name,
        uuid: uuid
    };
    return new_auth;
}

const emptyAuth = defineNewAuth('', '');

const AuthContext = createContext<Authentication>(emptyAuth);
const SetterAuthContext = createContext<React.Dispatch<React.SetStateAction<Authentication>> | undefined>(undefined);

interface Prop {
    children: React.ReactNode;
}

const AuthProvider: React.FC<Prop> = ({ children }) => {
    const [auth, setAuth] = useState(emptyAuth);

    return <>
    <AuthContext.Provider value={auth}>
        <SetterAuthContext.Provider value={setAuth}>
            {children}
        </SetterAuthContext.Provider>
    </AuthContext.Provider>
    </>
};

const useAuth = () => {
    const auth = useContext(AuthContext);
    const setAuth = useContext(SetterAuthContext);

    const login = useCallback((name: string, uuid: string | null = null) => {
        if (setAuth && name) {
            const new_auth = defineNewAuth(name, uuid ?? guidGenerator());
            setAuth(new_auth);
            setSessionAuth(new_auth);
        }
    }, [setAuth]);

    const logout = useCallback(() => {
        removeSessionAuth();
        removeUser(auth);
        if (setAuth) {
            setAuth(emptyAuth);
        }
      }, [auth]);

    return {
        auth: auth,
        setAuth: setAuth,
        login: login,
        logout: logout
    }
};


export {AuthProvider, defineNewAuth, emptyAuth, useAuth};