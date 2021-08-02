import { Injectable } from '@angular/core';

//Firestore
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore/';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

//Notifications
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Admin } from '../models/admin';
import { Especialista } from '../models/especialista';
import { Paciente } from '../models/paciente';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pathOfCollection = '/clinica-user';
  private referenceToCollection: AngularFirestoreCollection;

  constructor(
    private toastr: ToastrService,
    private db: AngularFirestore,
    private dbStorage: AngularFireStorage
  ) {
    this.referenceToCollection = this.db.collection(this.pathOfCollection, ref => ref.orderBy('name', 'asc'));
  }

  async set(data: User) {
    try { return this.referenceToCollection.doc(data.id).set({ ...data }); }
    catch (error) { console.log(error); }
  }

  async add(data: any, photo: any, photo2?: any) {
    try {
      data.id = this.db.createId();

      const filePath = `/users/${data.id}-principal`;
      this.dbStorage.ref(filePath);
      this.dbStorage.upload(filePath, photo).then(() => {
        let storages = firebase.default.storage();
        let storageRef = storages.ref();
        let spaceRef = storageRef.child(filePath);

        spaceRef.getDownloadURL().then(url => {
          data.photo = url;
          data.photo = `${data.photo}`;

          if (photo2 != null) {
            const filePath = `/users/${data.id}`;
            this.dbStorage.ref(filePath);
            this.dbStorage.upload(filePath, photo2).then(() => {
              let storages = firebase.default.storage();
              let storageRef = storages.ref();
              let spaceRef = storageRef.child(filePath);

              spaceRef.getDownloadURL().then(url => {
                data.photo2 = url;
                data.photo2 = `${data.photo2}`;
                return this.referenceToCollection.doc(data.id).set({ ...data });  //  llaves es objeto, 3 puntitos es dinamico
              });
            });
          }
          else {
            return this.referenceToCollection.doc(data.id).set({ ...data });  //  llaves es objeto, 3 puntitos es dinamico
          }
        });
      });
    }
    catch (error) { this.toastr.error(error, 'Register'); }
    return;
  }

  getAll(): Observable<User[]> {
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data() as User))
      );
    }
    catch (error) { this.toastr.error('Error al momento de obtener Usuarios..', 'Dato de Usuarios'); }
  }

  getByProfile(profile: 'ADMINISTRADOR' | 'PACIENTE' | 'ESPECIALISTA'): Observable<User[]> {
    try {
      return this.getAll().pipe(
        map(users => users.filter(
          user => user.user.includes(profile)))
      );
    }
    catch (error) { this.toastr.error('Error al momento de obtener Usuarios..', 'Dato de Usuarios'); }
  }

  getOne(email: string): Observable<User[]> {
    try {
      return this.getAll().pipe(
        map(users => users.filter(
          user => user.email.includes(email)))
      );
    }
    catch (error) { this.toastr.error('Error al momento de obtener Usuario..', 'Dato de Usuarios'); }
  }

  getEspecialistasWithPermission(): Observable<User[]> {
    try {
      return this.getAll().pipe(
        map(users =>
          users.filter(
            user => user.user.includes('ESPECIALISTA')))
      );
    }
    catch (error) { this.toastr.error('Error al momento de obtener Usuario..', 'Dato de Usuarios'); }
  }

  getEspecialistasWithoutPermission(): Observable<User[]> {
    try {
      return this.getAll().pipe(
        map(users => users.filter(
          user => user['status'].includes(false)))
      );
    }
    catch (error) { this.toastr.error('Error al momento de obtener Usuario..', 'Dato de Usuarios'); }
  }

  /* 
    Gets all Especialistas with Permition and one of theirs Especialidades have same name as param
  */
  getEspecialistasByEsp(name: string): Observable<User[]> {
    try {
      return this.getEspecialistasWithPermission().pipe(
        map(users => users.filter(
          user => {
            let a: boolean = false;

            user['especialidad'].forEach(e => {
              if (e['name'] == name) {
                a = true;
              }
            });

            return a;
          }
        ))
      );
    }
    catch (error) { this.toastr.error('Error al momento de obtener Especialista..', 'Dato de Especialistas'); }
  }

  async uploadPhoto(photo, id: string) {
    const filePath = `/users/${id}`;
    this.dbStorage.ref(filePath);
    this.dbStorage.upload(filePath, photo);

    let storages = firebase.default.storage();
    let storageRef = storages.ref();
    let spaceRef = storageRef.child(filePath);

    spaceRef.getDownloadURL().then(url => {
      photo = url
      return `${photo}`;
    });
  }

  async update(data: any) {
    try {
      await this.referenceToCollection.doc(data.id).update({ ...data });
      this.toastr.success('Datos Actualizados con Exito', 'Update');
    }
    catch (error) { this.toastr.error(error, 'Update'); }
  }
}
