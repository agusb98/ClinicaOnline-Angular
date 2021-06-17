import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualifyGetComponent } from './qualify-get.component';

describe('QualifyGetComponent', () => {
  let component: QualifyGetComponent;
  let fixture: ComponentFixture<QualifyGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualifyGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualifyGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
