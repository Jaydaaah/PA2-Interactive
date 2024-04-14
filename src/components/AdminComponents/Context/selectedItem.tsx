import React, { createContext, useCallback, useContext, useState } from "react";
import guidGenerator from "../../../Action/uuidgen";

export interface Item {
    id: string,
    text: string,
    poll: {
        question: string,
        ans: [string, string, string, string]
    }
}

const defineNewItem = (text: string, question: string = "", ans: [string, string, string, string] = ["", "", "", ""],
                        _id: string | null = null) => {
    const new_item: Item = {
        id: _id ?? guidGenerator(),
        text: text,
        poll: {
            question: question,
            ans: ans
        }
    }
    return new_item;
};

const emptyItem = defineNewItem("");

const SelectedItemContext = createContext<Item>(emptyItem);
const SetterSelectedItemContext = createContext<React.Dispatch<React.SetStateAction<Item>> | undefined>(undefined);

const ItemlistContext = createContext<Item[]>([]);
const SetterItemlistContext = createContext<React.Dispatch<React.SetStateAction<Item[]>> | undefined>(undefined);

interface Prop {
    children: React.ReactNode;
}

const SelectedItemProvider: React.FC<Prop> = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(emptyItem);
    const [itemlist, setItemlist] = useState<Item[]>([]);

    return <>
    <SelectedItemContext.Provider value={selectedItem}>
        <ItemlistContext.Provider value={itemlist}>
            <SetterSelectedItemContext.Provider value={setSelectedItem}>
                <SetterItemlistContext.Provider value={setItemlist}>
                    {children}
                </SetterItemlistContext.Provider>
            </SetterSelectedItemContext.Provider>
        </ItemlistContext.Provider>
    </SelectedItemContext.Provider>
    </>
};


const useSelectedItem = () => {
    const itemlist = useContext(ItemlistContext);
    const selectedItem = useContext(SelectedItemContext)
    const setItemlist = useContext(SetterItemlistContext);
    const setSelectedItem = useContext(SetterSelectedItemContext);
    
    const addItemtolist = useCallback((new_item: Item) => {
        if (setItemlist) {
            setItemlist((cur_itemlist) => {
                return [...cur_itemlist, new_item];
            });
        }
    }, [setItemlist]);

    const removeItemfromlist = useCallback((item: Item) => {
        if (setItemlist && item != emptyItem) {
            setItemlist((cur_itemlist) => {
                let copy: Item[] = [];
                for (var i of cur_itemlist) {
                    if (i.id !== item.id) {
                        copy = [...copy, i];
                    }
                }
                return copy;
            })
        }
    }, [setItemlist, itemlist]);

    const editIteminlist = useCallback((index: number, update_item: Item) => {
        if (setItemlist) {
            setItemlist((cur_itemlist) => {
                const updated_list = [...cur_itemlist];
                updated_list[index] = update_item;
                return updated_list;
            });
        }
    }, [setItemlist]);

    const getIndexItem = useCallback((item: Item) => itemlist.indexOf(item), [itemlist]);

    return {
        itemlist: itemlist,
        setItemlist: setItemlist,
        selectedItem: selectedItem,
        setSelectedItem: setSelectedItem,

        addItemtolist: addItemtolist,
        editIteminlist: editIteminlist,
        removeItemfromlist: removeItemfromlist,
        getIndexItem: getIndexItem
    } 
}

export {defineNewItem, emptyItem, SelectedItemProvider, useSelectedItem};