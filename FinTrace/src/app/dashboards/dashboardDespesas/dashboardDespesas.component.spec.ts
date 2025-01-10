
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardDespesasComponent } from './dashboardDespesas.component';

describe('DashboardDespesasComponent', () => {
  let component: DashboardDespesasComponent;
  let fixture: ComponentFixture<DashboardDespesasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDespesasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
