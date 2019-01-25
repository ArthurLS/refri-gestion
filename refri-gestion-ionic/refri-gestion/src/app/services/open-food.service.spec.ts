import { OpenFoodService } from './open-food.service';
import { TestBed } from '@angular/core/testing';


describe('OpenFoodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenFoodService = TestBed.get(OpenFoodService);
    expect(service).toBeTruthy();
  });
});
