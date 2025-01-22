const User = require('../models/User');
const { response } = require('express');

const addUserColorToRequest = async (req, res = response, next) => {
    try {
        const user = await User.findById(req.uid);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found',
            });
        }

        req.color = user.color;
        
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error retrieving user color',
        })
    }
}

module.exports = {
    addUserColorToRequest,
}