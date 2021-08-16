import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/Service/auth.service';
import { RolesService } from 'src/app/core/roles-management/Service/roles.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  filterdata: any = []
  constructor(private authService: AuthService, private router: Router, private roles: RolesService) {
    this.loadform()
    this.loadroles()
  }
  submit = false
  loadform(){
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      Role: new FormGroup({
        RoleId:new FormControl("")
      }),
    })
  }
  loadroles() {
    this.roles.getAllRole().toPromise().then(response => {
      if (response.code == 200) {
        this.filterdata = response.data.filter((filtered: { name: any; }): any => {
          return filtered.name == 'User'
        })
       this.registerForm.get(['Role','RoleId'])?.setValue(this.filterdata[0]._id)
       console.log(this.registerForm.getRawValue())
      }
    })
  
  }
  ngOnInit(): void {
   
  }
  registerUser() {
    if (this.registerForm.valid) {
      this.submit = true;
      this.authService.register(this.registerForm.getRawValue()).toPromise().then((res): any => {
        if (res.code == 200) {
          Swal.fire({
            title: `Registered Successfully`,
            text: '',
            icon: 'success',
            timer: 2000,
            showConfirmButton: true
          })
          this.router.navigate(['/auth/login']);
        }
      }).catch(error => {
        console.log(error)
        Swal.fire({
          title: `${error.error.error}`,
          text: '',
          icon: 'warning',
          timer: 2000,
          showConfirmButton: false
        })
        this.submit = false
      })
    }
  }
}
