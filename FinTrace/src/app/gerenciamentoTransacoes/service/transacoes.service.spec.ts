/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransacoesService } from './transacoes.service';

describe('Service: Transacoes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransacoesService]
    });
  });

  it('should ...', inject([TransacoesService], (service: TransacoesService) => {
    expect(service).toBeTruthy();
  }));
});
