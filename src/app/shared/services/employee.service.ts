import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employee_url=" http://localhost:3000/employees/"

  constructor(private httpClient:HttpClient, private apiService:ApiService) { }
  allEmployee():Observable<any>{
    return this.apiService.get(this.employee_url);
  }
  addNewEmployee(employee_dto:any):Observable<any>{
    return this.apiService.post(this.employee_url, employee_dto);
  }
  singleEmployee(id:any){
    return this.apiService.get(this.employee_url+id);
  }
  updateEmployee(id:any, employee_dto:any):Observable<any>{
    return this.apiService.put(this.employee_url+id, employee_dto);
  }
  deleteEmployee(id:any):Observable<any>{
    return this.apiService.delete(this.employee_url+id);
  }
}
