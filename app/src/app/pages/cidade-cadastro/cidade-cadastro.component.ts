import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CidadeService } from '../../services/cidade.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Cidade } from '../../interfaces/cidade-interface';
import { EstadoService } from '../../services/estado.service';
import { Subject } from 'rxjs';
import { Estado } from 'src/app/interfaces/estado-interface';

@Component({
  selector: 'app-cidade-cadastro',
  templateUrl: './cidade-cadastro.component.html',
  styleUrls: ['./cidade-cadastro.component.scss']
})
export class CidadeCadastroComponent implements OnInit, AfterViewInit {

  submited = false;
  id: string = null;
  routerSub: any;
  form: FormGroup = this.initForm();
  estados$ = new Subject<Estado[]>();

  constructor(
    private fb: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    this.estadoService.listaTodos().subscribe(data => {
      this.estados$.next(data);
    });
  }

  ngAfterViewInit(): void {
    if (this.id) {
      this.cidadeService.listaPorId(this.id)
      .subscribe(
        data => {
          this.form = this.initForm(data);
        },
        error =>  {
          this.snackBar.open(error, 'fechar');
        }
      );
    }
  }

  initForm(cidade?: Cidade): FormGroup {
    return this.fb.group({
      id: cidade?.id || undefined,
      nome: [cidade?.nome || '', [Validators.required]],
      estado: [cidade?.estado || null, [Validators.required]],
    });
  }

  onSubmit(): void {
    this.submited = true;

    if (this.form.valid) {

      const cidade: Cidade = this.form.value;

      if(this.id) {
        this.cidadeService.editar(this.id, cidade).subscribe(data => {
          this.snackBar.open('Cidade editada com sucesso!', 'fechar');
        },
        error => {
          this.snackBar.open(error, 'fechar');
        })
      } else {
        this.cidadeService.cadastrar(cidade).subscribe(data => {
          this.id = data.id;
          this.initForm(data);
          this.snackBar.open('Cidade cadastrada com sucesso!', 'fechar');
        },
        error => {
          this.snackBar.open(error, 'fechar');
        });
      }
    }
  }

  compareWith(c1, c2): boolean {
	  return c1 && c2 && c1.id === c2.id;
  }
  
  excluir(): void {
    this.cidadeService.excluir(this.id).subscribe(data => {
      this.snackBar.open('Cidade excluída com sucesso!', 'fechar');
      this.router.navigate(['/cidades'], { replaceUrl: true});
    }, 
    error => {
      this.snackBar.open(error, 'fechar');
    });
  }

}
