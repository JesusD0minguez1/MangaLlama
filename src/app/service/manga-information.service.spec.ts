import { TestBed } from '@angular/core/testing';

import { MangaInformationService } from './manga-information.service';

describe('MangaInformationService', () => {
  let service: MangaInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
