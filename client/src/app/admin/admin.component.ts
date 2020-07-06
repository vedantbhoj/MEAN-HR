import { Component, OnInit } from '@angular/core';
import { Employee, StateTax } from '../employee';
import { EmployeeService } from '../employee.service'
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [EmployeeService]
})
export class AdminComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }
  states: StateTax[];
  state: StateTax;
  employees: Employee[];
  employee: Employee;

  first_name: string;
  last_name: string;
  birth_date: string;
  pay_rate: number;
  bonus: any;
  reimbursement: any;
  retirement: any;
  monthlyRate: any;

  stateSelected: any;
  earnings: any;
  deductions: any;
  netpay: any;
  fedTax: any;
  stateTax: any;
  ssnTax: any;
  stateTaxPct: any;


  viewCompensation(employee){
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.pay_rate = employee.pay_rate;
    this.bonus = employee.bonus;
    this.reimbursement = employee.reimbursement;
    this.retirement = employee.retirement;
    this.stateSelected = employee.stateSelected;
    this.monthlyRate = employee.pay_rate * 173.33;
    this.ssnTax = this.monthlyRate * 0.065;
    this.calculateStateTax(employee.stateSelected);
    this.calculateFedTax(employee.pay_rate);
    this.earnings = parseFloat(this.monthlyRate) + parseFloat(this.bonus) + parseFloat(this.reimbursement);
    this.deductions = parseFloat(this.stateTax) + parseFloat(this.fedTax) + parseFloat(this.retirement) + parseFloat(this.ssnTax);
    this.netpay = (this.earnings - this.deductions);

  }

  roundNumber(value: any) {
    return Number.parseFloat(value).toFixed(2);
  }

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
      this.stateTax = (this.monthlyRate * parseFloat((this.states.filter((item) => item.abbreviation == filterVal))[0].tax))/100;
      this.stateTaxPct = parseFloat((this.states.filter((item) => item.abbreviation == filterVal))[0].tax).toFixed(2);
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

    forkJoin(

      this.employeeService.getEmployees(),

      this.employeeService.getStateList()

      ).subscribe(([employees, states])=>{

        this.employees = employees;
        this.states = states;

    });
  }

}
