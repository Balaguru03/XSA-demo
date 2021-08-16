import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { roles } from '../Models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  apiUrl = environment.api.url + "/roles"

  constructor(private http:HttpClient) { }
   httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `${localStorage.getItem('token')}`
    })
};
  addRole(roleName:roles):Observable<any>{
   
    return this.http.post(`${this.apiUrl}/add`,roleName,this.httpOptions)
  }
  getRole(roleId:roles):Observable<any>{
   
    return this.http.get(`${this.apiUrl}/role/${roleId}`,this.httpOptions)
  }
  updateRole(roleId:roles,roleName:roles):Observable<any>{
    return this.http.put(`${this.apiUrl}/editRole/${roleId}`,roleName,this.httpOptions)
  }
  getAllRole():Observable<any>{
    return this.http.get(`${this.apiUrl}/getRoles`,this.httpOptions)
  }
}
