import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PagesService } from 'src/app/core/page-management/Service/pages.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css']
})
export class CreateMenuComponent implements OnInit {
  menulist: any = [];
  menuForm!: FormGroup;
  submit = false;
  id: any
  edit = false
  constructor(private page: PagesService, private router: Router, private params: ActivatedRoute) {
    this.loadform();
    if (this.params.snapshot.params.id) {
      this.id = this.params.snapshot.params.id
      this.edit = true
      this.getMenu()
    }

  }

  ngOnInit(): void {
    this.loadmenu();
  }
  loadform() {
    this.menuForm = new FormGroup({
      menuName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      parentId: new FormControl(),
      active: new FormControl(true)
    })
  }
  loadmenu() {
    this.page.getMenuList().subscribe(response => {
      if (response.code == 200) {
        this.menulist = response.data
      }
    })
  }
  getMenu() {
    this.page.getOneMenu(this.id).toPromise().then(response => {
      if(response.code==200){
        this.menuForm.patchValue(response.data)
        console.table(this.menuForm.getRawValue())
      }
      
    }).catch(error => {
      // this.submit = false
      Swal.fire({
        title: `${error.error.error}`,
        text: '',
        icon: 'warning',
        timer: 2000,
        showConfirmButton: true
      })
    })
  }
  addmenu() {
    this.submit = true
    if(!this.edit){
      this.page.addmenu(this.menuForm.getRawValue()).toPromise().then(response => {
        if (response.code == 200) {
          this.submit = false
          Swal.fire({
            title: `Menu added Successfully`,
            text: '',
            icon: 'success',
            timer: 2000,
            showConfirmButton: true
          })
          this.router.navigate(['/menu']);
        }
      }).catch(error => {
        this.submit = false
        Swal.fire({
          title: `${error.error.error}`,
          text: '',
          icon: 'warning',
          timer: 2000,
          showConfirmButton: true
        })
      })
    }
    else{
      this.page.updatemenu(this.id,this.menuForm.getRawValue()).toPromise().then(response => {
        if (response.code == 200) {
          this.submit = false
          Swal.fire({
            title: `${response.data}`,
            text: '',
            icon: 'success',
            timer: 2000,
            showConfirmButton: true
          })
          this.router.navigate(['/menu']);
        }
      }).catch(error => {
        this.submit = false
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
