import { Component } from '@angular/core';
import { MangadexApiService } from 'src/app/service/mangadex-api.service';
import { Manga } from 'src/app/models/Manga';
import { MangaInformationService } from'src/app/service/manga-information.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mangaList?: Manga[];
  filename?: any;
  constructor(private mangadex: MangadexApiService, private mangaInformation: MangaInformationService) {
    this.mangaList = [];
  }

  ngOnInit(): void {
    this.mangadex.getMangaList().subscribe((data: any) => { 
      this.loadMangas(data.data);
    });
  }

  setData() {
    this.mangaInformation.setData(this.mangaList);
  }
  loadMangas(data: any): void {
    for (const manga of data) {
      let coverArtFileName: string | undefined;
  
      for (const info of manga.relationships) {
        if (info.type === 'cover_art') {
          coverArtFileName = info.attributes.fileName;
          coverArtFileName = this.mangadex.getCoverImage(manga.id, coverArtFileName);
          break;
        }
      }
  
      this.mangaList?.push({
        id: manga.id,
        title: manga.attributes.title.en,
        description: manga.attributes.description.en,
        publicationDemographic: manga.attributes.publicationDemographic,
        status: manga.attributes.status,
        year: manga.attributes.year,
        contentRating: manga.attributes.contentRating,
        cover_art: coverArtFileName, // Add the coverArtFileName property
      });
    }
  
    console.log(this.mangaList);
  }

}
