// Firebase
import { ref, set, remove, get, DatabaseReference } from 'firebase/database';
import database from './firebase-config.ts';
import { Authentication } from '../Context/Auth.tsx';
import { Item, defineNewItem, emptyItem } from '../components/AdminComponents/Context/selectedItem.tsx';

function getReference(uuid: string) {
    if (uuid) {
        const reference = ref(database, 'users/' + uuid);
        return reference;
    }
    return null;
}

function setChoice(auth: Authentication, user_choice = 0) {
    if (auth.uuid && auth.name) {
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

function resetChoices() {
    const reference = ref(database, 'users/');
    get(reference)
    .then((snapshot) => {
        if (snapshot.exists()) {
            let _ref: DatabaseReference;
            snapshot.forEach((node) => {
                _ref = node.child("choice").ref;
                set(_ref, -1);
            });
        }
    });
}

function perc(val: number, base: number) {
    if (base > 0) {
        return ((val / base) * 100);
    }
    return 0;
}

// admin functions
function computeUser(callback: (compute_score: [number, number, number, number]) => void) {
    const compute_score: [number, number, number, number, number] = [0, 0, 0, 0, 0];
    const reference = ref(database, 'users/');
    get(reference)
    .then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((node) => {
                const choice = node.child("choice").val()
                if (choice >= 0) {
                    compute_score[choice]++;
                    compute_score[compute_score.length - 1]++;
                }
            });
            callback([
                perc(compute_score[0], compute_score[4]),
                perc(compute_score[1], compute_score[4]),
                perc(compute_score[2], compute_score[4]),
                perc(compute_score[3], compute_score[4]),
        ]);
        }
        else {
            console.log(`snapshot not existing`);
        }
    });
}

function setQuestion(item: Item) {
    if (item != emptyItem) {
        const reference = ref(database, 'question/' + item.id);
        set (reference, {
            text: item.text,
            poll: {
                question: item.poll.question,
                ans: [
                    item.poll.ans[0],
                    item.poll.ans[1],
                    item.poll.ans[2],
                    item.poll.ans[3],
                ]
            }
        })
    }
}

function removeQuestion(item: Item) {
    if (item != emptyItem) {
        const reference = ref(database, 'question/' + item.id);
        remove(reference);
    }
}

function retrieveQuestion(callback: (retrieved_itemlist: Item[]) => void) {
    const reference = ref(database, 'question');
    get(reference)
    .then((snapshot) => {
        if (snapshot.exists()) {
            let list: Item[] = []
            snapshot.forEach((node) => {
                const new_item = defineNewItem(
                    node.child('text').val(),
                    node.child('poll/question').val(),
                    node.child('poll/ans').val(),
                    node.key,
                );
                list = [...list, new_item];
            });
            callback(list);
        }
    });
}

export {getReference, setChoice, removeUser, computeUser, resetChoices, setQuestion, removeQuestion, retrieveQuestion};
