import { Routes } from '@angular/router';
import { ListStudents } from './modules/students/pages/list-students/list-students';
import { CreateStudent } from './modules/students/pages/create-student/create-student';
import { DetailStudent } from './modules/students/pages/detail-student/detail-student';
import { UpdateStudent } from './modules/students/pages/update-student/update-student';
import { CreateTeacher } from './modules/teachers/pages/create-teacher/create-teacher';
import { ListTeacher } from './modules/teachers/pages/list-teacher/list-teacher';
import { UpdateTeacher } from './modules/teachers/pages/update-teacher/update-teacher';
import { DetailTeacher } from './modules/teachers/pages/detail-teacher/delete-teacher';
import { CreateFacult } from './modules/faculties/pages/create-facult/create-facult';
import { UpdateFacult } from './modules/faculties/pages/update-facult/update-facult';
import { ListFacult } from './modules/faculties/pages/list-facult/list-facult';
import { DetailFacult } from './modules/faculties/pages/detail-facult/detail-facult';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { 
        path: 'students', 
        children: [
            { path: 'list', component: ListStudents },
            { path: 'create', component: CreateStudent },
            { path: 'update/:id', component: UpdateStudent },
            { path: 'detail/:id', component: DetailStudent },
            { path: '**', redirectTo: 'list' }
        ] 
    },

    { 
        path: 'teachers', 
        children: [
            { path: 'list', component: ListTeacher },
            { path: 'create', component: CreateTeacher },
            { path: 'update/:id', component: UpdateTeacher },
            { path: 'detail/:id', component: DetailTeacher },
            { path: '**', redirectTo: 'list' }
        ] 
    },

    { 
        path: 'faculties', 
        children: [
            { path: 'list', component: ListFacult },
            { path: 'create', component: CreateFacult },
            { path: 'update/:id', component: UpdateFacult },
            { path: 'detail/:id', component: DetailFacult },
            { path: '**', redirectTo: 'list' }
        ] 
    }
];
