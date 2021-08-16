import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageManagementComponent } from './page-management.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/core/material.module';
import { MenuConfigurationComponent } from './menu-configuration/menu-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: PageManagementComponent,
    children: [{
      path: 'list',
      component: MenuListComponent
    },
    {
      path: '',
      redirectTo: 'list'
    },
    {
      path:'editmenu/:id',
      component: CreateMenuComponent
    },
    {
      path: 'createMenu',
      component: CreateMenuComponent
    },
    {
      path:'configuration/:id',
      component:MenuConfigurationComponent
    }
    ]
  }
]



@NgModule({
  declarations: [
    PageManagementComponent,
    MenuListComponent,
    CreateMenuComponent,
    MenuConfigurationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PageManagementModule { }
