const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => {
    // Error handling
    const result = validationResult(req);
    if ( !result.isEmpty() ) {
        return res.send({errors: result.array()});
    }
    
    next();
};

module.exports = {
    validateFields
}