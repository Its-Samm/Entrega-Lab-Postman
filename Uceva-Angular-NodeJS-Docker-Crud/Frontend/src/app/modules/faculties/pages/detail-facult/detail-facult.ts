import { Component, inject } from '@angular/core';
import { Facult } from '../../interfaces/facult';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultService } from '../../services/facult.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Back } from '../../../shared/components/back/back';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-facult',
  imports: [
    Back,
    CommonModule
  ],
  templateUrl: './detail-facult.html',
})
export class DetailFacult {

  facult: Facult | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private facultService = inject(FacultService);
  private alertService = inject(AlertService);

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getFacult(id);
  }

  getFacult(id: number){
    this.facultService.getById(id).subscribe({
      next: (facult) => {
        this.facult = facult;
      },
      error: (error: any) => {
        console.error('Error fetching faculties:', error);
        this.alertService.toast('Error al consultar la facultad', 'error');
        this.router.navigateByUrl('/faculties');
      }
    })
  }

}


