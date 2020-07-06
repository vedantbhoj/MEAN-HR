const express = require('express');
const router = express.Router();
const Employee = require('../models/employees');
const StateTax = require('../models/stateTax');

//****** Tax Methods *********//
router.get('/statelist', (req, res, next)=>{
    StateTax.find(function(err, stateTax){
        res.json(stateTax);
    })
});

//Retrieving Employees
router.get('/employeelist', (req, res, next)=>{
    Employee.find(function(err, employees){
        res.json(employees);
    })
});

//Add Employee Details
router.post('/employee', (req, res, next)=>{
    let newEntry = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        pay_rate: req.body.pay_rate
    });

    console.log(newEntry);
    newEntry.save((err, entry)=>{
        //console.log(entry);
        if(err) {
            res.json({msg: 'Failed to add Employee'});
        }
        else{
            res.json({msg: 'Employee details added successfully'});
        }
    });
});

// //Update Employee details
// router.get('/employee/:id', (req, res, next)=>{
//     res.send('Deleting Employee from DB');
// });


//Delete Employee details
router.delete('/employee/:id', (req, res, next)=>{
    console.log(req.params.id);
    Employee.deleteOne({_id: req.params.id}, function(err, result){
        if(err) {
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


module.exports = router;