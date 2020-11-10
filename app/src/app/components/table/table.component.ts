import { Component, OnInit, Input } from '@angular/core';
import { TableColumn } from './column-iinterface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() columns: TableColumn[];
  @Input() dataSource = [];
  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.id);
  }

}
