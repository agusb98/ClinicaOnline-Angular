import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  referenceToCollection: AngularFirestoreCollection;
  pathOfCollection = '/clinica-esp';

  constructor(
    private toastr: ToastrService,
    private db: AngularFirestore
  ) {
    this.referenceToCollection = this.db.collection(this.pathOfCollection, ref => ref.orderBy('name', 'asc'));
  }

  add(data: any) {
    try {
      data.id = this.db.createId();
      this.referenceToCollection.doc(data.id).set({ ...data });
      this.toastr.success('Agregado con Exito!', 'Estado Especialidad');
    }
    catch (error) {
      this.toastr.error('Error al momento de agregar especialidad..', 'Estado Especialidad');
    }
  }

  getAll() {
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data() as Especialidad))
      );
    }
    catch (error) { this.toastr.error('Error at the moment to get especialidades..', 'Data especialidades'); }
  }
}
