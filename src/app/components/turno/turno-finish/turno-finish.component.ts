import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-finish',
  templateUrl: './turno-finish.component.html',
  styleUrls: ['./turno-finish.component.css']
})
export class TurnoFinishComponent implements OnInit {

  @Input() turno: Turno;
  user = JSON.parse(localStorage.getItem("user"));

  public formFinish: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
  ) { }

  ngOnInit(): void {    
    this.formFinish = this.createValidators(this.formBuilder);
  }

  createValidators(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      comment: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(500)]),
      diagnostic: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
    });
  }
  public errorMessages = {
    comment: [
      { type: 'required', message: 'El comentario es Requerido' },
      { type: 'maxlength', message: 'El comentario no puede tener más de 500 caractéres' },
      { type: 'minlength', message: 'El comentario debe tener más de 15 caractéres' }
    ],
    diagnostic: [
      { type: 'required', message: 'El diagnóstico es Requerido' },
      { type: 'maxlength', message: 'El diagnóstico no puede tener más de 500 caractéres' },
      { type: 'minlength', message: 'El diagnóstico debe tener más de 5 caractéres' }
    ],
  }

  get comment() {
    return this.formFinish.get('comment');
  }

  get diagnostic() {
    return this.formFinish.get('diagnostic');
  }

  async onFinish() {
    const turno = this.turno[0];
    turno.status = 'Finalizado';

    // await this.turnoService.update(turno);   //Save turno
    // window.location.reload(); 
  }

  async onBack() {
    window.location.reload();
  }
}
