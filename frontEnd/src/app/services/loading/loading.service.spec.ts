import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show the loading indicator', () => {
    service.show();
    expect(service.isVisible()).toBe(true);
  });

  it('should show the loading indicator with custom message', () => {
    const message = 'Loading data';
    service.show(message);
    expect(service.isVisible()).toBe(true);
    expect(service.message).toBe(message);
  });

  it('should hide the loading indicator', () => {
    service.show();
    service.hide();
    expect(service.isVisible()).toBe(false);
  });

  it('should toggle the loading indicator', () => {
    service.toggle();
    expect(service.isVisible()).toBe(true);
    service.toggle();
    expect(service.isVisible()).toBe(false);
  });
});
