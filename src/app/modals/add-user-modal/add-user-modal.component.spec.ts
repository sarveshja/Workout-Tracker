import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { AddUserModalComponent } from './add-user-modal.component';
import { LocalStorageService } from '../../services/localstorage.service';

describe('AddUserModalComponent', () => {
  let component: AddUserModalComponent;
  let fixture: ComponentFixture<AddUserModalComponent>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['addWorkout']);

    await TestBed.configureTestingModule({
      declarations: [ AddUserModalComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: LocalStorageService, useValue: localStorageSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserModalComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when closeModal() is called', () => {
    spyOn(component.close, 'emit');

    component.closeModal();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should add a workout and close the modal', () => {
    const form: NgForm = <NgForm>{
      invalid: false,
      value: {
        username: 'TestUser',
        workoutType: 'Cycling',
        workoutMinutes: 30
      }
    };
    component.username = 'TestUser';
    component.workoutType = 'Cycling';
    component.workoutMinutes = 30;

    spyOn(component, 'closeModal');
    component.addWorkout(form);

    expect(localStorageService.addWorkout).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should not add a workout if form is invalid', () => {
    const form: NgForm = <NgForm>{ invalid: true };

    spyOn(component, 'closeModal');
    component.addWorkout(form);

    expect(localStorageService.addWorkout).not.toHaveBeenCalled();
    expect(component.closeModal).not.toHaveBeenCalled();
  });

  
});
