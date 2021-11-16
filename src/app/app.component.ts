import { CurrentPlatformService } from 'src/app/shared/services/current-plataform.service';
import { Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { App, URLOpenListenerEvent } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  notShown: boolean;
  mobileWeb = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private zone: NgZone,
    private router: Router,
    public currentPlatformService: CurrentPlatformService
  ) {
    this.initializeApp();
    this.notShown = true;
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const slug = event.url.split('.app').pop();
        if (slug) {
          this.router.navigateByUrl(slug);
        }
      });
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
