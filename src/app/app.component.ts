import { Component } from '@angular/core';
import { AuthService } from './core/auth/Service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User-Management';
  constructor(public service:AuthService){
// this.service.demo()
  }

}
