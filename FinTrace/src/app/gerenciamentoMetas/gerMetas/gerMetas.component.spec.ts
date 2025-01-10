/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GerMetasComponent } from './gerMetas.component';

describe('GerMetasComponent', () => {
  let component: GerMetasComponent;
  let fixture: ComponentFixture<GerMetasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerMetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
