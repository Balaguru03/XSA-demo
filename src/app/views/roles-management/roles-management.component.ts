import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RolesService } from '../../core/roles-management/Service/roles.service';
import { RolesComponent } from './roles/roles.component';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/core/auth/Service/auth.service';

@Component({
  selector: 'app-roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.css']
})
export class RolesManagementComponent implements OnInit {

  displayedColumns: string[] = ['SNO', 'name', 'status'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hasPermission: any = []
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(private roles: RolesService, public dialog: MatDialog, private authservice: AuthService) {
    this.loadpermission()
  }

  ngOnInit(): void {
    console.log(this.hasPermission)
    this.loadInit()
  }
  async loadpermission() {
    await this.authservice.store.subscribe((res: any) => {
      // console.log(res)
      res.filter((access: { menuPermission: any }) => {
        if (access.menuPermission.url == '/roles') {
          this.hasPermission.push(access)
        }
        return
      })

    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  loadInit() {
    this.roles.getAllRole().subscribe(response => {
      if (response.code == 200) {
        this.dataSource = new MatTableDataSource(response.data)
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  addEditRole(data: any) {
    if (data == '') {
      const dialogRef = this.dialog.open(RolesComponent, { width: "50%", height: "50%", data: { header: 'Create Role' } });
    }
    else {
      const dialogRef = this.dialog.open(RolesComponent, { width: "50%", height: "50%", data: { header: 'Edit Role', roleName: data } });
    }
  }
}
