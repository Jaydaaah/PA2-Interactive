import { Emoji } from "../Context/Emoji";

const toggleTheme = (emoji: Emoji) => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    metaTag?.setAttribute("content", emoji.color);
};

export default toggleTheme;