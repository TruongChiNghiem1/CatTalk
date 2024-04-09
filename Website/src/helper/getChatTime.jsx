const getChatTime = (dateString) => {
    const date = new Date(dateString);
    return  `${date.getHours()}:${date.getMinutes()}`;
}
export default getChatTime