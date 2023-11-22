import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  body = 'body';
  title = 'title';

  constructor(private snotifyService: SnotifyService) { }

  onPrompt() {
    this.snotifyService
      .prompt(this.body, this.title, {
        buttons: [
          {
            text: 'Yes',
            action: toast => console.log('Said Yes: ' + toast.value)
          },
          {
            text: 'No',
            action: toast => {
              console.log('Said No: ' + toast.value);
              this.snotifyService.remove(toast.id);
            }
          }
        ],
        placeholder: 'Enter "ng-snotify" to validate this input' // Max-length = 40
      })
      .on('input', toast => {
        toast.valid = !!toast.value.match('ng-snotify');
      });
  }

  onConfirmation() {
    this.snotifyService.confirm(this.body, this.title, {
      buttons: [
        { text: 'Yes', action: () => console.log('Clicked: Yes'), bold: false },
        { text: 'No', action: () => console.log('Clicked: No') },
        {
          text: 'Later',
          action: toast => {
            console.log('Clicked: Later');
            this.snotifyService.remove(toast.id);
          }
        },
        {
          text: 'Close',
          action: toast => {
            console.log('Clicked: Close');
            this.snotifyService.remove(toast.id);
          },
          bold: true
        }
      ]
    });
  }

  Clear() {
    this.snotifyService.clear();
  }

  Error(title: any, body: any) {
    this.snotifyService.error(title, body, {
      timeout: 5000
    });
  }

  Success(title: any, body: any) {
    this.snotifyService.success(title, body, {
      timeout: 1000
    });
  }

  Warning(title: any, body: any) {
    this.snotifyService.warning(title, body, {
      timeout: 2000
    });
  }

  Info(title: any, body: any) {
    this.snotifyService.info(title, body, {
      timeout: 2000
    });
  }
}
