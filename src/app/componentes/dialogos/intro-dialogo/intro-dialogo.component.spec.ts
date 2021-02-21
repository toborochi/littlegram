import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDialogoComponent } from './intro-dialogo.component';

describe('IntroDialogoComponent', () => {
  let component: IntroDialogoComponent;
  let fixture: ComponentFixture<IntroDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
