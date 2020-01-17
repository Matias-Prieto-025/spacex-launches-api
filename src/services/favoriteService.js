class FavoriteService {

    isLaunchFavorite(userFavorites, launchId) {

        if (userFavorites.filter( (favorite) => favorite.launchId === launchId).length > 0) {
            return true;
        }

        return false;
    }
}

module.exports = FavoriteService;