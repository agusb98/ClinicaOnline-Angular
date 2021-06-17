import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  pathOfCollection = '/clinica-com';
  referenceToCollection: AngularFirestoreCollection;

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService
    ) {
    this.referenceToCollection = this.db.collection(this.pathOfCollection);
  }

  add(data: any) {
    try {
      data.date = this.date;
      this.referenceToCollection.doc(data.id).set({ ...data });
      this.toastr.success('Datos cargados con Exito!', 'Estado de Calificación');
    }
    catch (error) { 
      this.toastr.error('Error al momento de registrar calificación', 'Estado de Calificación');
     }
  }

  update(data: any) {
    try {
      data.date = this.date;
      this.referenceToCollection.doc(data.id).set({ ...data });
      this.toastr.success('Datos cargados con Exito!', 'Estado de Calificación');
    }
    catch (error) { this.toastr.error('Error al momento de registrar calificación', 'Estado de Calificación'); }
  }

  getAll() {
    try { return this.referenceToCollection; }
    catch (error) { console.log(error);
     }
  }

  get date(){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1 //arrays always start with 0
    let year = date.getFullYear()

    if (month < 10) {
      return (`${day}-0${month}-${year}`);
    } 
    else {
      return (`${day}-${month}-${year}`);
    }
  }
}
