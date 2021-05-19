import { Injectable } from '@angular/core';
import { Paciente } from '../models/paciente';

//Firestore
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore/';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pathOfCollection = '/pacientes';

  constructor(private db: AngularFirestore, private toastr: ToastrService) { }

  async add(paciente: Paciente, email: string) {
    paciente.email = email;
    try {
      const result = await this.db.collection(this.pathOfCollection).add({ ...paciente });  //  llaves es objeto, 3 puntitos es dinamico
      this.toastr.success('Saved successfully', 'Estado Registro');
      return result;
    }
    catch (error) { this.toastr.error('Error at the moment to save..', 'Estado Registro'); }
  }

  async getAll() {
    return await this.db.collection<Paciente>(this.pathOfCollection/* , ref => ref.orderBy('score', 'asc') */);
  }

  getOne(email: string) {
    try {
      return this.db.collection<Paciente>
        (this.pathOfCollection, (ref) => ref.where('email', '==', email));
    }
    catch (error) { this.toastr.error('Error at the moment to get profile..', 'Status Profile'); }
  }

}
