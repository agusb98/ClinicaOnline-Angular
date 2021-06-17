import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyGetComponent } from './survey-get.component';

describe('SurveyGetComponent', () => {
  let component: SurveyGetComponent;
  let fixture: ComponentFixture<SurveyGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
