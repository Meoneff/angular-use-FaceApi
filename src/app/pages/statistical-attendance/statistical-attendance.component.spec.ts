import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalAttendanceComponent } from './statistical-attendance.component';

describe('StatisticalAttendanceComponent', () => {
  let component: StatisticalAttendanceComponent;
  let fixture: ComponentFixture<StatisticalAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalAttendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
