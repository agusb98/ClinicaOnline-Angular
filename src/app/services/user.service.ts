import { Injectable } from '@angular/core';

//Firestore
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore/';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

//Notifications
import { ToastrService } from 'ngx-toastr';
import { Especialista } from '../models/especialista';

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
        return this.referenceToCollection.doc(data.id).set({ ...data });  //  llaves es objeto, 3 puntitos es dinamico
      }, 8000);
    }
    catch (error) { this.toastr.error(error, 'Register'); }
    return;
  }

  getAll() {
    try {
      return this.referenceToCollection;
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

  async update(data: any) {
    try {
      await this.referenceToCollection.doc(data.id).update({ ...data });
      this.toastr.success('Datos Actualizados con Exito', 'Update');
    }
    catch (error) { this.toastr.error(error, 'Update'); }
  }
}
