
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadCategoriaLimiteComponent } from './cadCategoriaLimite.component';

describe('CadCategoriaLimiteComponent', () => {
  let component: CadCategoriaLimiteComponent;
  let fixture: ComponentFixture<CadCategoriaLimiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadCategoriaLimiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadCategoriaLimiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
