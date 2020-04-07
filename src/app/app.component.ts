import {Component, ViewEncapsulation} from '@angular/core';
import {routerAnimations} from './animations/routerAnimations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routerAnimations
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-root'
  }
})
export class AppComponent {
  title = 'feathersjsChat';
}

