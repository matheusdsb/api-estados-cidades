import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadeCadastroComponent } from './cidade-cadastro.component';

describe('CidadeCadastroComponent', () => {
  let component: CidadeCadastroComponent;
  let fixture: ComponentFixture<CidadeCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidadeCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidadeCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
