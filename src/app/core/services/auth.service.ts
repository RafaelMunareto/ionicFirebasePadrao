/* eslint-disable object-shorthand */
import { AngularFirestore } from '@angular/fire/firestore';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-var */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthOptions, AuthProvider, User } from './auth.types';

import { ErrorPtBr } from './../../shared/functions/errorPtBr';
import { NavController } from '@ionic/angular';
import { OverlayService } from './overlay.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$: Observable<firebase.default.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private bd: AngularFirestore,
    private navCtrl: NavController,
    private errorPtBr: ErrorPtBr,
    private overlayService: OverlayService
  ) {
    this.authState$ = this.afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map((user) => user !== null));
  }

  authenticate({
    isSignIn,
    provider,
    user,
  }: AuthOptions): Promise<firebase.default.auth.UserCredential> {
    let operation: Promise<firebase.default.auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.signInWithPopup(provider);
    } else {
      operation = isSignIn
        ? this.signInWithEmail(user)
        : this.signUpWithEmail(user);
    }

    return operation;
  }

  async logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  async sendPasswordResetEmail(email: string): Promise<any> {
    const loading = await this.overlayService.loading();
    return new Promise((resolve, reject) => {
      try {
        this.afAuth.sendPasswordResetEmail(email).then(
          (data) => {
            resolve(data);
            this.overlayService.toast({
              message: 'Sucesso! Um email foi enviado para sua caixa postal.',
            });
            loading.dismiss();
            setTimeout(() => {
              this.navCtrl.navigateBack('auth/login');
            }, 800);
          },
          (e) => {
            this.errorPtBr.erro(e);
          }
        );
      } catch (e) {
        this.errorPtBr.erro(e);
      } finally {
        loading.dismiss();
      }
    });
  }

  private signInWithEmail({
    email,
    password,
  }: User): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async signInWithEmailLink(email, password) {
    const loading = await this.overlayService.loading();
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      const verificado = await (await this.afAuth.currentUser).emailVerified;
      if (verificado) {
        this.navCtrl.navigateForward('dashboard');
      } else {
        await this.logout();
        this.overlayService.toast({
          message:
            'Seu email ainda não foi verificado, verifique sua caixa postal',
        });
      }
    } catch (e) {
      this.errorPtBr.erro(e);
      console.log(e);
    } finally {
      loading.dismiss();
    }
  }

  async signUpWithEmailLink(email, password, name) {
    const loading = await this.overlayService.loading();
    var actionCodeSettings = {
      url: 'https://lovebank-fb376.web.app',
      handleCodeInApp: true,
    };
    try {
      await this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((credentials) =>
          credentials.user
            .updateProfile({
              displayName: name,
              photoURL: 'https://lovebank-fb376.web.app/id.png',
            })
            .then(() => credentials)
        )
        .then((credentials) => {
          if (credentials != null) {
            credentials.user.sendEmailVerification();
            this.overlayService
              .toast({
                message: 'Email enviado, verifique sua caixa postal',
              })
              .then(() => {
                this.bd.collection(`usuarios`).add({
                  name: name,
                  email: email,
                  photoURL: 'https://lovebank-fb376.web.app/id.png',
                  verificado: false,
                });
              });
          }
        });
    } catch (e) {
      this.errorPtBr.erro(e);
      console.log(e);
    } finally {
      loading.dismiss();
    }
  }

  async emailVerify(code) {
    try {
      const email = await (await this.afAuth.checkActionCode(code)).data.email;
      await this.afAuth.applyActionCode(code).then(() => {
        this.bd
          .collection('usuarios', (ref) => ref.where('email', '==', email))
          .snapshotChanges()
          .subscribe((res: any) => {
            const id = res[0].payload.doc.id;
            this.bd.collection('usuarios').doc(id).update({ verificado: true });
          });
      });

      this.overlayService.toast({
        message: 'Sucesso!!! Faça seu login.',
      });
      setTimeout(() => {
        this.navCtrl.navigateBack('auth/login');
      }, 1500);
      return true;
    } catch (e) {
      return this.errorPtBr.erro(e);
    }
  }

  async validNewPassword(code, password) {
    try {
      await this.afAuth.confirmPasswordReset(code, password);
      this.overlayService.toast({
        message: 'Senha alterada com sucesso!',
      });
      setTimeout(() => {
        this.navCtrl.navigateBack('auth/login');
      }, 400);
    } catch (e) {
      return this.errorPtBr.erro(e);
    }
  }

  async checkResetPassword(code) {
    try {
      await this.afAuth.verifyPasswordResetCode(code);
      this.overlayService.toast({
        message: 'Seu código foi verificado, crie uma nova senha.',
      });
      return true;
    } catch (e) {
      return this.errorPtBr.erro(e);
    }
  }

  private signUpWithEmail({
    email,
    password,
    name,
  }: User): Promise<firebase.default.auth.UserCredential> {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }

  private signInWithPopup(
    provider: AuthProvider
  ): Promise<firebase.default.auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new firebase.default.auth.FacebookAuthProvider();
        break;
      case AuthProvider.Google:
        signInProvider = new firebase.default.auth.GoogleAuthProvider();
        break;
      case AuthProvider.Twitter:
        signInProvider = new firebase.default.auth.TwitterAuthProvider();
        break;
      case AuthProvider.Microsoft:
        signInProvider = new firebase.default.auth.OAuthProvider(
          'microsoft.com'
        );
        break;
    }

    return this.afAuth.signInWithPopup(signInProvider);
  }
}
