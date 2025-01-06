/*
    Auth Routes
    host + /api/auth
*/
const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
    '/new',
    [ // middlewares
        check('username', 'Name is required').notEmpty().escape(),
        // check('email', 'Email is required').notEmpty().escape(),
        check('password', 'Password is required').notEmpty().escape(),
        check('email', 'Email is wrong').optional().trim().isEmail().escape(),
        check('password', 'The password must be at least 6 long').isLength(6).escape(),
        validateFields
    ], 
    createUser
);

router.post(
    '/', 
    [ // middlewares
        check('email', 'Email is required').notEmpty().escape(),
        check('password', 'Password is required').notEmpty().escape(),
        check('email', 'Email is wrong').optional().trim().isEmail().escape(),
        check('password', 'The password must be at least 6 long').isLength(6).escape(),
        validateFields
    ],
    loginUser);

router.get('/renew', validateJWT, renewToken);

module.exports = router;