import { Component } from '@angular/core';

@Component({
  selector: 'ng-dynamic-form-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fields = [
    { name: 'Username', value: 'Shubham' },
    { name: 'Password', value: 'cossth' },
  ];
}
