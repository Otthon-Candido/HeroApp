import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private loading = false;
  public message = 'Carregando';
  constructor() { }

  show(message = 'Carregando') {
    this.message = message;
    this.loading = true;
  }

  hide() {
    this.loading = false;
  }

  toggle() {
    this.loading = !this.loading;
  }

  isVisible() {
    return this.loading;
  }
}
