import { Authentication } from "../Context/Auth";

const setSessionAuth = (auth: Authentication) => {
    sessionStorage.setItem('name', auth.name);
    sessionStorage.setItem('uuid', auth.uuid);
};

const removeSessionAuth = () => {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('uuid');
}

export { setSessionAuth, removeSessionAuth };