import React, { createContext, useContext } from "react";

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
    auth: [Authentication, React.Dispatch<React.SetStateAction<Authentication>>];
    children: React.ReactNode;
}

const AuthProvider: React.FC<Prop> = ({ auth, children }) => {
    return <>
    <AuthContext.Provider value={auth[0]}>
        <SetterAuthContext.Provider value={auth[1]}>
            {children}
        </SetterAuthContext.Provider>
    </AuthContext.Provider>
    </>
};

const useAuth = () => {
    return {
        auth: useContext(AuthContext),
        setAuth: useContext(SetterAuthContext)
    }
};


export {AuthProvider, defineNewAuth, emptyAuth, useAuth};