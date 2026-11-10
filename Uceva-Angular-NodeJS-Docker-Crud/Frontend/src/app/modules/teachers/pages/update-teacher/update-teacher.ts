import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Back } from '../../../shared/components/back/back';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { TeacherService } from '../../services/teacher.service';
import { Teacher, UpdateTeacherRequest } from '../../interfaces/teacher';

@Component({
  selector: 'app-update-teacher',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-teacher.html',
})
export class UpdateTeacher {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isFinite(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getById(this.id).subscribe({
      next: (teacher: Teacher) => {
        this.setValues(teacher);
      },
      error: (error: any) => {
        console.error('Error fetching teachers:', error);
        this.alertService.toast('Error al consultar el docente', 'error');
        this.goToList();
      }
    })
  }

  setValues(teacher: Teacher): void {
    this.teacherForm.patchValue({
      id: String(teacher.id),
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      address: teacher.address,
      birthdate: this.formatDate(teacher.birthdate),
      role: String(teacher.role),
      status: teacher.status
    });
  }

  private formatDate(value: Date | string): string {
    if (typeof value === 'string') {
      return value.substring(0, 10);
    }
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  updateTeacher(): void {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }
    const formValue = this.teacherForm.getRawValue();
    const teacher: UpdateTeacherRequest = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone!,
      address: formValue.address!,
      birthdate: new Date(formValue.birthdate!),
      role: String(formValue.role),
      status: formValue.status!
    };

    this.teacherService.update(this.id, teacher).subscribe({
      next: () => {
        this.alertService.toast(
          'Docente actualizado correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating teacher:', error);
        this.alertService.toast(
          'Error al actualizar el docente',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('teachers');
  }

}

