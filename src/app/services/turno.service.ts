import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  pathOfCollection = '/clinica-tur';


  constructor(
    private toastr: ToastrService,
    private db: AngularFirestore
  ) { }

  add(data: any) {
    try {
      data.id = this.db.createId();
      const turno = {
        id: data.id,
        date: data.date,
        especialista: data.especialista,
        especialidad: data.especialidad,
        paciente: data.paciente,
        status: data.status
      }
      const retorno = this.db.collection(this.pathOfCollection).add({ ...turno });  //  llaves es objeto, 3 puntitos es dinamico
      this.toastr.success('Datos cargados con Exito!', 'Status Turno');
      return retorno;
    }
    catch (error) {
      this.toastr.error('Error al momento de registrar Turno', 'Status Turno');
    }
  }

  getAll() {
    try {
      return this.db.collection<any>(this.pathOfCollection, ref => ref.orderBy('date', 'asc'));
    }
    catch (error) { this.toastr.error('Error at the moment to get turnos..', 'Data turnos'); }
  }
}
