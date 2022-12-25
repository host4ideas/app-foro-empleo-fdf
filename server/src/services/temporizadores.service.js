//POST GET(ID) PUT
const { putData, getData, postData } = require("../utils/utils");

function updateTimer(timer) {
    return putData("urlapi", timer);
}
function getTimerById(id) {
    var url = "urlapi/" + id;
    return getData(url);
}
function newTimer(timer) {
    return postData("urlapi", timer);
}

module.exports = {
    updateTimer,
    getTimerById,
    newTimer,
};
