import { LocalStorageService } from './localstorage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
    localStorage.clear(); // Clear localStorage before each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserWorkoutData', () => {
    it('should return empty array if no data in localStorage', () => {
      const data = service.getUserWorkoutData();
      expect(data).toEqual([]);
    });

    it('should return stored data from localStorage', () => {
      const mockData = [
        { name: 'Test User', workouts: [{ type: 'Cycling', minutes: 30 }] }
      ];
      localStorage.setItem('userData', JSON.stringify(mockData));

      const data = service.getUserWorkoutData();
      expect(data).toEqual(mockData);
    });
  });

  describe('setUserWorkoutData', () => {
    it('should store data in localStorage', () => {
      const mockData = [
        { name: 'Test User', workouts: [{ type: 'Cycling', minutes: 30 }] }
      ];

      service.setUserWorkoutData(mockData);
      const storedData = JSON.parse(localStorage.getItem('userData') || '[]');
      expect(storedData).toEqual(mockData);
    });
  });

  describe('addWorkout', () => {
    beforeEach(() => {
      const mockData = [
        { name: 'Existing User', workouts: [{ type: 'Cycling', minutes: 30 }] }
      ];
      localStorage.setItem('userData', JSON.stringify(mockData));
    });

    it('should add new workout for a new user', () => {
      const newWorkout = {
        id: 1,
        name: 'New User',
        workouts: [{ type: 'Running', minutes: 20 }]
      };

      service.addWorkout(newWorkout);
      const storedData = JSON.parse(localStorage.getItem('userData') || '[]');
      expect(storedData.length).toBe(2);
      expect(storedData[1].name).toBe('New User');
      expect(storedData[1].workouts.length).toBe(1);
      expect(storedData[1].workouts[0].type).toBe('Running');
    });

    it('should add new workout to existing user', () => {
      const newWorkout = {
        id: 1,
        name: 'Existing User',
        workouts: [{ type: 'Running', minutes: 20 }]
      };

      service.addWorkout(newWorkout);
      const storedData = JSON.parse(localStorage.getItem('userData') || '[]');
      expect(storedData.length).toBe(1);
      expect(storedData[0].workouts.length).toBe(2);
      expect(storedData[0].workouts[1].type).toBe('Running');
    });

    it('should update existing workout for existing user', () => {
      const newWorkout = {
        id: 1,
        name: 'Existing User',
        workouts: [{ type: 'Cycling', minutes: 15 }]
      };

      service.addWorkout(newWorkout);
      const storedData = JSON.parse(localStorage.getItem('userData') || '[]');
      expect(storedData.length).toBe(1);
      expect(storedData[0].workouts.length).toBe(1);
      expect(storedData[0].workouts[0].minutes).toBe(45); // 30 + 15
    });
  });

  describe('getAddUserModalFlag and setAddUserModalFlag', () => {
    it('should get and set addUserModalFlag', () => {
      service.setAddUserModalFlag(true);
      expect(service.getAddUserModalFlag()).toBeTrue();

      service.setAddUserModalFlag(false);
      expect(service.getAddUserModalFlag()).toBeFalse();
    });
  });

  describe('getChartModalFlag and setChartModalFlag', () => {
    it('should get and set chartModalFlag', () => {
      service.setChartModalFlag(true);
      expect(service.getChartModalFlag()).toBeTrue();

      service.setChartModalFlag(false);
      expect(service.getChartModalFlag()).toBeFalse();
    });
  });
});
