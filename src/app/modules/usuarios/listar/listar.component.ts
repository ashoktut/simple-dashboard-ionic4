import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent {

  usuarios: Usuario[];
  loading: Boolean = false;

  data = '';

  relatorio: Boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.listarUsuarios();

  }

  listarUsuarios() {
    console.log('LISTAR CLIENTES');
    this.loading = false;


    return this.usuarioService.getUsuarios()
      .subscribe(
        res => {
          this.usuarios = res;
          this.loading = true;
          return res;
        },
        err => {
          this.loading = true;
          return err;
        }
      );
  }

  cadastrar() {
    this.router.navigate(['dashboard/usuarios/cadastrar']);
  }

  editar(id) {
    this.router.navigate(['dashboard/usuarios/editar', id]);
  }

}
