import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'
import { Employee, StateTax } from '../employee';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})

export class EmployeesComponent implements OnInit {
  constructor(private employeeService: EmployeeService) { }
  states: StateTax[];
  state: StateTax;
  employees: Employee[];
  employee: Employee;
  first_name: string;
  last_name: string;
  birth_date: string;
  pay_rate: string;


  addEmployee()
  {
    const newEmployee = {
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.birth_date,
      pay_rate: this.pay_rate
    }
    this.employeeService.addEmployee(newEmployee)
      .subscribe(contact=>{
        this.employees.push(this.employee);
        this.employeeService.getEmployees()
        .subscribe(employees=>
          this.employees = employees);
      });
  }

  deleteEmployee(id: any)
  {
    var employees = this.employees;
    this.employeeService.deleteEmployee(id)
      .subscribe(data=>{
        if(data.n==1){
          for(var i=0; i< employees.length; i++) {
            if(employees[i]._id == id) {
                employees.splice(i,1);
            }
          }
        }
      })
  }

  ngOnInit() {

    forkJoin(

      this.employeeService.getEmployees(),

      this.employeeService.getStateList()

      ).subscribe(([employees, states])=>{

        this.employees = employees;

        this.states = states;

      });
  }
}
