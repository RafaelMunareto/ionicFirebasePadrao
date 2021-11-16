import { ErrorPtBr } from './../shared/functions/errorPtBr';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore/';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CacheModule } from 'ionic-cache';

import { environment } from 'src/environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CacheModule.forRoot(),
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    Ng2SearchPipeModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
  ],
  exports: [BrowserModule, IonicModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ErrorPtBr,
  ],
})
export class CoreModule {}
