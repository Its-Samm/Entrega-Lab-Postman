import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { Back } from '../../../shared/components/back/back';
import { FacultService } from '../../services/facult.service';
import { CreateFacultRequest } from '../../interfaces/facult';

@Component({
  selector: 'app-create-facult',
  imports: [
    Back,
    ReactiveFormsModule
  ],
  templateUrl: './create-facult.html',

})
export class CreateFacult {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private facultService = inject(FacultService);

  facultForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', Validators.required],
    description: ['', Validators.required],
    status: [true]
  });

  createFacult(): void {
    if (this.facultForm.invalid) {
      this.facultForm.markAllAsTouched();
      return;
    }
    const facult: CreateFacultRequest = {
      id: Number(this.facultForm.value.id),
      name: this.facultForm.value.name!,
      description: this.facultForm.value.description!,
      status: this.facultForm.value.status!
    };
    console.log('Facult para enviar al backend:', facult);
    this.facultService.create(facult).subscribe({
      next: () => {
        this.alertService.toast(
          'facultad registrada correctamente',
          'success'
        );
        this.router.navigateByUrl('/faculties');
      },
      error: () => {
        this.alertService.toast('Error al crear la facultad', 'error');
      }
    })

  }
  
}



