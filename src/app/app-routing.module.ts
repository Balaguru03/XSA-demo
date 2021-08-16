import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: 'auth',
  loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
},
{
  path: '',
  loadChildren: () => import('./views/theme.module').then(m => m.ThemeModule)
},
// {
//   // path:'',
//   // redirectTo:'auth'
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
