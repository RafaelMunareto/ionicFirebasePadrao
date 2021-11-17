/* eslint-disable no-underscore-dangle */
import { ErrorPtBr } from './../../../shared/functions/errorPtBr';
/* eslint-disable @typescript-eslint/member-ordering */
import { EmailGrupoService } from 'src/app/shared/validators/email-grupo.service';
import { NavController } from '@ionic/angular';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from 'capacitor-native-biometric';
import { CurrentPlatformService } from 'src/app/shared/services/current-plataform.service';
import { Storage } from '@ionic/storage';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  resourceForm: FormGroup;
  emailStorage = '';
  passStorage = '';
  private _storage: Storage | null = null;

  constructor(
    private router: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: Storage,
    private overlayService: OverlayService,
    public currentPlatformService: CurrentPlatformService,
    private validateEmailGrupo: EmailGrupoService,
    private errorPtBr: ErrorPtBr,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.createForm();
  }

  async ngOnInit() {
    await this.init();
    if (this.currentPlatformService.isDevice) {
      await this._storage.get('pass').then((data) => {
        if (data) {
          this.emailStorage = data.email;
          this.passStorage = data.password;
          this.setCredential().then(() => this.checkCredential());
        }
      });
    }
  }

  createForm() {
    this.resourceForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email],
        this.validateEmailGrupo.checkEmailGrupo(),
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.resourceForm.get('email').value;
  }

  get password() {
    return this.resourceForm.get('password').value;
  }

  onSubmit() {
    if(this.resourceForm.valid)
      this.authService
        .signInWithEmailLink(this.email, this.password)
        .finally(() => {
          this.set('pass', { email: this.email, password: this.password });
        });
    
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  goToPage(path) {
    this.router.navigateForward(['auth', path]);
  }

  async setCredential() {
    await this._storage.get('pass').then((res) => {
      NativeBiometric.setCredentials({
        username: res.email,
        password: res.password,
        server: 'https://lovebank-fb376.web.app',
      });
    });
  }

  async checkCredential() {
    this.setCredential().then(() => {
      NativeBiometric.isAvailable().then((result: AvailableResult) => {
        const isAvailable = result.isAvailable;
        const isFaceId = result.biometryType === BiometryType.FACE_ID;
        if (isAvailable || isFaceId) {
          NativeBiometric.getCredentials({
            server: 'https://lovebank-fb376.web.app',
          })
            .then(() => {
              NativeBiometric.verifyIdentity({
                reason: '',
                title: 'Log in',
                subtitle: 'LoveBank',
                description: '',
              })
                .then(() => {
                  this.authService.signInWithEmailLink(
                    this.emailStorage || this.email,
                    this.passStorage || this.password
                  );
                })
                .catch((err) => {
                  this.overlayService.toast({
                    message: this.errorPtBr.changeErrorBiometric(err.message),
                  });
                });
            })
            .catch(async (err) => {
              await this.overlayService.toast({
                message: this.errorPtBr.changeErrorBiometric(err.message),
              });
            });
        }
      });
    });
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

}
