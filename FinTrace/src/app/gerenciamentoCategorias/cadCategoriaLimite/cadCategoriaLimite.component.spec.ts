/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadCategoriaLimiteComponent } from './cadCategoriaLimite.component';

describe('CadCategoriaLimiteComponent', () => {
  let component: CadCategoriaLimiteComponent;
  let fixture: ComponentFixture<CadCategoriaLimiteComponent>;

  beforeEach(async(() => {
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
