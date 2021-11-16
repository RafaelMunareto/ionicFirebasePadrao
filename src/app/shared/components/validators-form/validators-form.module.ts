import { NgModule } from '@angular/core';

import {  ValidatorsFormComponent } from './validators-form.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [ValidatorsFormComponent],
  exports: [ValidatorsFormComponent],
})
export class ValidatorsFormModule {}
