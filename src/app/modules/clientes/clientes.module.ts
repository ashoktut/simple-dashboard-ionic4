import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientesPage } from './clientes.page';
import { EditarComponent } from './editar/editar.component';
import { ListarComponent } from './listar/listar.component';
import { EnderecosComponent } from './enderecos/enderecos.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage,
    children: [
      { path: '', component: ListarComponent,  runGuardsAndResolvers: 'always' },
      { path: 'listar', component: ListarComponent,  runGuardsAndResolvers: 'always' },
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
  declarations: [ClientesPage, EditarComponent, ListarComponent, EnderecosComponent]
})
export class ClientesPageModule {}
