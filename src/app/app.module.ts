import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CurrentPlatformService } from './shared/services/current-plataform.service';
import { StoreModule } from '@ngrx/store';
import { exampleReducer } from './core/ngrx/reducers/example.reducer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot({
      reducer: exampleReducer,
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CurrentPlatformService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
