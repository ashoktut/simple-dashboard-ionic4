import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from './../usuario';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {

  usuarioId: number;
  private sub: any;

  tituloPag: String = 'CADASTRAR USUÁRIO';
  btnExcluir = false;

  usuario = new Usuario();
  usuarioForm: FormGroup;
  submitted = false;

  usuarioNome = '';

  constructor(
    private usuarioService: UsuarioService,
    private toast: ToastService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

    // INICIA FORMULÁRIO
    this.formularioUsuario();

  }

  ionViewWillEnter() {

    // OBTEM OS PARAMETROS ESTIPULADOS NA ROTA
    this.sub = this.route.params.subscribe(params => {
      // OBTEM O clienteId
      this.usuarioId = +params['id'];
    });

    this.submitted = false;

    // VERIFICA SE EXISTE clienteId
    if (this.usuarioId) {

      this.tituloPag = 'EDITAR USUÁRIO';
      this.obterCliente();
      this.btnExcluir = true;

    } else {

      this.formularioUsuario();

    }

    this.usuarioNome = localStorage.getItem('usuarioNome');

  }

  // FUNÇÃO PARA INICIAR FORMULÁRIO
  formularioUsuario() {
    this.usuarioForm = this.formBuilder.group({
      nome: [this.usuario.nome, Validators.required],
      usuario: [this.usuario.usuario, [Validators.required]],
      senha: [this.usuario.senha, [Validators.required]]
    });
  }

  // OBTEM OS DADOS DE UM CLIENTE PELO ID
  obterCliente() {
    return this.usuarioService.getUsuario(this.usuarioId)
      .subscribe(
        res => {
          this.usuario = res;
          this.formularioUsuario();
          return res;
        },
        err => {
          this.toast.presentToast('Não foi possível obter o cliente!');
          return err;
        }
      );
  }

  // FUNÇÃO PARA EFETUAR SUBMIT DE UM CLIENTE
  submitUsuario() {

    this.submitted = true;

    // VERIFICA SE AS VALIDAÇÕES DO FORMULÁRIO SÃO INVÁLIDAS
    if (this.usuarioForm.invalid) {

      // this.submitted = false;

      return false;

    } else { // CASO AS VÁLIDAÇÕES SEJAM VÁLIDAS

      // VERIFICA SE clienteId EXISTE PARA EFETUAR PUT
      if (this.usuarioId) {

        return this.usuarioService.putUsuario(this.usuarioId, this.usuarioForm.value)
          .subscribe(
            res => {
              this.toast.presentToast('Usuário alterado com sucesso!');
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

        return this.usuarioService.postUsuario(this.usuarioForm.value)
          .subscribe(
            res => {
              this.toast.presentToast('Usuário cadastrado com sucesso!');
              this.router.navigate(['dashboard/usuarios/listar']);
              this.submitted = false;
              return res;
            },
            err => {
              this.toast.presentToast('Erro ao cadastrar usuário!');
              this.submitted = false;
              return err;
            }
          );

      }

    }

  }

  // FUNÇÃO PARA DELETAR UM CLIENTE
  deletarUsuario() {

    if (this.usuario.usuario === this.usuarioNome) {
      this.toast.presentToast('Você não pode deletar seu próprio usuário!');
    } else {
      return this.usuarioService.deleteUsuario(this.usuarioId)
        .subscribe(
          res => {
            this.toast.presentToast('Usuário deletado com sucesso!');
            this.router.navigate(['dashboard/usuarios/listar']);
            return res;
          },
          err => {
            console.log(err);
            this.toast.presentToast('Erro ao deletar usuário!');
            return err;
          }
        );
    }


  }

}
