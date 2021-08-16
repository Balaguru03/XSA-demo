import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from 'src/app/core/roles-management/Service/roles.service';
import { UsersService } from 'src/app/core/user-management/Service/users.service';
import Swal from 'sweetalert2' 
@Component({
  selector: 'app-update-roles',
  templateUrl: './update-roles.component.html',
  styleUrls: ['./update-roles.component.css']
})
export class UpdateRolesComponent implements OnInit {
roleName = new FormControl('',Validators.required)
allroles:any =[]
  constructor(public dialogRef: MatDialogRef<UpdateRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UsersService,private role:RolesService
    ) {
      this.getRole()
      console.log(data)
      if(data.Role.RoleId!=undefined && data.Role.RoleId != null){
        this.roleName.setValue(this.data.Role.RoleId._id)
      }
    }

  ngOnInit(): void {

  }
getRole(){
  this.role.getAllRole().toPromise().then(response=>{
    if(response.code == 200){
      this.allroles = response.data
    }
  })
}
submit(){
  let role = {
    "Role":{
      "RoleId": {
        "_id": this.roleName.value
    }
    }
  }
  if(this.roleName.valid){
    this.user.updateuserRole(this.data._id,role).toPromise().then(response=>{
      if(response.code==200){
        Swal.fire({
          title: `Registered Successfully`,
          text: '',
          icon: 'success',
          timer: 2000,
          showConfirmButton: true
      })
      this.dialogRef.close()
    }
  }).catch(error=>{
    Swal.fire({
      title: `${error.error.error}`,
      text: '',
      icon: 'warning',
      timer: 2000,
      showConfirmButton: false
    })
  })
  }
 
}
}
