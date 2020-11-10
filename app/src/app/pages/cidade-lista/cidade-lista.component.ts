import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Cidade } from '../../interfaces/cidade-interface';
import { CidadeService } from '../../services/cidade.service';
import { TableColumn } from '../../components/table/column-iinterface';

@Component({
  selector: 'app-cidade-lista',
  templateUrl: './cidade-lista.component.html',
  styleUrls: ['./cidade-lista.component.scss']
})
export class CidadeListaComponent implements OnInit {

  dataSource$ = new Subject<Cidade[]>();
  columns: TableColumn[] = [
    {id: 'nome', label: 'Nome' },
    {id: 'dataCriacao', label: 'Criadm em' },
    {id: 'dataUltimaAtualizacao', label: 'Editado em' },
  ];

  constructor(private cidadeService: CidadeService) { }

  carregaLista(): void {
    this.cidadeService.listaTodas().subscribe(data => {
      this.dataSource$.next(data);
    });
  }

  ngOnInit(): void {
    this.carregaLista();
  }

}
