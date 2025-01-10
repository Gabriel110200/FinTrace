import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabelaTransacoesComponent } from './tabelaTransacoes.component';

describe('TabelaTransacoesComponent', () => {
  let component: TabelaTransacoesComponent;
  let fixture: ComponentFixture<TabelaTransacoesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaTransacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaTransacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
