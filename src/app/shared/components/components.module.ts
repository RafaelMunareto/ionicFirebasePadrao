import { ButtonModule } from './button/button.module';
import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';

import { ValidatorsFormModule } from './validators-form/validators-form.module';

@NgModule({
  imports: [HeaderModule, ButtonModule, ValidatorsFormModule],
  exports: [HeaderModule, ButtonModule, ValidatorsFormModule],
})
export class ComponentsModule {}
