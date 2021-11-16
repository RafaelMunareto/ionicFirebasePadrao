import { filter, first, share, switchMap, tap } from 'rxjs/operators';
/* eslint-disable constructor-super */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
import { AbstractControl } from '@angular/forms';
import { EmailGrupo } from './email-grupo.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { Firestore } from 'src/app/core/classes/firestore.class';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailGrupoService extends Firestore<EmailGrupo> {
  grupo: any[] = [];

  constructor(private bd: AngularFirestore) {
    super(bd);
  }

  checkEmailGrupo() {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(
          switchMap((username) =>
            this.db
              .collection('/grupoEmails', (ref) => ref.orderBy('grupo', 'asc'))
              .valueChanges()
              .pipe(
                map((element: EmailGrupo[]) =>
                  element.map((r) => this.grupo.push(r.grupo))
                )
              )
              .pipe(map((s) => this.grupo.includes(username.split('@')[1])))
          )
        )
        .pipe(map((isTaken) => (!isTaken ? { grupoEmailTaken: true } : null)))
        .pipe(first());
    };
  }
}
