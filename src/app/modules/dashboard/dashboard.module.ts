import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  { path: '', loadChildren: '../home/home.module#HomePageModule' },
  { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
  { path: 'clientes', loadChildren: '../clientes/clientes.module#ClientesPageModule' },
  { path: 'usuarios', loadChildren: '../usuarios/usuarios.module#UsuariosPageModule' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
