const axios = require("axios");

//VARIABLE PARA CAMBIAR EL USO DE LA API
const baseUrl = "https://apitimersforoempleofdf.azurewebsites.net/";

//  Simple axios pre-configuration
// Method should be a string such as "get" or "post". Others have not been tested and are recommended to find an alternative to this method or even axios
// EndPoint should be a string that represents the url after the base url declared above, don't forget the / at the end, that may result in a 401 response that may be treated as an expired token incorrectly
// Data is the payload included in the message, so far we've only used json objects such as {variableName: variableValue, variable2: variable2Value}
// Params are optional additional information sent through the url such as ?variableName=variableValue. DO NOT HARDCODE INTO THE URL (axios doesn't like it and is most likely not going to work), put them in a JSON object like data. Additionally, don't put sensitive information in params as it can be read by potential attackers

const networkRequest = async (method, endPoint, data, params) => {
    const url = baseUrl + endPoint;
    //Authentication token is set globaly for all axios calls in LoginScreen and RegisterScreen after succesfuly retrieving a token
    const headers = {
        Accept: "application/json",
    };

    //This way of doing axios calls seems deprecated or about to be deprecated, consider updating this at some point
    //There's an automatic timeout at 3 seconds
    const instance = axios.create({
        headers: headers,
        data: data,
        timeout: 3000,
        params: params,
    });
    try {
        const response = await instance.request({
            method,
            url,
            headers,
            data,
        });
        return response;
    } catch (error) {
        //Currently unimplemented
        if (error.response.status === 500) {
            return error;
            // Internal error
        } else if (
            error.response.status === 401 ||
            error.response.status === 403
        ) {
            // Logout, as incredible as it'd be to globaly manage logouts here, hooks prevent me from doing so
            return error;
        }
        throw error;
    }
};

module.exports = { networkRequest };
