import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PrimitiveControlsComponent } from './primitive-controls/primitive-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimitiveControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
