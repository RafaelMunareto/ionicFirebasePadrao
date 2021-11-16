import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class SharedModule {}
