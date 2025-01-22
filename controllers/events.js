const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                                .populate('user','username');

    res.json({
        ok: true,
        eventos: events
    });
}

const createEvent = async ( req, res = response ) => {
    const { title, ...rest } = req.body;

    
    try {
        const existsEvent = await Event.findOne({title});

        if ( existsEvent ) {
            return res.status(400).json({
                ok: false,
                msg: `An event with the title "${title}" already exists.`
            });
        }

        const event = new Event({
            title,
            ...rest,
            user: req.uid
        });
        
        const eventSaved = await event.save();

        res.status(201).json({
            ok: true,
            event: eventSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error! Please contact administartion.'
        });
    }
}

const updateEvent = async( req, res = response ) => {
    
    const eventId = req.params.id;
    const uid = req.uid;
    const { title, ...rest } = req.body;

    try {
        const existsEvent = await Event.findOne({title});
        const event = await Event.findById( eventId );

        // Some Validations to consider before updating
        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that id.'
            });
        } else if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Permission error'
            });
        } else if ( existsEvent && existsEvent.id !== eventId ) {
            return res.status(400).json({
                ok: false,
                msg: `An event with the title "${title}" already exists.`
            });
        }

        const newEvent = {
            title,
            ...rest,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        res.json({
            ok: true,
            evento: eventUpdated
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error! Please contact administartion.'
        });
    }

}

const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that id.'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Error! Permission error.'
            });
        }
        
        await Event.findByIdAndDelete( eventId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error! Please contact administartion.'
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}