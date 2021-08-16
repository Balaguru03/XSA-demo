import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParScreenComponent } from './par-screen.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from './subs/comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: ParScreenComponent,
    children: [{
      path: 'list',
      component: ListComponent
    },
    {
      path: '',
      redirectTo: 'list'
    },
    {
      path:'edit/:id',
      component: CreateComponent
    },
    {
      path: 'create',
      component: CreateComponent
    },
    {
      path:'view/:id',
      component:ViewComponent
    }
    ]
  }
]


@NgModule({
  declarations: [
    ParScreenComponent,
    ListComponent,
    CreateComponent,
    ViewComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[CommentsComponent]
})
export class ParScreenModule { }
