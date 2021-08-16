import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/Service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
userData:any
  constructor(private auth:AuthService) { 

  }

  ngOnInit(): void {
    this.loadData()
  }
loadData(){
  this.auth.userInfo.subscribe((res: any)=>{
this.userData = res
console.log(this.userData)
  })
}
}
