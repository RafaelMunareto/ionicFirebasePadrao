import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./signup/signup.module').then((m) => m.SignupPageModule),
      },
      {
        path: 'forgot',
        loadChildren: () =>
          import('./forgot/forgot.module').then((m) => m.ForgotPageModule),
      },
      {
        path: 'email-verify',
        loadChildren: () =>
          import('./email-verify/email-verify.module').then(
            (m) => m.EmailVerifyPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
