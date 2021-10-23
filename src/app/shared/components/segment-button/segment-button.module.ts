import { SegmentButtonComponent } from './segment-button.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared.module';
import { DirectivesModule } from './../../directives/directives.module';
import { TasksFunctions } from '../../functions/tasks-functions';

@NgModule({
  declarations: [SegmentButtonComponent],
  imports: [SharedModule, DirectivesModule],
  exports: [SegmentButtonComponent],
  providers: [TasksFunctions],
})
export class SegmentButtonModule {}
