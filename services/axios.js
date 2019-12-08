const axios = require('axios');

class AxiosService {

    //TODO: define env var for base uri
    constructor() {
        this.baseUrl = process.env.SPACEX_API_URI;
    }

    async sendRequest(url, method = 'get', data = null) {

        try {
            const fullUri = `${this.baseUrl}${url}`;
            const response = await axios({ url: fullUri, method, data, withCredentials: true});
            return response;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = AxiosService;
