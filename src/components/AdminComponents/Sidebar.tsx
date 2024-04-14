import React, { useCallback, useState } from "react";

// Icons
import MenuLogo from '../../assets/Menu.svg';

// Context
import { Item, defineNewItem, useSelectedItem } from "./Context/selectedItem";

// Stylesheets
import '../../Styles/AdminStyles/Sidebar.css';


const SideBar: React.FC = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const { selectedItem, setSelectedItem, itemlist, addItemtolist } = useSelectedItem();

    const clickHandler = useCallback( (value: Item) => {
        if (setSelectedItem) {
            setSelectedItem(value);
        }
    }, []);

    const toggleHandler = useCallback(() => {
        setToggleSidebar(!toggleSidebar);
    }, [toggleSidebar]);

    // toggle off sidebar when mouse leaves
    const onMouseLeaveHandler = useCallback(() => {
        setToggleSidebar(false);
    }, []);

    // add item click handler 
    const onClickAddHandler = useCallback(() => {
        const new_item = defineNewItem(`Item ${itemlist.length + 1}`);
        addItemtolist(new_item);
        if (setSelectedItem) {
            setSelectedItem(new_item);
        }
    }, [itemlist]);

    return <>
    <div className={"sideBar " + (toggleSidebar ? "" : "hide")}
        onMouseLeave={onMouseLeaveHandler}>
        <button className="menuBTN" onClick={toggleHandler}>
            <img src={MenuLogo}></img>
        </button>
        <nav className={"sideBar " + (toggleSidebar ? "" : "hide")}>
            <ul>
                {
                    itemlist.map(
                        (item) => {
                            return <li key={item.id} className={selectedItem.id == item.id ? "current" : ""}
                                onClick={() => clickHandler(item)}>
                                <span>{item.text}</span>
                            </li>
                        }
                    )
                }
            </ul>
        </nav>
        {
            toggleSidebar ?
            <button className="floating" onClick={onClickAddHandler}>&#65291; Add item</button> : ""
        }
        
    </div>
    </>
};

export default SideBar;