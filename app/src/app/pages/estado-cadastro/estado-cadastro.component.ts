import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EstadoService } from '../../services/estado.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Estado } from '../../interfaces/estado-interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-estado-cadastro',
  templateUrl: './estado-cadastro.component.html',
  styleUrls: ['./estado-cadastro.component.scss']
})
export class EstadoCadastroComponent implements OnInit, AfterViewInit {

  submited = false;
  id: string = null;
  routerSub: any;
  form: FormGroup = this.initForm();

  constructor(
    private fb: FormBuilder,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
  }

  ngAfterViewInit(): void {
    if (this.id) {
      this.estadoService.listaPorId(this.id)
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

  initForm(estado?: Estado): FormGroup {
    return this.fb.group({
      id: estado?.id || undefined,
      nome: [estado?.nome || '', [Validators.required]],
      abreviacao: [estado?.abreviacao || '', [Validators.required, Validators.maxLength(2)]],
    });
  }

  onSubmit(): void {

    this.submited = true;

    if (this.form.valid) {
      const estado: Estado = this.form.value;

      if(this.id) {
        this.estadoService.editar(this.id, estado).subscribe(data => {
          this.snackBar.open('Estado editado com sucesso!', 'fechar');
        },
        error => {
          this.snackBar.open(error, 'fechar');
        })
      } else {
        this.estadoService.cadastrar(estado).subscribe(data => {
          this.id = data.id;
          this.initForm(data);
          this.snackBar.open('Estado cadastrado com sucesso!', 'fechar');
        },
        error => {
          this.snackBar.open(error, 'fechar');
        });
      }
    }
  }

  excluir(): void {
    this.estadoService.excluir(this.id).subscribe(data => {
      this.snackBar.open('Estado excluído com sucesso!', 'fechar');
      this.router.navigate(['/estados'], { replaceUrl: true});
    }, 
    error => {
      this.snackBar.open(error, 'fechar');
    });
  }
}
