/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MetasService } from './metas.service';

describe('Service: Metas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MetasService]
    });
  });

  it('should ...', inject([MetasService], (service: MetasService) => {
    expect(service).toBeTruthy();
  }));
});
