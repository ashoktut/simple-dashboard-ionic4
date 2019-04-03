import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnderecoService } from './endereco.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Endereco } from './endereco';
import { ViaCepService } from 'src/app/shared/services/via-cep.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss']
})
export class EnderecosComponent {

  @ViewChild('numero') Numero: any;
  @ViewChild('form') Form: any;

  id: number;
  private clienteId: any;
  private sub: any;

  tituloPag: String = 'Cadastrar Endereço';

  formControl = false;
  btnExcluir = false;

  endereco = new Endereco();
  enderecoForm: FormGroup;
  submitted = false;

  enderecos: Endereco[];
  enderecoId: number;

  loading: Boolean = false;

  constructor(
    private enderecoService: EnderecoService,
    private viaCepService: ViaCepService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {

    // INICIA O FORMULÁRIO
    this.formularioEndereco();

    this.sub = this.route.params.subscribe(params => {
      this.clienteId = +params['id'];
    });

    // DEFINE O ID DO CLIENTE NO SERVICE DE ENDEREÇOS
    this.enderecoService.setClienteId(this.clienteId);

    this.listarEnderecos();

  }

  ionViewWillEnter() {



  }

  // FUNÇÃO PARA INICIAR FORMULÁRIO
  formularioEndereco() {
    this.enderecoForm = this.formBuilder.group({
      cep: [this.endereco.cep, Validators.required],
      endereco: [this.endereco.endereco, Validators.required],
      numero: [this.endereco.numero, Validators.required],
      complemento: [this.endereco.complemento],
      bairro: [this.endereco.bairro, Validators.required],
      cidade: [this.endereco.cidade, Validators.required],
      estado: [this.endereco.estado, Validators.required],
    });
  }

  // FUNÇÃO PARA LISTAR OS ENDEREÇOS DE UM CLIENTE
  listarEnderecos() {
    console.log('LISTAR ENDEREÇOS');
    this.loading = false;

    return this.enderecoService.getClienteEnderecos()
      .subscribe(
        res => {
          this.formControl = false;
          this.enderecos = res;
          this.loading = true;
          return res;
        },
        err => {
          this.toast.presentToast('Não foi possível obter os endereços do cliente!');
          return err;
        }
      );
  }

  // FUNÇÃO PARA ABRIR FORMULÁRIO PARA CADASTRAR UM NOVO ENDEREÇO
  novoEndereco() {

    this.tituloPag = 'CADASTRAR ENDEREÇO';
    this.enderecoId = null;

    if (this.formControl === true) {

      if (this.btnExcluir === true) {
        this.endereco = new Endereco();
        this.formularioEndereco();
        this.btnExcluir = false;
        this.scrollTo('formularioEndereco');

      } else {
        this.formControl = false;
      }

    } else {
      this.formControl = true;
      this.endereco = new Endereco();
      this.formularioEndereco();
    }
  }

  // FUNÇÃO PARA ABRIR FORMULÁRIO PARA CADASTRAR UM NOVO ENDEREÇO
  obterEndereco(clienteEnderecoId: number) {

    this.tituloPag = 'EDITAR ENDEREÇO';

    this.formControl = true;
    this.btnExcluir = true;

    return this.enderecoService.getClienteEndereco(clienteEnderecoId)
      .subscribe(
        res => {
          this.endereco = res;
          this.enderecoId = this.endereco.id;
          // console.log(response);
          this.formularioEndereco();
          this.scrollTo('formularioEndereco');
          return res;
        },
        err => {
          this.toast.presentToast('Não foi possível obter o endereco!');
          return err;
        }
      );

  }

  // FUNÇÃO PARA OBTER UM ENDEREÇO A PARTIR DO VIA CEP
  obterDadosEndereco() {

    const cep = this.enderecoForm.value.cep;
    console.log(cep);

    return this.viaCepService.getEndereco(cep)
      .then(response => {

        this.enderecoForm.get('cep').patchValue(response.cep);
        this.enderecoForm.get('endereco').patchValue(response.logradouro);
        this.enderecoForm.get('complemento').patchValue(response.complemento);
        this.enderecoForm.get('bairro').patchValue(response.bairro);
        this.enderecoForm.get('cidade').patchValue(response.localidade);
        this.enderecoForm.get('estado').patchValue(response.uf);

        this.Numero.setFocus();

      });
  }

  // FUNÇÃO PARA SUBMIT DO FORMULÁRIO
  submitEndereco() {

    this.submitted = true;

    // CASO O FORMULÁRIO ESTEJA INVÁLIDO
    if (this.enderecoForm.invalid) {

      this.submitted = false;

      return false;

    } else { // CASO O FORMULÁRIO ESTEJA VÁLIDO

      // CASO O USUÁRIO ESTEJA EDITANDO UM ENDEREÇO
      if (this.enderecoId) {

        return this.enderecoService.putClienteEndereco(this.enderecoForm.value, this.endereco.id)
          .subscribe(
            res => {
              this.toast.presentToast('Endereço alterado com sucesso!');

              this.listarEnderecos();
              this.submitted = false;

              return res;
            },
            err => {
              console.log(err);
              this.toast.presentToast('Erro ao alterar endereço!');
              this.submitted = false;

              return err;
            }
          );

      } else { // CASO O USUÁRIO ESTEJA CADASTRANDO UM NOVO ENDEREÇO

        return this.enderecoService.postClienteEndereco(this.enderecoForm.value)
          .subscribe(
            res => {
              this.toast.presentToast('Endereço cadastrado com sucesso!');
              this.listarEnderecos();
              this.submitted = false;

              return res;
            },
            err => {
              this.toast.presentToast('Erro ao cadastrar endereço!');
              this.submitted = false;

              return err;
            }
          );

      }

    }


  }

  // FUNÇÃO PARA DELETAR UM ENDEREÇO
  deletarEndereco(enderecoId: number) {

    // console.log(clienteEnderecoId);

    return this.enderecoService.deleteClienteEndereco(enderecoId)
      .subscribe(
        res => {
          this.toast.presentToast('Endereço deletado com sucesso!');
          this.formControl = false;
          this.listarEnderecos();
          // this.novoEndereco();
          return res;
        },
        err => {
          this.toast.presentToast('Erro ao deletar o endereço!');
          return err;
        }
      );
  }

  scrollTo(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView();
  }

  abrirEnderecoGoogle(endereco: Endereco) {
    let enderecoDestino = endereco.cep + ' ' + endereco.endereco + ', ' + endereco.numero;
    enderecoDestino += ' ' + endereco.bairro + ', ' + endereco.cidade + ' - ' + endereco.estado;


    window.open('https://www.google.com/maps/dir/Rua Belem, 415 - Belenzinho/' + enderecoDestino);

    // window.open('https://www.google.com/maps/search/?api=1&query=' + endereco);
  }

}
