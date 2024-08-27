import { Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';

export const routes: Routes = [
    { path: '', redirectTo: '/main-screen',pathMatch:'full' },    
    { path: 'main-screen', component:MainScreenComponent }
];