import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css']
})
export class ChartModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  users: any[] = [];
  selectedUser: any = null;
  multi: any[] = []; // This will hold data for ngx-charts

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.users = this.localStorageService.getUserWorkoutData();
  }

  closeModal(): void {
    this.close.emit();
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.updateChart(); // Update chart data when a user is selected
  }

  updateChart(): void {
    if (this.selectedUser && this.selectedUser.workouts && this.selectedUser.workouts.length > 0) {
      this.multi = this.selectedUser.workouts.map((workout: any) => ({
        name: workout.type,
        value: workout.minutes
      }));
    } else {
      this.multi = []; // Reset chart data if no workouts or no selected user
    }
  }
}
