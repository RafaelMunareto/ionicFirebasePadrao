import { ComponentsModule } from './../../../shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ComponentsModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
