
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcluirComponent } from './dialogExcluir.component';

describe('DialogExcluirComponent', () => {
  let component: DialogExcluirComponent;
  let fixture: ComponentFixture<DialogExcluirComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
