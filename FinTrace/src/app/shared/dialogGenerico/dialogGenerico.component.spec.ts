
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';


import { DialogGenericoComponent } from './dialogGenerico.component';

describe('DialogGenericoComponent', () => {
  let component: DialogGenericoComponent;
  let fixture: ComponentFixture<DialogGenericoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogGenericoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
