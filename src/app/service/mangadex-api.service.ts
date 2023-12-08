import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MangadexApiService {
  key = "";
  secret_key = "";
  baseUrl = "https://api.mangadex.org/";
  imageBaseUrl = "https://uploads.mangadex.org/covers/";
  limitParams = "limit=50&offset=0";
  dataTypeParams = "includes[]=author&includes[]=artist&includes[]=cover_art";
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer'+ this.key
  });


  constructor(private http: HttpClient) { }

  searchManga(title: string) {
    return this.http.get(this.baseUrl + "manga?limit=10&offset=0&title=" + title + "&" + this.dataTypeParams, { headers: this.headers });
  }
  
  getMangaList() {
    return this.http.get<any>(this.baseUrl + "/manga?" + this.limitParams + "&" + this.dataTypeParams, { headers: this.headers });
  }

  getManga(mangaId: string | null) {
    return this.http.get<any>(this.baseUrl + "/manga/" + mangaId + "?" + this.dataTypeParams, { headers: this.headers }); 
  }

  getCoverImage(mangaId: string, coverId: string | undefined) : string {
    let url = this.imageBaseUrl + mangaId + "/" + coverId
    return url;
  } 

  getChapterImages(chapterId: string | null) {
    return this.http.get<any>(this.baseUrl + "at-home/server/" + chapterId, { headers: this.headers });
  }

  getPage(hash: string, chapterData: string) {
    let url = "https://uploads.mangadex.org/data/" + hash + "/" + chapterData;
    return url;
  }

  getChapterFeed(mangaId: string | undefined) {
    return this.http.get<any>(this.baseUrl + "manga/" + mangaId + "/feed?translatedLanguage[]=en", { headers: this.headers });
  }
}
