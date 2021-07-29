import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.referenceToCollection = this.db.collection(this.pathOfCollection, ref => ref.orderBy('time_updated', 'desc'));
  }

  async set(data: any) {
    try { return this.referenceToCollection.doc(data.id).set({ ...data }); }
    catch (error) { console.log(error); }
  }

  add(data: any) {
    try {
      data.id = this.db.createId();
      this.referenceToCollection.doc(data.id).set({ ...data })
      this.toastr.success('Datos cargados con Exito!', 'Status Turno');
    }
    catch (error) {
      this.toastr.error(error);
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
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data() as Turno))
      );
    }
    catch (error) { this.toastr.error('Error at the moment to get turnos..', 'Data turnos'); }
  }

  getByStatus(status: 'Pendiente' | 'Finalizado' | 'Cancelado' | 'Aceptado' | 'Rechazado') {
    try {
      return this.getAll().pipe(
        map(turnos => turnos.filter(
          turno => turno.status.includes(status)))
      );
    }
    catch (error) { this.toastr.error('Error at the moment to get turnos..', 'Data turnos'); }
  }

  getByEmailPaciente(email: string) {
    try {
      return this.getAll().pipe(
        map(turnos => turnos.filter(
          turno => turno.paciente.email.includes(email)))
      );
    }
    catch (error) { this.toastr.error('Error at the moment to get turnos..', 'Data turnos'); }
  }

  getByEmailPacienteAndEspecialista(emailPac: string, emailEsp: string) {
    try {
      return this.getAll().pipe(
        map(turnos => turnos.filter(
          turno => turno.paciente.email.includes(emailPac)
            && turno.especialista.email.includes(emailEsp)
        ))
      );
    }
    catch (error) { this.toastr.error('Error at the moment to get turnos..', 'Data turnos'); }
  }

  getByEmailEspecialista(email: string) {
    try {
      return this.getAll().pipe(
        map(turnos => turnos.filter(
          turno => turno.especialista.email.includes(email)))
      );
    }
    catch (error) { this.toastr.error('Error at the moment to get turnos..', 'Data turnos'); }
  }
}
