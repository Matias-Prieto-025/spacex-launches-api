const AxiosService = require('./axios');

class LaunchesServices {

    constructor() {
        this.axiosService = new AxiosService();
    }

    async getLaunches() {

        const uri = '/launches';

        try {
            
            const result = await this.axiosService.sendRequest(uri);
            return result.data;

        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = LaunchesServices;