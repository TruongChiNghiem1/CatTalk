const getHumanReadableDate = (date) => {
    var now = new Date();
    var diff = Math.floor((now - date) / 1000); // Chênh lệch thời gian tính bằng giây

    if (diff < 60) {
        return diff + ' seconds ago';
    } else if (diff < 3600) {
        var minutes = Math.floor(diff / 60);
        return minutes + ' minutes ago';
    } else if (diff < 86400) {
        var hours = Math.floor(diff / 3600);
        return hours + ' hours ago';
    } else {
        var days = Math.floor(diff / 86400);
        return days + ' days ago';
    }
}

module.exports = getHumanReadableDate
