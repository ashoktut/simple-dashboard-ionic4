import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './../cliente';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {

  clienteId: number;
  private sub: any;

  tituloPag: String = 'CADASTRAR CLIENTE';
  btnExcluir = false;

  cliente = new Cliente();
  clienteForm: FormGroup;
  submitted = false;

  constructor(
    private clienteService: ClienteService,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

    // INICIA FORMULÁRIO
    this.formularioCliente();

  }

  ionViewWillEnter() {

    // OBTEM OS PARAMETROS ESTIPULADOS NA ROTA
    this.sub = this.route.params.subscribe(params => {
      // OBTEM O clienteId
      this.clienteId = +params['id'];
    });

    this.submitted = false;

    // VERIFICA SE EXISTE clienteId
    if (this.clienteId) {

      this.tituloPag = 'EDITAR CLIENTE';
      this.obterCliente();
      this.btnExcluir = true;

    } else {
      // INICIA FORMULÁRIO
      this.formularioCliente();
    }

  }

  // FUNÇÃO PARA INICIAR FORMULÁRIO
  formularioCliente() {
    this.clienteForm = this.formBuilder.group({
      nome: [this.cliente.nome, Validators.required],
      email: [this.cliente.email, [Validators.required, Validators.email]],
      telefone1: [this.cliente.telefone1, [Validators.required]],
      telefone2: [this.cliente.telefone2, []]
    });
  }

  // OBTEM OS DADOS DE UM CLIENTE PELO ID
  obterCliente() {
    return this.clienteService.getCliente(this.clienteId)
      .subscribe(
        res => {
          this.cliente = res;
          this.formularioCliente();
          return res;
        },
        err => {
          this.toast.presentToast('Não foi possível obter o cliente!');
          return err;
        }
      );
  }

  // FUNÇÃO PARA EFETUAR SUBMIT DE UM CLIENTE
  submitCliente() {

    this.submitted = true;

    // VERIFICA SE AS VALIDAÇÕES DO FORMULÁRIO SÃO INVÁLIDAS
    if (this.clienteForm.invalid) {

      console.log('invalido');

      // this.submitted = false;

      return false;

    } else { // CASO AS VÁLIDAÇÕES SEJAM VÁLIDAS

      // VERIFICA SE clienteId EXISTE PARA EFETUAR PUT
      if (this.clienteId) {

        return this.clienteService.putCliente(this.clienteId, this.clienteForm.value)
          .subscribe(
            res => {
              this.toast.presentToast('Cliente alterado com sucesso!');
              // this.submitted = false;
              return res;
            },
            err => {
              console.log(err);
              this.toast.presentToast('Erro ao alterar cliente!');
              // this.submitted = false;
              return err;
            }
          );

      } else { // CASO clienteId NÃO EXISTA EFETUARÁ O POST

        console.log('POST CLIENTE');

        return this.clienteService.postCliente(this.clienteForm.value)
          .subscribe(
            res => {
              this.toast.presentToast('Cliente cadastrado com sucesso!');
              this.router.navigate(['dashboard/clientes/listar']);
              // this.submitted = false;
              return res;
            },
            err => {
              this.toast.presentToast('Erro ao cadastrar cliente!');
              // this.submitted = false;
              return err;
            }
          );

      }

    }

  }

  // FUNÇÃO PARA DELETAR UM CLIENTE
  deletarCliente() {
    return this.clienteService.deleteCliente(this.clienteId)
      .subscribe(
        res => {
          this.toast.presentToast('Cliente deletado com sucesso!');
          this.router.navigate(['dashboard/clientes/listar']);
          return res;
        },
        err => {
          console.log(err);
          this.toast.presentToast('Erro ao deletar cliente!');
          return err;
        }
      );
  }

}
