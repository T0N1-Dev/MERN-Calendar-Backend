const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    
    const payload = { uid, name };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Could not generate the token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}