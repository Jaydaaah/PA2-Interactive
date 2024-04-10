function getEmoji(emojiIndex: number) {
    const emoji = ["🐝", "🦋", "🌷", "😭"]
    return emoji[emojiIndex];
}

function getEmojiColor(emojiIndex: number) {
    const color = ["yellow", "aqua", "#c1adea", "greenyellow"];
    return color[emojiIndex];
}

export default getEmoji
export {getEmojiColor};