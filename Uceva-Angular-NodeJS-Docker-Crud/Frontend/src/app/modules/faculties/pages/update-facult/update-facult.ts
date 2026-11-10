import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Back } from '../../../shared/components/back/back';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { FacultService } from '../../services/facult.service';
import { Facult, UpdateFacultRequest } from '../../interfaces/facult';

@Component({
  selector: 'app-update-facult',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './update-facult.html',
})
export class UpdateFacult {

  id!: number;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private alertService = inject(AlertService);
  private facultService = inject(FacultService);

  semesters = Array.from({ length: 10 }, (_, i) => i + 1);

  facultForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', Validators.required],
    description: ['', Validators.required],
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
    this.getFacult();
  }

  getFacult() {
    this.facultService.getById(this.id).subscribe({
      next: (facult) => {
        this.setValues(facult);
      },
      error: (error: any) => {
        console.error('Error fetching faculties:', error);
        this.alertService.toast('Error al consultar la facultad', 'error');
        this.goToList();
      }
    })
  }

  setValues(facult: Facult): void {
    this.facultForm.patchValue({
      id: String(facult.id),
      name: facult.name,
      description: facult.description,
      status: facult.status
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


  updateFacult(): void {
    if (this.facultForm.invalid) {
      this.facultForm.markAllAsTouched();
      return;
    }
    const formValue = this.facultForm.getRawValue();
    const facult: UpdateFacultRequest = {
      name: formValue.name!,
      description: formValue.description!,
      status: formValue.status!
    };

    this.facultService.update(this.id, facult).subscribe({
      next: () => {
        this.alertService.toast(
          'Facultad actualizada correctamente',
          'success'
        );
        this.goToList();
      },
      error: (error: any) => {
        console.error('Error updating faculty :', error);
        this.alertService.toast(
          'Error al actualizar la facultad',
          'error'
        );
      }
    });
  }

  goToList() {
    this.router.navigateByUrl('faculties');
  }

}
