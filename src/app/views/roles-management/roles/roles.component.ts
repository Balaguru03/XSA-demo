import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from 'src/app/core/roles-management/Service/roles.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
name=new FormControl('',Validators.required)
edit=false
  constructor(public dialogRef: MatDialogRef<RolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService:RolesService
    ) {
      if(this.data.roleName){
        this.edit=true
        this.name.setValue(this.data.roleName.name)
      } 
    }

  ngOnInit(): void {
  }
  submit(){
    if(this.edit){
      this.roleService.updateRole(this.data.roleName._id,{name:this.name.value}).toPromise().then(response=>{
        if(response.code == 200){
          Swal.fire({
            title: `Role has been updated Successfully`,
            text: '',
            icon: 'success',
            timer: 2000,
            showConfirmButton: true
          })
        }
      }).catch(error=>{
        Swal.fire({
          title: `Failed to Update the Role!!`,
          text: '',
          icon: 'warning',
          timer: 2000,
          showConfirmButton: true
      })
    })
  }
  else{
    this.roleService.addRole({name:this.name.value}).toPromise().then(response=>{
      if(response.code == 200){
        Swal.fire({
          title: `Role has been added Successfully`,
          text: '',
          icon: 'success',
          timer: 2000,
          showConfirmButton: true
        })
      }
    }).catch(error=>{
      Swal.fire({
        title: `${error.error.error}`,
        text: '',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: true
    })
  })
  }
  }
}
