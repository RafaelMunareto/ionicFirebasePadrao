import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pages: { url: string; direction: any; icon: string; text: string }[];
  user: firebase.default.User;


  constructor(private authService: AuthService) {
    this.initializeApp();
  }

  initializeApp() {
    this.authService.authState$.subscribe((user) => {
      this.user = user;
    });

    this.pages = [
      {
        url: '/home',
        icon: 'home-outline',
        direction: 'back',
        text: 'Home',
      }
    ];
  }

}
