const LaunchesService = require('../services/launchesService');
const RocketsService = require('../services/rocketsService');
const FavoriteService = require('../services/favoriteService');
const { Favorite } = require('../models');

class LaunchesController {

    async index(req, res, next) {

        const {userId} = req;
        const launchesService = new LaunchesService();
        const rocketsService = new RocketsService();
        const favoriteService = new FavoriteService();

        try {
            
            const launches = await launchesService.getLaunches();
            const rockets = await rocketsService.getRockets();

            // get all user favorites 
            const userFavorites = await Favorite.findAll({
                where: { userId }
            });
        
            const response = launches.map( launch => {
                
                const { 
                    flight_number,
                    mission_name,
                    description,
                    launch_date_unix,
                    launch_date_local,
                    launch_date_utc,
                    rocket: {rocket_id},
                    rocket: {second_stage: {payloads}}
                } = launch;
                
                return {
                    flight_number,
                    mission_name,
                    description,
                    launch_date_unix,
                    launch_date_local,
                    launch_date_utc,
                    rocket: rocketsService.getRocketData(rocket_id, rockets),
                    payloads,
                    isFavorite: favoriteService.isLaunchFavorite(userFavorites, flight_number)
                }

            });

            return res.json(response);

        } catch (error) {
            return res.status(500).send('Internal server error');
        }
     
    }


    async saveFavorite(req, res, next) {

        const {launchId} = req.params;
        const {userId} = req;
        const newFavorite = { launchId, userId };

        // check if favorite is already saved
        const savedFavorite = await Favorite.findOne({ where: newFavorite });

        if (savedFavorite) {
            return res.status(400).send('Favorite already saved')
        }

        try {
            const response = await Favorite.create(newFavorite);
            return res.status(201).send(true);

        } catch (error) {
            return res.status(500).send('Internal server error');
        }
    }

}

module.exports = LaunchesController;