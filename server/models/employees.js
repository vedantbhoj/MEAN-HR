const mongoose = require('mongoose');
const { Int32, Decimal128 } = require('bson');

const EmployeeSchema = mongoose.Schema({
    first_name :{
        type: String,
        required: true
    },
    last_name :{
        type: String,
        required: true
    },
    birth_date :{
        type: String,
        required: true
    },
    pay_rate :{
        type: String,
        required: true
    },
    bonus :{
        type: String,
        required: true
    },
    reimbursement :{
        type: String,
        required: true
    },
    retirement :{
        type: String,
        required: true
    },
    stateSelected :{
        type: String,
        required: true
    }
});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');