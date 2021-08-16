import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesManagementComponent } from './roles-management.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table'
import { MaterialModule } from 'src/app/core/material.module';
import { RolesService } from 'src/app/core/roles-management/Service/roles.service';
import { RolesComponent } from './roles/roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',
    component:RolesManagementComponent,
  }
]


@NgModule({
  declarations: [
    RolesManagementComponent,
    RolesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [RolesService],
  entryComponents:[RolesComponent]
})
export class RolesManagementModule { }
