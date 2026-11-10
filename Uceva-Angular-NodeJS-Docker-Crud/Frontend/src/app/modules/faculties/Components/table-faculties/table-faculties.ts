import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableFacultiesActions, TableFacultiesEvents } from '../../interfaces/table-faculties';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Facult } from '../../interfaces/facult';

@Component({
  selector: 'app-table-faculties',
  imports: [Button],
  templateUrl: './table-faculties.html',
})

export class TableFaculties {

 @Input() faculties: Facult[] = [];
  @Output() onClickActions = new EventEmitter<TableFacultiesEvents>();

  configDetailButton: ButtonConfig = {
    id: 'detail',
    type: 'primary',
    icon: 'eye',
    outline: true,
    size: 'sm'
  }

  configEditButton: ButtonConfig = {
    id: 'update',
    type: 'warning',
    icon: 'pencil-square',
    outline: true,
    size: 'sm'
  }

  configDeleteButton: ButtonConfig = {
    id: 'delete',
    type: 'danger',
    icon: 'trash',
    outline: true,
    size: 'sm'
  }

  click(id: number, action: TableFacultiesActions){
    this.onClickActions.emit({id, action});
  }

}

