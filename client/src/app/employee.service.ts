import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Employee} from './employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private http: Http) { }

    //get State List
    getStateList(){
      return this.http.get('http://localhost:3000/api/statelist')
      .pipe(map(res => res.json()));
   }

  //get Employee
  getEmployees(){
     return this.http.get('http://localhost:3000/api/employeelist')
     .pipe(map(res => res.json()));
  }

    //add Employee
    addEmployee(newEntry){
      var headers =  new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://localhost:3000/api/employee', newEntry, {headers:headers})
      .pipe(map(res => res.json()));
   }

    //delete Employee
    deleteEmployee(id){
      return this.http.delete('http://localhost:3000/api/employee/'+id)
      .pipe(map(res => res.json()));
   }

}
