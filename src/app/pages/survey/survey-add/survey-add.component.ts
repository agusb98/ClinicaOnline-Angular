import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-survey-add',
  templateUrl: './survey-add.component.html',
  styleUrls: ['./survey-add.component.css']
})
export class SurveyAddComponent implements OnInit {

  @Input() turno: Turno;

  public flagSurvey: boolean = true;
  public formSurvey: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.formSurvey = this.createValidators(this.formBuilder);
  }

  createValidators(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      recommend: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
      atention: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]),
    });
  }

  get recommend() {
    return this.formSurvey.get('recommend');
  }

  get atention() {
    return this.formSurvey.get('atention');
  }

  public errorMessages = {
    recommend: [
      { type: 'required', message: 'La recomendación es Requerida' },
      { type: 'maxlength', message: 'La recomendación no puede tener más de 50 caractéres' },
      { type: 'minlength', message: 'La recomendación debe tener más de 2 caractéres' }
    ],
    atention: [
      { type: 'required', message: 'La atención que tuvo es Requerida' },
      { type: 'maxlength', message: 'La atención no puede tener más de 50 caractéres' },
      { type: 'minlength', message: 'La atención debe tener más de 2 caractéres' }
    ]
  }

  cleanForm() {
    this.formSurvey = this.createValidators(this.formBuilder);
  }

  async onAdd() {
    const survey = this.getValues();
    this.commentService.update(survey);
    this.onBack();
  }

  getValues() {
    return {
      id: this.turno[0].id,
      especialidad: this.turno[0].especialidad,
      especialista: this.turno[0].especialista,
      paciente: this.turno[0].paciente,
      survey: {
        recommend: this.recommend.value,
        atention: this.atention.value
      }
    };
  }

  async onBack() {
    this.router.navigate(['/home']);
  }

  getAll() {
    this.commentService.getAll().valueChanges().subscribe((data) => {
      data.forEach(element => {
        if (element.id === this.turno[0].id && element.survey) {
          this.flagSurvey = false;
        }
      });
    });
  }
}
