
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResumoComponent } from './dashboardResumo.component';

describe('DashboardResumoComponent', () => {
  let component: DashboardResumoComponent;
  let fixture: ComponentFixture<DashboardResumoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardResumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
