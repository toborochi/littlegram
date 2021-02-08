import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUsuariosComponent } from './chat-usuarios.component';

describe('ChatUsuariosComponent', () => {
  let component: ChatUsuariosComponent;
  let fixture: ComponentFixture<ChatUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
