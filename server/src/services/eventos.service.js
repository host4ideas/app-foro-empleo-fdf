//PUT
const { putData } = require("../utils/utils");

function updateEvent(event) {
    return putData("urlapi", event);
}

module.exports = {
    updateEvent,
};
