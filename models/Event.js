const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    start: {
        type: Date,
        required: false
    },
    end: {
        type: Date,
        required: false
    },
    allDay: {
        type: Boolean,
        required: true
    },
    backgroundColor: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

eventSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Event', eventSchema);