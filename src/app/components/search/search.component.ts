import { Component } from '@angular/core';
import { MangadexApiService } from 'src/app/service/mangadex-api.service';
import { Manga } from 'src/app/models/Manga';
import { MangaInformationService } from 'src/app/service/manga-information.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  mangaList?: Manga[];
  filename?: any;
  searchText: string = '';

  constructor(private mangadex: MangadexApiService, private mangaInformation: MangaInformationService) {
    this.mangaList = [];
  }

  // Call this method when the search button is clicked
  searchManga(): void {
    if (this.searchText.trim() !== '') {
      this.mangadex.searchManga(this.searchText).subscribe((data: any) => { 
        this.loadMangas(data.data);
      });
    }
  }

  setData() {
    this.mangaInformation.setData(this.mangaList);
  }

  loadMangas(data: any): void {
    this.mangaList = []; // Clear existing data before loading new results

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
        cover_art: coverArtFileName,
      });
    }

    console.log(this.mangaList);
  }
}
