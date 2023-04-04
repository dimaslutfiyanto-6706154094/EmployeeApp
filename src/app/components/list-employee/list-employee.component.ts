import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent {

  title = 'EmployeeApp';
  subTitle = 'Add Employee';

  myData: any = [];

  constructor(private employeeService: EmployeeService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.employeeService.getEmployees()
      .subscribe(data => {
        console.log(data);
        this.myData = data;
      }),
      (err: HttpErrorResponse) => {
        console.log(err)
      }
  }

  addPage() {
    this.router.navigate(["add"])
  }

  editPage(index) {  
    this.router.navigate([`edit/${index}`])
  }

  deleteItem(index) {
    this.employeeService.deleteEmployee(index).subscribe(
      res => {
        alert('Delete Success');
        this.getData()
      },
      err => {
        alert('Something Went Wrong')
      }
    )
  }
}
