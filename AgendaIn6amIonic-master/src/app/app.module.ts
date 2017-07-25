import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactoService } from './services/ContactoService';
import { TareaService } from './services/TareaService';
import { CitaService } from './services/CitaService';
import { AuthService } from './services/AuthService';

import { ContactosPage } from '../pages/contactos/contactos';
import { ContactoFormPage } from '../pages/contactos/contacto-form';
import { TareasPage } from '../pages/tareas/tareas';
import { TareaFormPage } from '../pages/tareas/tarea-form';
import { CitasPage } from '../pages/citas/citas';
import { CitaFormPage } from '../pages/citas/cita-form';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ContactosPage,
    TareasPage,
    CitasPage,
    HomePage,
    TabsPage,
    LoginPage,
    TareaFormPage,
    ContactoFormPage,
    CitaFormPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactosPage,
    TareasPage,
    CitasPage,
    HomePage,
    TabsPage,
    LoginPage,
    ContactoFormPage,
    TareaFormPage,
    CitaFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ContactoService,
    TareaService,
    CitaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
