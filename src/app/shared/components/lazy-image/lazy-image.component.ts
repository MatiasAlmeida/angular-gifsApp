import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit{
  @Input()
  public url!: string;
  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required.');
  }

  onLoad(): void {
    // console.log('Image loaded');
    // setTimeout(() => {
    //   this.hasLoaded = true;
    // }, 1000); // para probar como se ve la carga del lazy image

    this.hasLoaded = true;
  }
}
