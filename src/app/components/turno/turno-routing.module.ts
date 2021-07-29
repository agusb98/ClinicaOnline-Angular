import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnoAddComponent } from './turno-add/turno-add.component';
import { TurnoListComponent } from './turno-list/turno-list.component';

const routes: Routes = [
  { path: 'turno', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TurnoListComponent },
  { path: 'add', component: TurnoAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoRoutingModule { }
