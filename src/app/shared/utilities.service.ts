import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  scroll(el: ElementRef) {

    setTimeout( () => {
      el.nativeElement.scrollTop = el.nativeElement.scrollHeight;
    }), 0
  }
  constructor() { }
}
