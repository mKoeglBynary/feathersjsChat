import {Component, ViewEncapsulation} from '@angular/core';
import {pageTransitionAnimation} from './animations/page-transition.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    pageTransitionAnimation
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  title = 'feathersjsChat';
}

