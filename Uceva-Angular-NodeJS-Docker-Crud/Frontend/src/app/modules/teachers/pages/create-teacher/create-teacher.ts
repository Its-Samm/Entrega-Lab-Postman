import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Back } from '../../../shared/components/back/back';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateTeacherRequest } from '../../interfaces/teacher';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-teacher.html',
})
export class CreateTeacher {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private teacherService = inject(TeacherService);


  teacherForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    birthdate: ['', Validators.required],
    role: ['', Validators.required],
    status: [true]
  });

  createTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const teacher: CreateTeacherRequest = {
      id: Number(this.teacherForm.value.id),
      name: this.teacherForm.value.name!,
      email: this.teacherForm.value.email!,
      phone: this.teacherForm.value.phone!,
      address: this.teacherForm.value.address!,
      birthdate: new Date(this.teacherForm.value.birthdate!),
      role: this.teacherForm.value.role!,
      status: this.teacherForm.value.status!
    };
    console.log('Docente para enviar al backend:', teacher);
    this.teacherService.create(teacher).subscribe({
      next: () => {
        this.alertService.toast(
          'Docente registrado correctamente',
          'success'
        );
        this.router.navigateByUrl('/teachers');
      },
      error: () => {
        this.alertService.toast('Error al crear el docente', 'error');
      }
    })

  }
  
}

