import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './app-gallery.component.html',
  styleUrls: ['./app-gallery.component.css']
})
export class AppGalleryComponent implements OnInit {
  photos = [{
    name: 'Photo 1',
    url: 'assets/images/gallery/project-v1-1.jpg'
  }, {
    name: 'Photo 2',
    url: 'assets/images/gallery/project-v1-2.jpg'
  }, {
    name: 'Photo 3',
    url: 'assets/images/gallery/project-v1-3.jpg'
  }, {
    name: 'Photo 4',
    url: 'assets/images/gallery/project-v1-4.jpg'
  }, {
    name: 'Photo 5',
    url: 'assets/images/gallery/project-v1-5.jpg'
  }, {
    name: 'Photo 6',
    url: 'assets/images/gallery/project-v1-6.jpg'
  }, {
    name: 'Photo 7',
    url: 'assets/images/gallery/project-v1-7.jpg'
  }, {
    name: 'Photo 8',
    url: 'assets/images/gallery/project-v1-8.jpg'
  }]
  constructor() { }

  ngOnInit() {
  }

}
