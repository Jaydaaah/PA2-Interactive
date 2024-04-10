// Firebase
import { ref, set, remove } from 'firebase/database';
import database from './firebase-config.ts';

function getReference(uuid: string) {
    if (uuid) {
        const reference = ref(database, 'users/' + uuid);
        console.log(reference);
    }
}

function setChoice(uuid: string, user_name: string, user_choice = 0) {
    if (uuid) {
        const reference = ref(database, 'users/' + uuid);
        set(reference, {
            user_name: user_name,
            choice: user_choice
        });
    }
}

function removeUser(uuid: string) {
    if (uuid) {
        const reference = ref(database, 'users/' + uuid)
        remove(reference);
    }
}

export {getReference, setChoice, removeUser};
