import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = environment.api.url + "/users"
  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/List`)
  }
  updateuserRole(userId: any, roletochange: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updaterole/${userId}`, roletochange)
  }
}
