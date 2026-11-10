import { Component, inject } from '@angular/core';
import { TableTeachers } from '../../components/table-teachers/table-teachers';
import { TableTeachersEvents } from '../../interfaces/table-teachers';
import { Teacher } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-list-teacher',
  imports: [
    Button,
    TableTeachers
  ],
  templateUrl: './list-teacher.html',
})
export class ListTeacher {

  teachers: Teacher[] = [];

  createButtonConfig: ButtonConfig = {
    id: 'create-teacher-button',
    title: 'Create Teacher',
    type: 'primary',
  };

  router = inject(Router);
  teacherService = inject(TeacherService);
  alertService = inject(AlertService);

  ngOnInit() {
    this.getTeachers();
  }

  getTeachers(){
    this.teacherService.getAll().subscribe({
      next: (teachers: Teacher[]) => {
        this.teachers = teachers;
      },
      error: (error: any) => {
        console.error('Error fetching teachers:', error);
        this.alertService.toast('Error al consultar los docentes', 'error');
      }
    });
  }

  createTeacher(){
    this.router.navigateByUrl('/teachers/create');
  }

  tableEvents({ id, action }: TableTeachersEvents){
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
    this.router.navigateByUrl(`/teachers/detail/${id}`);
  }

  update(id: number){
    this.router.navigateByUrl(`/teachers/update/${id}`);
  }

  async delete(id: number){
    const title = '¿Esta seguro?';
    const text = `Se va eliminar el docente ${id}`;
    const confirm = await this.alertService.confirm(title, text);
    if(confirm){
      this.teacherService.delete(id).subscribe({
        next: () => {
          this.alertService.toast('Eliminación Exitosa', 'success');
          this.getTeachers();
        },
        error: () => {
          this.alertService.toast('Error al eliminar el docente', 'error');
        }
      });
    }

  }

}

