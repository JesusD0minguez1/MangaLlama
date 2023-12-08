import { Component } from '@angular/core';
import { Chapter } from 'src/app/models/Chapter';
import { ActivatedRoute } from '@angular/router';
import { MangadexApiService } from 'src/app/service/mangadex-api.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent {

  id?: string | null;
  page = 0;
  chapterData?: any[];
  chapter?: Chapter;

  constructor(private route: ActivatedRoute, private mangadex: MangadexApiService) {
    this.chapterData = [];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('chapterId');
    this.mangadex.getChapterImages(this.id).subscribe(data => {
      console.log(data.chapter);

      for (let item of data.chapter.data) {
        console.log(item);
        if (this.chapterData) {
          this.chapterData.push(this.mangadex.getPage(data.chapter.hash, item));
        }
      }

      if (this.chapterData) {
        this.chapter = {
          hash: data.chapter.hash,
          data: this.chapterData
        };
      }
      console.log(this.chapter);
    });
  }

  nextPage() {
    if (this.chapterData && this.page < this.chapterData.length - 1) {
      this.page++;
    }
  }

  previousPage() {
    if (this.chapterData && this.page > 0) {
      this.page--;
    }
  }
}

