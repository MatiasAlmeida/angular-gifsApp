import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const GIPHY_API_KEY: string = '35qK9zfVRyTFVLv0xt6H7nCUdyVfxVOT';

@Injectable({providedIn: 'root'})
export class GifsService {
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

  // public async searchTag( tag: string ): Promise<void> {
  public searchTag( tag: string ): void {
    if ( tag.length === 0) return;
    this.organizeHistory(tag);
    // ejemplo con fetch API, pero vamos a usar HttpClient de la biblioteca de angular
    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${tag}&limit=10`)
    //   .then( response => response.json() )
    //   .then( data => console.log(data));
    // console.log(this._tagsHistory);
    // TODO: save 'api_key' value inside a file that will be excluded from repo
    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', 10)
      .set('q', tag);

    // TODO: hacer commit luego de terminar los videos de peticiones HTTP
    this.http.get(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        console.log(resp);
      });
  }
}
