import { Component, inject } from '@angular/core';
import { Back } from '../../../shared/components/back/back';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Teacher } from '../../interfaces/teacher';

@Component({
  selector: 'app-detail-teacher',
  imports: [
    Back,
    DatePipe,
    CommonModule
  ],
  templateUrl: './detail-teacher.html',
})
export class DetailTeacher {

  teacher: Teacher | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private teacherService = inject(TeacherService);
  private alertService = inject(AlertService);
  

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTeacher(id);
  }

  getTeacher(id: number){
    this.teacherService.getById(id).subscribe({
      next: (teacher) => {
        this.teacher = teacher;
      },
      error: (error: any) => {
        console.error('Error fetching teachers:', error);
        this.alertService.toast('Error al consultar el docente', 'error');
        this.router.navigateByUrl('/teachers');
      }
    })
  }

}



