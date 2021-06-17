import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  pathOfCollection = '/clinica-tur';
  referenceToCollection: AngularFirestoreCollection;

  constructor(
    private toastr: ToastrService,
    private db: AngularFirestore
  ) {
    this.referenceToCollection = this.db.collection(this.pathOfCollection, ref => ref.orderBy('date', 'asc'));
  }

  add(data: any) {
    try {
      data.id = this.db.createId();
      this.referenceToCollection.doc(data.id).set({ ...data })
      this.toastr.success('Datos cargados con Exito!', 'Status Turno');
    }
    catch (error) {
      this.toastr.error('Error al momento de registrar Turno', 'Status Turno');
    }
  }

  async update(data: Turno) {
    try {      
      await this.referenceToCollection.doc(data.id).update({ ...data });
      this.toastr.success('Datos Actualizados con Exito', 'Update');
    }
    catch (error) { this.toastr.error(error, 'Update'); }
  }

  getAll() {
    try { return this.referenceToCollection; }
    catch (error) { this.toastr.error('Error at the moment to get turnos..', 'Data turnos'); }
  }
}
