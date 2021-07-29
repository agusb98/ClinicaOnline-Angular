import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAddComponent } from './history-add.component';

describe('HistoryAddComponent', () => {
  let component: HistoryAddComponent;
  let fixture: ComponentFixture<HistoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
