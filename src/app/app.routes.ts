import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list-component/user-list-component';
import { MovieList } from './components/movie/movie-list/movie-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full',
    }, 

    {
        path: 'users',
        component: UserListComponent
    },

    {
        path: 'movies',
        component: MovieList
    }
];
