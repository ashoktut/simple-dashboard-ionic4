import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsuariosPage } from './usuarios.page';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage,
    children: [
      { path: '', component: ListarComponent },
      { path: 'listar', component: ListarComponent },
      { path: 'cadastrar', component: EditarComponent },
      { path: 'editar/:id', component: EditarComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuariosPage, EditarComponent, ListarComponent]
})
export class UsuariosPageModule {}
