import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY: string = '35qK9zfVRyTFVLv0xt6H7nCUdyVfxVOT';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  // public async searchTag( tag: string ): Promise<void> { // con fetch
  public searchTag( tag: string ): void {
    if ( tag.length === 0) return;
    this.organizeHistory(tag);
    // ejemplo con fetch API, pero vamos a usar HttpClient de la biblioteca de angular
    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${tag}&limit=10`)
    //   .then( response => response.json() )
    //   .then( data => console.log(data));
    // console.log(this._tagsHistory);
    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', 10)
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
      });
  }
}
