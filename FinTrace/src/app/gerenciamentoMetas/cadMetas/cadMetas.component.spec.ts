import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CadMetasComponent } from './cadMetas.component';

describe('CadMetasComponent', () => {
  let component: CadMetasComponent;
  let fixture: ComponentFixture<CadMetasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadMetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
