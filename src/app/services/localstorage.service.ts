import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private addUserModalFlag: boolean = false;
  private chartModalFlag: boolean = false;

  getUserWorkoutData(): any[] {
    return JSON.parse(localStorage.getItem('userData') || '[]');
  }

  setUserWorkoutData(data: any[]): void {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  addWorkout(newWorkout: any): void {
    const currentData = this.getUserWorkoutData();
    const existingUser = currentData.find(user => user.name.toLowerCase() === newWorkout.name.toLowerCase());

    if (existingUser) {
      newWorkout.workouts.forEach((newWorkoutItem: any) => {
        const existingWorkout = existingUser.workouts.find(
          (workout: any) => workout.type.toLowerCase() === newWorkoutItem.type.toLowerCase()
        );
        
        if (existingWorkout) {
          existingWorkout.minutes += newWorkoutItem.minutes;
        } else {
          existingUser.workouts.push(newWorkoutItem);
        }
      });
    } else {
      currentData.push(newWorkout);
    }

    this.setUserWorkoutData(currentData);
    window.location.reload();
  }

  getAddUserModalFlag(): boolean {
    return this.addUserModalFlag;
  }

  setAddUserModalFlag(flag: boolean): void {
    this.addUserModalFlag = flag;
  }

  getChartModalFlag(): boolean {
    return this.chartModalFlag;
  }

  setChartModalFlag(flag: boolean): void {
    this.chartModalFlag = flag;
  }
}
