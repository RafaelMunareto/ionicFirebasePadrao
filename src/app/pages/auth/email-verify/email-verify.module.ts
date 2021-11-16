import { ComponentsModule } from './../../../shared/components/components.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';

import { EmailVerifyPageRoutingModule } from './email-verify-routing.module';

import { EmailVerifyPage } from './email-verify.page';

@NgModule({
  imports: [SharedModule, ComponentsModule, EmailVerifyPageRoutingModule],
  declarations: [EmailVerifyPage],
})
export class EmailVerifyPageModule {}
