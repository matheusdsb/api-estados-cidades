import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableColumn } from '../../components/table/column-iinterface';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../interfaces/estado-interface';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-estado-lista',
  templateUrl: './estado-lista.component.html',
  styleUrls: ['./estado-lista.component.scss']
})
export class EstadoListaComponent implements OnInit {

  dataSource$ = new Subject<Estado[]>();
  columns: TableColumn[] = [
    {id: 'nome', label: 'Nome' },
    {id: 'abreviacao', label: 'Abreviação' },
    {id: 'dataCriacao', label: 'Criadm em' },
    {id: 'dataUltimaAtualizacao', label: 'Editado em' },
    {
      id: 'editar',
      label: 'Ações',
      tipo: 'link',
      links: [
        {titulo: 'Editar ', resolveLink: (row: Estado) => 'editar/' + row.id }
      ]
    }
  ];

  filterForm: FormGroup = this.fb.group({
	  search: undefined,
	});

  constructor(
    private estadoService: EstadoService,
    private fb: FormBuilder
  ) { }

  carregaLista(params?: any): void {
    this.estadoService.listaTodos(params).subscribe(data => {
      this.dataSource$.next(data);
    });
  }

  ngOnInit(): void {
    this.carregaLista();

    this.filterForm.valueChanges.pipe(
      debounceTime(400)
    ).subscribe(data => {
      this.carregaLista(data);
    });
  }
}
