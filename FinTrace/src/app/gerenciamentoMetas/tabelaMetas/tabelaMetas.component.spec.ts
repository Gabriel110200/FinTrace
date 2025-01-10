import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaMetasComponent } from './tabelaMetas.component';

describe('TabelaMetasComponent', () => {
  let component: TabelaMetasComponent;
  let fixture: ComponentFixture<TabelaMetasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaMetasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaMetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
