import { AuthService } from './../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmailGrupoService } from 'src/app/shared/validators/email-grupo.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  resourceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private emailGrupoService: EmailGrupoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resourceForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
        this.emailGrupoService.checkEmailGrupo(),
      ],
    });
  }

  get email() {
    return this.resourceForm.get('email').value;
  }

  onSubmit() {
    this.authService.sendPasswordResetEmail(this.email);
    this.resourceForm.reset();
  }
}
