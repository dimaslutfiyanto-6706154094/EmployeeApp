import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {

  title = 'EmployeeApp';
  subTitle = 'Add Employee';

  public addForm: FormGroup;
  model!: NgbDateStruct;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router){
    this.addForm = this.formBuilder.group({
      userName: '',
      firstName: '',
      lastName: '',
      email: '', 
      birthDate: '', 
      basicSalary: '', 
      status: '', 
      group: '', 
      description: ''
    })
  }

  submitForm() {
    if (this.addForm.valid){
      this.employeeService.addEmployee(this.addForm.value).subscribe(
        res => {
          alert('Added Success');
          this.addForm.reset();
          this.router.navigate(["list"])
        },
        err => {
          alert('Something Went Wrong')
          console.log(err);
          
        }
      )
    }
  }
}
