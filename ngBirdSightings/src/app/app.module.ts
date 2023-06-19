import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { SpeciesComponent } from './components/species/species.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { LocationsComponent } from './components/locations/locations.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpeciesComponent,
    ResourcesComponent,
    LocationsComponent,
    NavigationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
