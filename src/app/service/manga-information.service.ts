import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaInformationService {
  private mangaSubject = new BehaviorSubject<any>({});
  public data = this.mangaSubject.asObservable();
  constructor() { }

  setData(data: any) {
    this.mangaSubject.next(data);
  }
}