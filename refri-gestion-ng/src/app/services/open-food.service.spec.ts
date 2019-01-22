import { TestBed } from '@angular/core/testing';

import { OpenFoodService } from './open-food.service';

describe('OpenFoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenFoodService = TestBed.get(OpenFoodService);
    expect(service).toBeTruthy();
  });
});
