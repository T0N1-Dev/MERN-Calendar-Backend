/*
Events Routes
host + /api/events
*/
const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");
const router = Router();

// All request should have a JWT
router.use( validateJWT );

// Get Events
router.get('/', getEvents);

// Create a new event
router.post('/', 
    [      
        check('title', 'Title is required').not().isEmpty(),
        validateFields
    ],
    createEvent
);

// Update an event
router.put('/:id', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom( isDate ),
        validateFields
    ],
    updateEvent
);

// Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;