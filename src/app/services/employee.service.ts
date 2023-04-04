import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {  }

  addEmployee(data) {
    return this.http.post('http://localhost:3000/employees', data);
  }

  getEmployees() {
    return this.http.get('http://localhost:3000/employees')
  }

  getEmployee(index) {
    return this.http.get(`http://localhost:3000/employees/${index}`)
  }

  editEmployee(index, data) {
    return this.http.put(`http://localhost:3000/employees/${index}`, data)
  }

  deleteEmployee(index) {
    return this.http.delete(`http://localhost:3000/employees/${index}`);
  }
}
