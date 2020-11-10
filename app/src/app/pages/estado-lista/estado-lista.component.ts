import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TableColumn } from '../../components/table/column-iinterface';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../interfaces/estado-interface';

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
  ];

  constructor(private estadoService: EstadoService) { }

  carregaLista(): void {
    this.estadoService.listaTodos().subscribe(data => {
      this.dataSource$.next(data);
    });
  }

  ngOnInit(): void {
    this.carregaLista();
  }
}
