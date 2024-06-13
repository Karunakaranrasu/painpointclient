import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee, FormControl } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/services/employee.service';
import { InputFormControlComponent } from '../shared/FormComponents/InputComponent/InputFormControl.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,InputFormControlComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  all_employee_data:any
  addEditEmployeeDForm!:FormGroup;
  addEditEmployee:boolean = false;
  popup_header!:string;
  add_prouct!:boolean;
  edit_prouct!:boolean;
  prouct_data:any;
  single_employee_data:any;
  employee_dto!:Employee
  edit_employee_id:any;
  Employee_Name :FormControl = {
    "Label":"Employee Name",
    "DefaultValue": "",
    "Type":"String",
    "MaxLength":2,
    "Placeholder":"Employee Name"
  }
  constructor(private fb:FormBuilder, private router:Router, private employeeService:EmployeeService){

  }

  ngOnInit(): void {
    this.addEditEmployeeDForm = this.fb.group({
      name:['',Validators.required],
      uploadPhoto:['',Validators.required],
      employeeDesc:['',Validators.required],
      mrp:['',Validators.required],
      dp:['',Validators.required],
      status:['',Validators.required],
    })
    this.getAllEmployee()
  }
  get rf(){
    return this.addEditEmployeeDForm.controls;
  }
  getAllEmployee(){
    this.employeeService.allEmployee().subscribe(data =>{
      this.all_employee_data = data;
      console.log("My All employee", this.all_employee_data)
    }, error =>{
      console.log("Somthing went wrong ", error)
    })
  }
  addEmployeePopup(){
    this.add_prouct = true;
    this.edit_prouct = false;
    this.popup_header = "Add new Employee";
    this.addEditEmployeeDForm.reset();
  }
  addNewEmployee(){
    this.addEditEmployee = true;
    if(this.addEditEmployeeDForm.invalid){
      return;
    }
    this.prouct_data = this.addEditEmployeeDForm.value;
    this.employee_dto = {
      id:0,
      name:this.prouct_data.name,
      uploadPhoto:this.prouct_data.uploadPhoto,
      productDesc:this.prouct_data.employeeDesc,
      mrp:this.prouct_data.mrp,
      dp:this.prouct_data.dp,
      status:this.prouct_data.status,
    }
    console.log("addEditEmployeeDForm:",this.addEditEmployeeDForm.value)
    this.employeeService.addNewEmployee(this.employee_dto).subscribe(data=>{
      console.log(data);
      this.getAllEmployee();
    },error=>{
      console.log("my error", error)
    })
  }
  editEmployeePopup(id:any){
    this.add_prouct = false;
    this.edit_prouct = true;
    this.popup_header = "Edit Employee";
    this.addEditEmployeeDForm.reset();
    this.employeeService.singleEmployee(id).subscribe(data=>{
      this.single_employee_data = data;
      console.log("Single Data", this.single_employee_data);
      this.edit_employee_id = data.id;
      this.addEditEmployeeDForm.setValue({
        name:this.single_employee_data.name,
        uploadPhoto:this.single_employee_data.uploadPhoto,
        employeeDesc:this.single_employee_data.employeeDesc,
        mrp:this.single_employee_data.mrp,
        dp:this.single_employee_data.dp,
        status:this.single_employee_data.status
      })
    })
  }
  updateEmployee(){
    this.addEditEmployee = true;
    if(this.addEditEmployeeDForm.invalid){
      return;
    }
    this.prouct_data = this.addEditEmployeeDForm.value;
    this.employee_dto = {
      id:0,
      name:this.prouct_data.name,
      uploadPhoto:this.prouct_data.uploadPhoto,
      productDesc:this.prouct_data.employeeDesc,
      mrp:this.prouct_data.mrp,
      dp:this.prouct_data.dp,
      status:this.prouct_data.status,
    }
    this.employeeService.updateEmployee(this.edit_employee_id,this.employee_dto).subscribe(data=>{
      this.getAllEmployee();

    },error=>{
      console.log("my error", error)
    })
  }
  deleteEmployee(id:any){
    let conf = confirm("Do you want to delete this employee id:" +id);
    if(conf){
      this.employeeService.deleteEmployee(id).subscribe(data=>{
        console.log("Deleted successfull", data);
        this.getAllEmployee();
      }, err=>{
        console.log(err)
      })
    }else{
      alert("You pressed cancel !")
    }
  }
}
