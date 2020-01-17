const AxiosService = require('./axios');

class RocketsServices {

    constructor() {
        this.axiosService = new AxiosService();
    }

    async getRockets() {

        const uri = '/rockets';

        try {
            
            const result = await this.axiosService.sendRequest(uri);
            return result.data;

        } catch (error) {
            throw error;
        }
        
    }

    getRocketData(rocketsId, rockets) {

        const rocket = rockets.filter(item => item.rocket_id == rocketsId);
        const {
            rocket_id,
            rocket_name,
            description,
            country,
            company,
            cost_per_launch,
            images,
        } = rocket.shift();

        return {
            rocket_id,
            rocket_name,
            description,
            country, 
            company,
            cost_per_launch,
            images
        }
    }
}

module.exports = RocketsServices;