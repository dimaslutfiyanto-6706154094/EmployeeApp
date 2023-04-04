import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent {

  title = 'EmployeeApp';
  subTitle = 'Add Employee';

  public editForm!: FormGroup;
  model!: NgbDateStruct;
  myData!: any;
  index!: any;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
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


  ngOnInit(): void {
    this.route.paramMap.subscribe((
      params => {
        this.index = params.get("index");
        this.employeeService.getEmployee(this.index).subscribe(
          res => {
            this.myData = res
            this.editForm.patchValue(this.editFormValues())
          }
        )
      })
    )
  }

  submitFormEdit(editForm) {
    this.employeeService.editEmployee(this.index, editForm).subscribe(
      res => {
        alert('Edit Success');
        this.router.navigate(["list"])
      },
      err => {
        alert('Something Went Wrong')
        console.log(err);
        console.log(this.index);
      }
    )
  }

  editFormValues() {
    return {
      userName: this.myData.userName,
      firstName: this.myData.firstName,
      lastName: this.myData.lastName,
      email: this.myData.email,
      birthDate: this.myData.birthDate,
      basicSalary: this.myData.basicSalary,
      status: this.myData.status,
      group: this.myData.group,
      description: this.myData.description
    }
  }
}
