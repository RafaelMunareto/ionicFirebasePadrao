/* eslint-disable @angular-eslint/no-input-rename */
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validators-form',
  template: `
  <ion-note
  slot="end"
  style="font-size:12px;"
  color="danger"
  severity="error"
  *ngIf="errorMessage"
  >
    {{ errorMessage }}
  </ion-note>
  `,
})
export class ValidatorsFormComponent implements OnInit {
  @Input() mensagemPersonalizada = '';
  @Input('form-control')
  formControl: FormControl = new FormControl();

  constructor() {
    this.formControl = new FormControl();
  }

  // <div class="message error" *ngIf='errorMessage'> {{ errorMessage }}</div>

  ngOnInit() {}

  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors?.required) {
      return 'Dado obrigatório';
    } else if (this.formControl.errors?.email) {
      return 'Email inválido';
    } else if (this.formControl.errors?.minlength) {
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    } else if (this.formControl.errors?.maxlength) {
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `Máximo ${requiredLength} caracteres`;
    } else if (this.formControl.errors?.lowerCase) {
      return 'Devem ser mínusculas';
    } else if (this.formControl.errors?.mustMatch) {
      return 'Devem ser iguais';
    }else if  (this.formControl.errors?.pattern) {
      return this.mensagemPersonalizada;
    }else if  (this.formControl.errors?.grupoEmailTaken) {
      return 'Grupo de email não é válido';
    }

    return null;
  }
}
