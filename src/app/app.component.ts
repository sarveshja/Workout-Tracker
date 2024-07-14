import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showAddUserModalFlag: boolean = false;
  showChartModalFlag: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const initialUserData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 }
        ]
      }
      // Add more users as needed
    ];

    const storedUserData = this.localStorageService.getUserWorkoutData();
    if (!storedUserData || storedUserData.length === 0) {
      this.localStorageService.setUserWorkoutData(initialUserData);
    }
  }

  showAddUserModal(): void {
    this.showAddUserModalFlag = true;
  }

  showChartModal(): void {
    this.showChartModalFlag = true;
  }

  closeAddUserModal(): void {
    this.showAddUserModalFlag = false;
  }

  closeChartModal(): void {
    this.showChartModalFlag = false;
  }
}
