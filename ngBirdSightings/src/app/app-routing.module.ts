import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { SpeciesComponent } from './components/species/species.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'home' },
{ path: 'home', component: HomeComponent },
{ path: 'locations', component: LocationsComponent },
{ path: 'resources', component: ResourcesComponent },
{ path: 'species', component: SpeciesComponent },
{ path: 'home/:id', component: HomeComponent },
{ path: '**', component: NotFoundComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
