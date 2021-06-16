import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  pathOfCollection = '/clinica-esp';

  constructor(private db: AngularFirestore) { }

  add(data: any) {
    try {
      const newData = { id: this.db.createId(), name: data }
      return this.db.collection(this.pathOfCollection).add({ ...newData });  //  llaves es objeto, 3 puntitos es dinamico
    }
    catch (error) {
      console.log((error));
    }
  }

  getAll() {
    try {
      return this.db.collection<any>(this.pathOfCollection, ref => ref.orderBy('name', 'asc'));
    }
    catch (error) { }
  }
}
