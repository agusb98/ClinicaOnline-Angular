import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/models/turno';
import { CommentService } from 'src/app/services/comment.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-cancel',
  templateUrl: './turno-cancel.component.html',
  styleUrls: ['./turno-cancel.component.css']
})
export class TurnoCancelComponent implements OnInit {

  @Input() turno: Turno;

  public formCancel: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {    
    this.formCancel = this.createValidators(this.formBuilder);
  }

  createValidators(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      comment: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(500)])
    });
  }
  public errorMessages = {
    comment: [
      { type: 'required', message: 'El comentario es Requerido' },
      { type: 'maxlength', message: 'El comentario no puede tener más de 500 caractéres' },
      { type: 'minlength', message: 'El comentario debe tener más de 15 caractéres' }
    ],
  }

  get comment() {
    return this.formCancel.get('comment');
  }

  async onCancel() {
    const turno = this.turno[0];
    turno.status = 'Cancelado';

    const comment = { 
      id: turno.id,
      paciente: turno.paciente, 
      especialista: turno.especialista, 
      comment: this.comment.value 
    }

    await this.turnoService.update(turno);   //Save turno
    await this.commentService.add(comment);
    window.location.reload(); 
  }

  async onBack() {
    window.location.reload();
  }
}
