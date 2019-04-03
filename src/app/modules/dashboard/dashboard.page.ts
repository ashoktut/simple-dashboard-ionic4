import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard/home',
      icon: 'home'
    },
    {
      title: 'Clientes',
      url: '/dashboard/clientes',
      icon: 'people'
    },
    {
      title: 'Usuários',
      url: '/dashboard/usuarios',
      icon: 'person'
    }
  ];

  usuarioNome = '';
  dataHoje = '';

  data = new Date();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService
  ) {
    this.initializeApp();
    this.getDataUsuario();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.authService.logoutAuth();
  }

  getDataUsuario() {
    this.usuarioNome = localStorage.getItem('usuarioNome');

    // Guarda cada pedaço em uma variável
    const dia = this.data.getDate();           // 1-31
    const dia_sem = this.data.getDay();            // 0-6 (zero=domingo)
    const mes = this.data.getMonth();          // 0-11 (zero=janeiro)
    const ano4 = this.data.getFullYear();       // 4 dígitos
    const hora = this.data.getHours();          // 0-23
    const min = this.data.getMinutes();        // 0-59
    const seg = this.data.getSeconds();        // 0-59
    const mseg = this.data.getMilliseconds();   // 0-999
    const tz = this.data.getTimezoneOffset(); // em minutos

    // Formata a data e a hora (note o mês + 1)
    const str_data = dia + '/' + (mes + 1) + '/' + ano4;
    const str_hora = hora + ':' + min + ':' + seg;

    // data = new Date();
    const dias = new Array(
      'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'
    );

    const meses = new Array(
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    );

    const numero_mes = mes;

    this.dataHoje = dias[this.data.getDay()] + ', ' + dia + ' de ' + meses[numero_mes] + ' de ' + ano4;


  }

}
