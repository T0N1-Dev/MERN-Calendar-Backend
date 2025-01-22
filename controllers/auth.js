const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const { randomElement } = require('../helpers/generateRandomColor');
 
const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User( req.body );

        user.color = randomElement();
    
        // Encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id, user.username );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.username,
            color: user.color,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error! Please contact administration'
        });
    }
}


const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });
        
        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credentials Error!'
            });
        }
        
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credentials Error!'
            });
        }

        // Generate JWT
        const token = await generateJWT( user.id, user.username );

        res.json({
            ok: true,
            uid: user.id,
            name: user.username,
            color: user.color,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error! Please contact administration'
        });
    }

}


const renewToken = async (req, res = response ) => {

    const { uid, username, color } = req;

    // Generar JWT
    const token = await generateJWT( uid, username );

    res.json({
        ok: true,
        token,
        name: username,
        uid,
        color
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}