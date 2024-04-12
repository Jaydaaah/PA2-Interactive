// Firebase
import { ref, set, remove } from 'firebase/database';
import database from './firebase-config.ts';
import { Authentication } from '../Context/Auth.tsx';

function getReference(uuid: string) {
    if (uuid) {
        const reference = ref(database, 'users/' + uuid);
        console.log(reference);
    }
}

function setChoice(auth: Authentication, user_choice = 0) {
    if (auth.uuid) {
        const reference = ref(database, 'users/' + auth.uuid);
        set(reference, {
            user_name: auth.name,
            choice: user_choice
        });
    }
}

function removeUser(auth: Authentication) {
    if (auth.uuid) {
        const reference = ref(database, 'users/' + auth.uuid)
        remove(reference);
    }
}

export {getReference, setChoice, removeUser};
