import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
