import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './modules/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './modules/auth/auth.module#AuthPageModule' },
  { path: 'dashboard', component: DashboardPage, loadChildren: './modules/dashboard/dashboard.module#DashboardPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
