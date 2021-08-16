import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/auth/Service/auth.service';
import { UsersService } from 'src/app/core/user-management/Service/users.service';
import { UpdateRolesComponent } from '../update-roles/update-roles.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['SNO', 'name', 'email', 'mobile', 'Role', 'status'];
  dataSource = new MatTableDataSource();
  hasPermission:any =[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(private user: UsersService, public dialog: MatDialog,private authservice:AuthService) { 
    this.loadpermission()
  }
loadpermission(){
  this.authservice.store.subscribe((res: any)=>{
    // console.log(res)
    this.hasPermission=res.filter((access: { menuPermission:any })=>{
      console.log( access.menuPermission.url == '/users')
      return access.menuPermission.url == '/users'
    })
    
  })
  
}
  ngOnInit(): void {
    this.loadInit()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  loadInit() {
    this.user.getUserList().subscribe(response => {
      if (response.code == 200) {
        this.dataSource = new MatTableDataSource(response.data)
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  updaterole(role: any) {
    const dialog = this.dialog.open(UpdateRolesComponent, { width: "50%", height: "50%", data: role });
    dialog.afterClosed().subscribe(()=>{
      this.loadInit()
    })
  }

}
