import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/auth/Service/auth.service';
import { PagesService } from 'src/app/core/page-management/Service/pages.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  displayedColumns: string[] = ['SNO', 'menuName', 'url', 'parentId.menuName','status'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hasPermission:any =[]

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(private page: PagesService, public dialog: MatDialog,private authservice:AuthService) { this.loadpermission() }
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
    this.page.getList().subscribe(response => {
      if (response.code == 200) {
        this.dataSource = new MatTableDataSource(response.data)
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  
}
