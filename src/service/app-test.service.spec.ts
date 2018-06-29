import { TestBed, inject } from '@angular/core/testing';

import { AppTestService } from './app-test.service';

describe('AppTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppTestService]
    });
  });

  it('should be created', inject([AppTestService], (service: AppTestService) => {
    expect(service).toBeTruthy();
  }));
});
