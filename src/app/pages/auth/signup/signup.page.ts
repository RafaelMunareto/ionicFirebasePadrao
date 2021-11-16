/* eslint-disable @typescript-eslint/no-unused-expressions */
import { OverlayService } from './../../../core/services/overlay.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmailGrupo } from './../../../shared/validators/email-grupo.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './../../../core/services/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailGrupoService } from 'src/app/shared/validators/email-grupo.service';
import { mustMatch } from 'src/app/shared/validators/validate-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  resourceForm: FormGroup;

  constructor(
    private router: NavController,
    private formBuilder: FormBuilder,
    private validateEmailGrupo: EmailGrupoService,
    private authService: AuthService,
    private db: AngularFirestore,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resourceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email],
        this.validateEmailGrupo.checkEmailGrupo(),
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(6), mustMatch('password')],
      ],
    });
  }

  get name() {
    return this.resourceForm.get('name').value;
  }

  get email() {
    return this.resourceForm.get('email').value;
  }

  get password() {
    return this.resourceForm.get('password').value;
  }

  onSubmit() {
    const grupo = [];
    return this.db
      .collection('/grupoEmails', (ref) => ref.orderBy('grupo', 'asc'))
      .valueChanges()
      .pipe(
        map((element: EmailGrupo[]) => element.map((r) => grupo.push(r.grupo)))
      )
      .pipe(map((s) => grupo.includes(this.email.split('@')[1] || null)))
      .subscribe((res) => {
        if (res) {
          this.authService.signUpWithEmailLink(
            this.email,
            this.password,
            this.name
          );
          this.resourceForm.reset();
        } else {
          this.overlayService.toast({
            message: 'Esse email não pertence aos grupos permitidos',
          });
        }
      });
  }

  goToPage(path) {
    this.router.navigateForward(['auth', path]);
  }
}
