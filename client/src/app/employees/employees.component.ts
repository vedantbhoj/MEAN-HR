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
  pay_rate: number;
  bonus: number;
  reimbursement: number;
  retirement: number;
  monthlyRate: any;

  stateSelected: any;
  earnings: any;
  deductions: any;
  netpay: any;
  fedTax: any;
  stateTax: any;
  ssnTax: any;
  stateTaxPct: any;

  roundNumber(value: any) {
    return Number.parseFloat(value).toFixed(2);
  }

  reRender() {
    this.monthlyRate = this.pay_rate * 173.33;
    this.ssnTax = this.monthlyRate * 0.065;
    this.earnings = this.monthlyRate + this.bonus + this.reimbursement;
    this.deductions = this.stateTax + this.fedTax + this.retirement+ this.ssnTax;
    this.netpay = (this.earnings - this.deductions);
    this.calculateStateTax(this.stateSelected);
  };

  calculateFedTax(param:any) {
    let filterVal = param * 173.33 * 12;
    let value = param * 173.33;
    if (filterVal >= 0 && filterVal <= 9875)
      this.fedTax = value * 0.10;
    else if (filterVal >= 9876 && filterVal <= 40125)
      this.fedTax = value * 0.12;
    else if (filterVal >= 40126 && filterVal <= 85525)
      this.fedTax = value * 0.22;
    else if (filterVal >= 85526 && filterVal <= 163300)
      this.fedTax = value * 0.24;
    else if (filterVal >= 163301 && filterVal <= 207350)
      this.fedTax = value * 0.32;
    else if (filterVal >= 207351 && filterVal <= 518400)
      this.fedTax = value * 0.35;
    else if (filterVal >= 518401)
      this.fedTax = value * 0.37;
  }

  calculateStateTax(filterVal: any) {
    if (filterVal == "default") {
      this.stateSelected = "0";
    }
    else {
      this.stateSelected = filterVal;
      this.stateTax = (this.monthlyRate * parseFloat((this.states.filter((item) => item.abbreviation == filterVal))[0].tax))/100;
      this.stateTaxPct = parseFloat((this.states.filter((item) => item.abbreviation == filterVal))[0].tax).toFixed(2);
    }
  }

  addEmployee() {
    const newEmployee = {
      first_name: this.first_name,
      last_name: this.last_name,
      birth_date: this.birth_date,
      pay_rate: this.pay_rate,
      bonus: this.bonus,
      reimbursement: this.reimbursement,
      retirement: this.retirement,
      stateSelected: this.stateSelected
    }
    this.employeeService.addEmployee(newEmployee)
      .subscribe(contact => {
        this.employees.push(this.employee);
        this.employeeService.getEmployees()
          .subscribe(employees =>
            this.employees = employees);
      });
  }

  ConvertStringToNumber(input: string) {
    if (input.trim().length == 0) {
      return NaN;
    }
    return Number(input);
  }

  deleteEmployee(id: any) {
    var employees = this.employees;
    this.employeeService.deleteEmployee(id)
      .subscribe(data => {
        if (data.n == 1) {
          for (var i = 0; i < employees.length; i++) {
            if (employees[i]._id == id) {
              employees.splice(i, 1);
            }
          }
        }
      })
  }

  ngOnInit() {

    this.pay_rate = 0;
    this.bonus = 0;
    this.reimbursement = 0;
    this.retirement = 0;
    this.earnings = 0;
    this.stateTax = 0;
    this.fedTax = 0;
    this.deductions = 0;
    this.netpay = 0;
    this.ssnTax = 0;
    this.monthlyRate = 0;
    this.stateSelected = "Select State";

    forkJoin(
      this.employeeService.getEmployees(),
      this.employeeService.getStateList()
    ).subscribe(([employees, states]) => {
      this.employees = employees;
      this.states = states;

    });

  }
}
