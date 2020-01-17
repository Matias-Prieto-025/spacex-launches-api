class AuthMiddleware {

    // TODO: implementar jwt
    Verify(req, res, next) {

        //get the token from the header if present
        let token = req.headers['x-api-key'] || req.headers.authorization;

        //if no token found, return response (without going to the next middelware)
        if (!token) 
            return res.status(401).send('Access denied. No token provided.');
        
        // Remove Bearer from string
        token = (token.startsWith('Bearer ')) ? token.slice(7, token.length) : token;

        if (token === 'MyMOckJWT'){
            req.userId = 1;
            return next();
        } else {
            return res.status(401).send('Invalid token.');
        }
    }
}

module.exports = AuthMiddleware;