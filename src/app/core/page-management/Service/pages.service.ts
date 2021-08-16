import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { page } from '../Models/page';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  apirUrl = environment.api.url
  path = "/menu"
  constructor(private http: HttpClient) { }
  getMenuList(): Observable<any> {
    return this.http.get(`${this.apirUrl + this.path}/getMenus`)
  }
  getList(): Observable<any> {
    return this.http.get(`${this.apirUrl + this.path}/listMenus`)
  }
  addmenu(menuData: page): Observable<any> {
    return this.http.post(`${this.apirUrl + this.path}/addMenu `, menuData)
  }
  getOneMenu(id: any): Observable<any> {
    return this.http.get(`${this.apirUrl + this.path}/menu/${id}`)
  }
  updatemenu(id: any, menuData: page): Observable<any> {
    return this.http.put(`${this.apirUrl + this.path}/updateMenu/${id} `, menuData)
  }
  menuConfig(data: any): Observable<any> {
    return this.http.put(`${this.apirUrl}/roles/roles`, data)
  }
}
