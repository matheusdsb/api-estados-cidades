import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Cidade } from '../../interfaces/cidade-interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CidadeService } from '../../services/cidade.service';
import { TableColumn } from '../../components/table/column-iinterface';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cidade-lista',
  templateUrl: './cidade-lista.component.html',
  styleUrls: ['./cidade-lista.component.scss']
})
export class CidadeListaComponent implements OnInit {

  dataSource$ = new Subject<Cidade[]>();
  columns: TableColumn[] = [
    {id: 'estado', label: 'Estado', resolve: (row: Cidade)  => row.estado.abreviacao },
    {id: 'nome', label: 'Nome' },
    {id: 'dataCriacao', label: 'Criadm em' },
    {id: 'dataUltimaAtualizacao', label: 'Editado em' },
    {
      id: 'links',
      label: 'Ações',
      tipo: 'link',
      links: [
        {titulo: 'Editar', resolveLink: (row: Cidade) => 'editar/' + row.id}
      ]
    }
  ];

  filterForm: FormGroup = this.fb.group({
	  search: undefined,
	});

  constructor(
    private cidadeService: CidadeService,
    private fb: FormBuilder
  ) { }

  carregaLista(params?: any): void {
    this.cidadeService.listaTodas(params).subscribe(data => {
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
