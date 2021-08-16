import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/Service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  errorMessage=''
  submit = false;
  constructor(private formbuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  loginFunction() {
    if (this.loginForm.valid) {
      this.submit = true;
      this.authService.login(this.loginForm.getRawValue()).toPromise().then((res): any => {
        if (res.code == 200) {
          localStorage.setItem('token', res.data);
          if(localStorage.getItem('token')){
            this.router.navigate(['/dashboard']);
          }
         
        }
      }).catch(error=>{
        Swal.fire({
          title: `${error.error.error}`,
          text: '',
          icon: 'warning',
          timer: 2000,
          showConfirmButton: false
        })
        this.submit=false
      })
    }

  }
}
