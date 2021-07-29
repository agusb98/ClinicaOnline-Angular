import { NgModule } from '@angular/core';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { HistoryListComponent } from './pages/history/history-list/history-list.component';
import { HomeComponent } from './pages/home/home.component';

//   Send unauthorized users to login
const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['user/login']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin), data: { animation: 'home' } },
  { path: 'user', loadChildren: () => import('./components/user/user-routing.module').then(m => m.UserRoutingModule), data: { animation: 'user' } },
  { path: 'admin', loadChildren: () => import('./components/admin/admin-routing.module').then(m => m.AdminRoutingModule), ...canActivate(redirectUnauthorizedToLogin), data: { animation: 'admin' } },
  { path: 'turno', loadChildren: () => import('./components/turno/turno-routing.module').then(m => m.TurnoRoutingModule), data: { animation: 'turno' } },
  { path: 'comments', loadChildren: () => import('./components/comment/comment-routing.module').then(m => m.CommentRoutingModule), data: { animation: 'comment' } },
  { path: 'history/list', component: HistoryListComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
