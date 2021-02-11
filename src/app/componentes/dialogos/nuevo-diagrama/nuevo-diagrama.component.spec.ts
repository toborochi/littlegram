import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDiagramaComponent } from './nuevo-diagrama.component';

describe('NuevoDiagramaComponent', () => {
  let component: NuevoDiagramaComponent;
  let fixture: ComponentFixture<NuevoDiagramaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDiagramaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDiagramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
