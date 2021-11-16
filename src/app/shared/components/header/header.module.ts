import { HeaderComponent } from './header.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
