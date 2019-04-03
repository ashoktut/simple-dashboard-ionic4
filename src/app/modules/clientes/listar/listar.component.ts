import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent {

  clientes: Cliente[];
  loading: Boolean = false;

  data = '';

  relatorio: Boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    public toastController: ToastController
  ) {

    this.listarClientes();
  }

  ionViewWillEnter() {
    this.listarClientes();
  }

  listarClientes() {
    console.log('LISTAR CLIENTES');
    this.loading = false;

    return this.clienteService.getClientes({ data: this.data })
      .subscribe(
        res => {
          this.clientes = res;
          this.loading = true;
          return res;
        },
        err => {
          // this.toastr.error('Não foi possível listar os clientes!');
          this.loading = true;
          return err;
        }
      );
  }

  cadastrar() {
    this.router.navigate(['dashboard/clientes/cadastrar']);
  }

  editar(id) {
    this.router.navigate(['dashboard/clientes/editar', id]);
  }

  enderecos(id) {
    this.router.navigate(['dashboard/clientes/enderecos', id]);
  }

  getRelatorio() {
    this.relatorio = false;

    return this.clienteService.getClientesRelalatorio()
      .subscribe(
        res => {

          const file = new Blob([res], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          // window.open(fileURL);

          window.open(fileURL, '_blank');


        },
        err => {
          console.log('PDF ERRO');
          console.log(err);
          return err;
        }
      );
  }

}
