import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingComponent } from './loading/loading.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarModule } from './utils/sideBar/sideBar.component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LoadingService } from './services/loading/loading.service';


const ngxLoading = {
  animationType: ngxLoadingAnimationTypes.threeBounce,
  backdropBackgroundColour: 'rgba(0,0,0,0.4)',
  backdropBorderRadius: '3px',
  primaryColour: '#1c1c1e',
  secondaryColour: '#35363a',
  tertiaryColour: '#4b4c4d'
};

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    SnotifyModule,
    NgxLoadingModule.forRoot(ngxLoading),
    SideBarModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [    
    LoadingService,
  { provide: 'SnotifyToastConfig', useValue: ToastDefaults },SnotifyService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
