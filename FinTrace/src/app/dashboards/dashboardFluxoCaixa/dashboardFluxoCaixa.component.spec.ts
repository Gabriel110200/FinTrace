import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardFluxoCaixaComponent } from './dashboardFluxoCaixa.component';

describe('DashboardFluxoCaixaComponent', () => {
  let component: DashboardFluxoCaixaComponent;
  let fixture: ComponentFixture<DashboardFluxoCaixaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFluxoCaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFluxoCaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
