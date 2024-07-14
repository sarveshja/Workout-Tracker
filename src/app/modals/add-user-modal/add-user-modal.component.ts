import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent {
  @Output() close = new EventEmitter<void>();

  username: string = '';
  workoutType: string = 'Cycling';
  workoutMinutes: number | null = null;

  constructor(private localStorageService: LocalStorageService) {}

  closeModal(): void {
    this.close.emit();
  }

  addWorkout(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const newWorkout = {
      id: new Date().getTime(),
      name: this.username,
      workouts: [
        { type: this.workoutType, minutes: this.workoutMinutes }
      ]
    };

    this.localStorageService.addWorkout(newWorkout);
    this.closeModal();
  }
}
