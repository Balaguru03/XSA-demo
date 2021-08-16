import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt'
import { environment } from '../../../../environments/environment';
import { register } from '../Models/register';
import { login } from '../Models/login'
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.api.url + environment.api.path
  store:any = new BehaviorSubject([])
  userInfo:any = new BehaviorSubject('')
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': `${localStorage.getItem('token')}`
    })
  };
  isAuthenticated(): boolean {
    let tokens: any = localStorage.getItem('token');
    console.log(tokens != null && tokens != undefined && tokens != "undefined")
    return tokens != null && tokens != undefined && tokens != "undefined";
  }
  register(userDetails: register): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userDetails)
  }
  login(credentials: login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
  }
  getUsers(token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    }
    return this.http.get(`${this.apiUrl}/me`, httpOptions)
  }
  roleBasedMenu(roleId: any): Observable<any> {
    return this.http.get(`${environment.api.url}/roles/menuaccess/${roleId}`)
  }

}
