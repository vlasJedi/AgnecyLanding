import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: 'about-us', component: HomePageComponent },
    { path: 'portfolio', component: HomePageComponent },
    { path: 'contact', component: HomePageComponent },
    { path: '', component: HomePageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomePageRoutingModule { }