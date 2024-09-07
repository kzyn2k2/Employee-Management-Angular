import { Component } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TrainingAssignment';
  open: boolean;
  export: boolean

  constructor(private message: MessageService) {

  }

  expand(event: boolean) {

    this.open = event

  }


}
