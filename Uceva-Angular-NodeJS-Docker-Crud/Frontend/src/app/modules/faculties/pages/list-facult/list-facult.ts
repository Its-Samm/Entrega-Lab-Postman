import { Component, inject } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { TableFaculties } from '../../Components/table-faculties/table-faculties';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Facult } from '../../interfaces/facult';
import { Router } from '@angular/router';
import { FacultService } from '../../services/facult.service';
import { AlertService } from '../../../shared/services/alert.service';
import { TableFacultiesEvents } from '../../interfaces/table-faculties';

@Component({
  selector: 'app-list-facult',
  imports: [
    Button,
    TableFaculties
  ],
  templateUrl: './list-facult.html',
})
export class ListFacult {

  faculties: Facult[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-facult-button',
    title: 'Create Facult',
    type: 'primary',
  };

  router = inject(Router);
  facultService = inject(FacultService);
  alertService = inject(AlertService);

  ngOnInit() {
    this.getFaculties();
  }

  getFaculties(){
    this.facultService.getAll().subscribe({
      next: (faculties: Facult[]) => {
        this.faculties = faculties;
      },
      error: (error: any) => {
        console.error('Error fetching faculties:', error);
        this.alertService.toast('Error al consultar las facultades', 'error');
      }
    });
  }

  createFacult(){
    this.router.navigateByUrl('/faculties/create');
  }

  tableEvents({ id, action }: TableFacultiesEvents){
    switch(action){
      case 'detail':
        this.viewDetail(id);
        break;
      case 'edit':
        this.update(id);
        break;
      case 'delete':
        this.delete(id);
        break;
    }
  }

  viewDetail(id: number){
    this.router.navigateByUrl(`/faculties/detail/${id}`);
  }

  update(id: number){
    this.router.navigateByUrl(`/faculties/update/${id}`);
  }

  async delete(id: number){
    const title = '¿Esta seguro?';
    const text = `Se va eliminar la facultad ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if(confirm){
      this.facultService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Eliminación Exitosa', 'success');
          this.getFaculties();
        },
        error: () => {
          this.alertService.toast('Error al eliminar la facultad', 'error');
        }
      });
    }

  }

}

