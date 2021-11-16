import { AuthService } from 'src/app/core/services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title;
  @Input() rota;
  @Input() cor;
  @Input() funcao;
  @Input() ocupaEspaco;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.cor === 'dark') {
      this.cor = 'icon_dark';
    } else {
      this.cor = 'icon_white';
    }
    if (this.ocupaEspaco === `sim`) {
      this.ocupaEspaco = '';
    } else {
      this.ocupaEspaco = 'nav_header';
    }
  }

  back() {
    this.navCtrl.back();
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.navCtrl.navigateBack('auth/login'));
  }
}
