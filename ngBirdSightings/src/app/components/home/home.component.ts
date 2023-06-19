import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Spotting } from 'src/app/models/spotting';
import { SpottingService } from 'src/app/services/spotting.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
spottingList: Spotting[] = [];
newSpotting: Spotting = new Spotting();
selected: Spotting | null = null;
editSpotting: Spotting | null = null;

constructor(private spottingService: SpottingService,     private route: ActivatedRoute,
  private router: Router) {}

ngOnInit():void {
  let idString = this.route.snapshot.paramMap.get('id');
  if (!this.selected && idString) {
    console.log(idString);
    let spottingId: number = Number.parseInt(idString);
    console.log(spottingId);
    if (isNaN(spottingId)) {
      this.router.navigateByUrl('invalidId');
    } else {
      this.spottingService.show(spottingId).subscribe({
        next: (spotting) => {
          this.displaySpotting(spotting);
        },
        error: (oops) => {
          console.error('Error getting spotting');
          console.error(oops);
          this.router.navigateByUrl('spottingNotFound');
        },
      });
    }
  }
  this.loadSpottings();
}

loadSpottings() {
 this.spottingService.index().subscribe({
next: (spottingList) => {
  this.spottingList = spottingList;
},
error:(oops) => {
  console.error('Error getting spotting list');
  console.error(oops);
}
 })
}
addSpotting(spotting: Spotting) {
  this.spottingService.create(spotting).subscribe({
    next: (createdSpotting) => {
      this.newSpotting = new Spotting();
      this.loadSpottings();
    },
    error: (oops) => {
      console.error('SpottingComponent.addSpotting(): error creating spotting');
      console.error(oops);
    },
  });
}
displayTable(): void {
  this.selected = null;
}

setEditSpotting(): void {
  this.editSpotting = Object.assign({}, this.selected);
}
displaySpotting(spotting: Spotting): void {
  this.selected = spotting;
}
updateSpotting(spotting: Spotting, goToDetails: boolean = true): void {
  this.spottingService.update(spotting).subscribe({
    next: (updatedSpotting) => {
      if (goToDetails) {
        this.selected = updatedSpotting;
      }
      this.editSpotting = null;
      this.loadSpottings();
    },
    error: (noJoy) => {
      console.error('TodoListComponent.updateTodo(): error on update');
      console.error(noJoy);
    },
  });
}
deleteSpotting(spottingId: number) {
  this.spottingService.destroy(spottingId).subscribe({
    next: () => {
      this.loadSpottings();
    },
    error: (fail) => {
      console.error('SpottingListComponent.deleteSpotting(): error deleting');
      console.error(fail);
    },
  });
}

}
