import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  referenceToCollection: AngularFirestoreCollection;
  pathOfCollection = '/clinica-log';

  constructor(
    private db: AngularFirestore
  ) {
    this.referenceToCollection = this.db.collection(this.pathOfCollection, ref => ref.orderBy('date', 'desc'));
  }

  add(data: any) {
    data.date = new Date();
    
    try { this.referenceToCollection.doc(this.db.createId()).set({ ...data }); }
    catch (error) { console.log(error); }
  }

  getAll() {
    try {
      return this.referenceToCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => a.payload.doc.data()))
      );
    }
    catch (error) { console.log(error); }
  }

  getByProfile(profile: 'ADMINISTRADOR' | 'PACIENTE' | 'ESPECIALISTA'): Observable<any[]> {
    try {
      return this.getAll().pipe(
        map(users => users.filter(
          user => user.user.includes(profile)))
      );
    }
    catch (error) { console.log(error); }
  }
}
