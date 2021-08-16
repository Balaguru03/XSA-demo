import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersManagementComponent } from './users-management.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/material.module';
// import { ViewUserComponent } from './view-user/view-user.component';
import { UpdateRolesComponent } from './update-roles/update-roles.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagementComponent,
    children: [{
      path: 'list',
      component: UserListComponent
    },
    {
      path: '',
      redirectTo: 'list'
    },
    {
      path: 'createUser',
      component: CreateUserComponent
    }
    ]
  }
]

@NgModule({
  declarations: [
    UsersManagementComponent,
    UpdateRolesComponent,
    CreateUserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [UpdateRolesComponent]
})
export class UsersManagementModule { }
