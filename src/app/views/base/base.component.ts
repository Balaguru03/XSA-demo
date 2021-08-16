import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/Service/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  showFiller = true;
  isExpanded: boolean = false;
  token = localStorage.getItem('token')
  menu: any = []
  showMenu = false;
  userInformation: any;
  constructor(private authService: AuthService) {
    this.loadUser()
  }

  ngOnInit(): void {
  }

  loadUser() {
    if (this.token != null) {
      // console.log("received",this.token)
      this.authService.getUsers(this.token).toPromise().then(response => {
        if (response.code == 201) {
          this.userInformation = response.data
          this.authService.userInfo.next(response.data)
          this.authService.roleBasedMenu(response.data.Role.RoleId._id).toPromise().then(menus => {
            if (menus) {
              this.menu = menus.data.menu
              this.authService.store.next(menus.data.menu)
            }

          })
        }
      }).catch(error => {
        console.log(error)
        window.location.reload()
        localStorage.removeItem('token')
      })
    }
    // localStorage.removeItem('token')
  }
  logout() {
    Swal.fire({
      position: 'top',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        if (localStorage.getItem('token') == null) {
          window.location.reload()
        }
      }
    })

  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
