import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/core/material.module';
import { RouterModule, Routes } from '@angular/router';
const routes:Routes=[
  {
    path:'',
    component:DashboardComponent,
  }
] 


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class DashboardModule { }
