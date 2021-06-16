import { Injectable } from '@angular/core';

//Firestore
import { AngularFirestore, } from '@angular/fire/firestore/';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

//Notifications
import { ToastrService } from 'ngx-toastr';
import { Especialista } from '../models/especialista';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  pathOfCollection = '/clinica-user';

  constructor(
    private toastr: ToastrService,
    private db: AngularFirestore,
    private dbStorage: AngularFireStorage
  ) { }

  async add(data: any, photo: any, photo2?: any) {
    try {
      data.id = this.db.createId();

      const filePath = `/users/principal/${data.id}`;
      this.dbStorage.ref(filePath);
      this.dbStorage.upload(filePath, photo).then(() => {
        let storages = firebase.default.storage();
        let storageRef = storages.ref();
        let spaceRef = storageRef.child(filePath);

        spaceRef.getDownloadURL().then(url => {
          data.photo = url;
          data.photo = `${data.photo}`;
        });
      });

      if (photo2 != null) {
        const filePath = `/users/principal/${data.id}2`;
        this.dbStorage.ref(filePath);
        this.dbStorage.upload(filePath, photo2).then(() => {
          let storages = firebase.default.storage();
          let storageRef = storages.ref();
          let spaceRef = storageRef.child(filePath);

          spaceRef.getDownloadURL().then(url => {
            data.photo2 = url;
            data.photo2 = `${data.photo2}`;
          });
        });
      }
      setTimeout(() => {
        return this.db.collection(this.pathOfCollection).add({ ...data });  //  llaves es objeto, 3 puntitos es dinamico
      }, 8000);
    }
    catch (error) { this.toastr.error(error, 'Register'); }
    return;
  }

  getAll() {
    try {
      return this.db.collection<any>(this.pathOfCollection, ref => ref.orderBy('user', 'asc'));
    }
    catch (error) { this.toastr.error('Error at the moment to get users..', 'Data users'); }
  }

  getOne(email: string) {
    try {
      return this.db.collection<any>(this.pathOfCollection, ref => ref.where('email', '==', email));
    }
    catch (error) { this.toastr.error('Error at the moment to get users..', 'Data users'); }
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

  async update(data: Especialista) {
    try {
      await this.db.collection(this.pathOfCollection).doc(data.id).delete().then(async () => {
        await this.db.collection(this.pathOfCollection).doc(data.id).set({ ...data }).then(() => {
          this.toastr.success('Datos Actualizados con Exito', 'Update');
        });
      });
    }
    catch (error) { this.toastr.error(error, 'Update'); }
  }
}
