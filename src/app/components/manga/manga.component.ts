import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangadexApiService } from'src/app/service/mangadex-api.service';
import { Manga } from'src/app/models/Manga';
import { MangaInformationService } from 'src/app/service/manga-information.service';
import { Chapters } from 'src/app/models/Chapters';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent {
  id?: string | null;
  manga?: Manga;
  chapters?: Chapters[] = [];

  constructor(private route: ActivatedRoute, private mangadex: MangadexApiService, private mangaInformation: MangaInformationService) { 
    this.chapters = [];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('mangaId');


    let coverArtFileName: string;
  
    
    this.mangadex.getManga(this.id).subscribe(data => {
      
      let coverArtFileName: string | undefined;
  
      for (let info of data.data.relationships) {
        if (info.type === 'cover_art') {
          coverArtFileName = info.attributes.fileName;
          coverArtFileName = this.mangadex.getCoverImage(data.data.id, coverArtFileName);
        }
      }

      this.manga = {
        id: data.data.id,
        title: data.data.attributes.title.en,
        description: data.data.attributes.description.en,
        publicationDemographic: data.data.attributes.publicationDemographic,
        status: data.data.attributes.status,
        year: data.data.attributes.year,
        contentRating: data.data.attributes.contentRating,
        cover_art: coverArtFileName
      }
      console.log(this.manga);
      this.getChapter()
    });
  }


  getChapter() {
    this.mangadex.getChapterFeed(this.manga?.id).subscribe(data => {
      for (let chapter of data.data) {
        this.chapters?.push({
          chapterId: chapter.id,
          volume: chapter.attributes.volume,
          chapter: chapter.attributes.chapter,
          title: chapter.attributes.title,
          pages: chapter.attributes.pages,
        });
      }
      console.log(this.chapters);
    });
  }

}
