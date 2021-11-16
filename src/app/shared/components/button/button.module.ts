import { ButtonComponent } from './button.component';
import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ButtonComponent],
  imports: [SharedModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
