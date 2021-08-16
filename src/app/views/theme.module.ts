import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { AuthGuard } from '../core/auth/Guard/auth.guard';
import { MaterialModule } from '../core/material.module';

const routes:Routes=[
  {
    path: '',
    component: BaseComponent,
    canActivate:[AuthGuard],
    children: [
      
      {
        path: 'roles',
        loadChildren: () => import('./roles-management/roles-management.module').then(m => m.RolesManagementModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./page-management/page-management.module').then(m => m.PageManagementModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users-management/users-management.module').then(m => m.UsersManagementModule)
      },
      {
        path:'dashboard',
        loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path:'par',
        loadChildren:()=>import('./par-screen/par-screen.module').then(m=>m.ParScreenModule)
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ]
  
  }
]

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class ThemeModule { }
