import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableColumn } from './column-iinterface';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() columns: TableColumn[];
  @Input() dataSource = [];
  @Output() onSort = new EventEmitter<any>();

  displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map(c => c.id);
  }

  sortData(sort: Sort): void {
    this.onSort.emit(sort);
  }
}
