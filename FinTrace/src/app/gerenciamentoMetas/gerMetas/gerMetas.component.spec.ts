import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GerMetasComponent } from './gerMetas.component';

describe('GerMetasComponent', () => {
  let component: GerMetasComponent;
  let fixture: ComponentFixture<GerMetasComponent>;

  beforeEach(waitForAsync(() => {
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
