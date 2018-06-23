import { TestBed, inject } from '@angular/core/testing';

import { Services\customer.ServiceService } from './services\customer.service.service';

describe('Services\customer.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\customer.ServiceService]
    });
  });

  it('should be created', inject([Services\customer.ServiceService], (service: Services\customer.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
