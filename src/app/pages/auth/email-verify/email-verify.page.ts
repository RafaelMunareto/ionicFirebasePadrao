/* eslint-disable @typescript-eslint/dot-notation */
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from 'src/app/shared/validators/validate-password.validator';
import { ErrorPtBr } from 'src/app/shared/functions/errorPtBr';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.page.html',
  styleUrls: ['./email-verify.page.scss'],
})
export class EmailVerifyPage implements OnInit {
  verificacacao: any = false;
  resourceForm: FormGroup;
  liberaPassword;
  code;
  mode;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private ptBr: ErrorPtBr,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.code = this.router.snapshot.queryParams['oobCode'];
    this.mode = this.router.snapshot.queryParams['mode'];

    if (this.mode === 'verifyEmail') {
      this.authService
        .emailVerify(this.code)
        .then((res) => this.verificacacao = res);
    } else if (this.mode === 'resetPassword') {
      this.authService
        .checkResetPassword(this.code)
        .then((res) => (this.liberaPassword = res));
      this.createForm();
    }
  }

  goToPage(path) {
    this.navCtrl.navigateForward(['auth', path]);
  }

  createForm() {
    this.resourceForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(6), mustMatch('password')],
      ],
    });
  }

  private get password() {
    return this.resourceForm.get('password').value;
  }

  onSubmit() {
    if (this.liberaPassword) {
      try{
        this.authService.validNewPassword(this.code, this.password);
        setTimeout(() => {
          this.navCtrl.navigateForward('auth');
        },3000)

      }catch(e){
        this.overlayService.toast({
          message: e
        })
      }
    }
  }
}
