import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './../../../shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { ForgotPageRoutingModule } from './forgot-routing.module';

import { ForgotPage } from './forgot.page';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    ForgotPageRoutingModule,
  ],
  declarations: [ForgotPage],
})
export class ForgotPageModule {}
