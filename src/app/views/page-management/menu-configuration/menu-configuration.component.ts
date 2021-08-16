import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/core/page-management/Service/pages.service';
import { RolesService } from 'src/app/core/roles-management/Service/roles.service';

@Component({
  selector: 'app-menu-configuration',
  templateUrl: './menu-configuration.component.html',
  styleUrls: ['./menu-configuration.component.css']
})
export class MenuConfigurationComponent implements OnInit {
  displayedColumns: string[] = ['SNO', 'menuName', 'isReadable', 'isCreatebale','isEditable','isDownloadable'];
  dataSource = new MatTableDataSource();
  record:any=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  id:any

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(private page: PagesService, private roles:RolesService,public dialog: MatDialog,private routes:ActivatedRoute) {
if(this.routes.snapshot.params.id){
  this.id=this.routes.snapshot.params.id
  this.loadInit()
}
   }

  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  loadInit() {
    this.roles.getRole(this.id).subscribe(response => {
      if (response.code == 200) {
        this.record.push(response.data)
        this.dataSource = new MatTableDataSource(response.data.menu)
        this.dataSource.paginator = this.paginator;
      }
    })
  }
  updatePermission(data:any,index:any,menu:any){

let record={
  roleId:this.id,
  menu:[
      {
     menuPermission: menu._id,
     hasAccess:menu.hasAccess
  }]
}
console.log(record)
this.page.menuConfig(record).toPromise().then(res=>{
  console.log(res)
})
  }
}
