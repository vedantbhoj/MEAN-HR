const mongoose = require('mongoose');

const StateTaxSchema = mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    abbreviation :{
        type: String,
        required: true
    },
    tax :{
        type: String,
        required: true
    }
});

const StateTax = module.exports = mongoose.model('StateTax', StateTaxSchema,'stateTaxs');