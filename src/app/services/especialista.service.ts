import { Injectable } from '@angular/core';
import { Especialista } from '../models/especialista';

//Firestore
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore/';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {
  pathOfCollection = '/especialistas';

  constructor(private db: AngularFirestore, private toastr: ToastrService) { }

  async add(especialista: Especialista, email: string) {
    especialista.email = email;
    try {
      const result = await this.db.collection(this.pathOfCollection).add({ ...especialista });  //  llaves es objeto, 3 puntitos es dinamico
      this.toastr.success('Saved successfully', 'Estado Registro');
      return result;
    }
    catch (error) { this.toastr.error('Error at the moment to save..', 'Estado Registro'); }
    return;
  }

  async getAll() {
    return await this.db.collection<Especialista>(this.pathOfCollection/* , ref => ref.orderBy('score', 'asc') */);
  }
}
