import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localstorage.service';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  paginatedUsers: User[] = [];
  searchTerm: string = '';
  workoutTypes: string[] = [];
  selectedWorkoutType: string = 'all'; // Default to 'all'
  rowsPerPage: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  rowsPerPageOptions: number[] = [5, 10, 20]; // Dropdown options for rows per page

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.fetchWorkoutTypes();
  }

  loadUserData(): void {
    this.users = this.localStorageService.getUserWorkoutData() || [];
    this.applyFilters();
  }

  fetchWorkoutTypes(): void {
    // Collect all unique workout types
    const allWorkoutTypes = this.users.flatMap((user: User) =>
      user.workouts.map((workout: Workout) => workout.type)
    );
    this.workoutTypes = [...new Set(allWorkoutTypes)];
  }

  applyFilters(): void {
    // Apply both search term and workout type filters
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (this.selectedWorkoutType === 'all' ||
          user.workouts.some(
            (workout: Workout) => workout.type === this.selectedWorkoutType
          ))
    );

    this.updatePagination();
  }

  updatePagination(): void {
    // Calculate pagination logic
    this.totalPages = Math.ceil(this.filteredUsers.length / this.rowsPerPage);
    this.currentPage = 1; // Reset to first page
    this.paginateUsers();
  }

  paginateUsers(): void {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(
      startIndex,
      startIndex + this.rowsPerPage
    );
  }

  calculateTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onWorkoutTypeChange(): void {
    this.applyFilters();
  }

  changeRowsPerPage(): void {
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateUsers();
    }
  }
}
