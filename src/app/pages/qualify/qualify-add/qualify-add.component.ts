import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-qualify-add',
  templateUrl: './qualify-add.component.html',
  styleUrls: ['./qualify-add.component.css']
})
export class QualifyAddComponent implements OnInit {

  @Input() turno: Turno;
  survey: any;

  public flagQualify: boolean = true;
  public formQualify: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turnoService: TurnoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.formQualify = this.createValidators(this.formBuilder);
  }

  createValidators(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      qualification: new FormControl('', [Validators.required, Validators.min(0), Validators.max(10)]),
    });
  }

  get qualification() {
    return this.formQualify.get('qualification');
  }

  public errorMessages = {
    qualification: [
      { type: 'required', message: 'La calificación es Requerida' },
      { type: 'min', message: 'La calificación es Inválida' },
      { type: 'max', message: 'La calificación es Inválida' }
    ]
  }

  cleanForm() {
    this.formQualify = this.createValidators(this.formBuilder);
  }

  async onAdd() {
    const qualify = this.getValues();
    // this.turnoService.update(qualify);
    // this.onBack();
  }

  getValues() {
    return {
      id: this.turno[0].id,
      especialidad: this.turno[0].especialidad,
      especialista: this.turno[0].especialista,
      paciente: this.turno[0].paciente,
      survey: this.survey,
      qualify: this.qualification.value
    };
  }

  async onBack() {
    this.router.navigate(['home']);
  }

  getAll() {
    this.turnoService.getAll().valueChanges().subscribe((data) => {
      data.forEach(element => {
        if (element.id === this.turno[0].id && element.qualify) {
          this.flagQualify = false;
        }
        if (element.id === this.turno[0].id && element.survey) {
          this.survey = element.survey;
        }
      });
    });
  }
}
