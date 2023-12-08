import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MangaComponent } from './components/manga/manga.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:title', component: SearchComponent },
  { path: 'manga/:mangaId', component: MangaComponent },
  { path: 'manga/:mangaId/chapter/:chapterId', component: ChapterComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
