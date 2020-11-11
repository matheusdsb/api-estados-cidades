import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCadastroComponent } from './estado-cadastro.component';

describe('EstadoCadastroComponent', () => {
  let component: EstadoCadastroComponent;
  let fixture: ComponentFixture<EstadoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
