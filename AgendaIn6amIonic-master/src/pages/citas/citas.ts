import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CitaService } from '../../app/services/CitaService';
import { CitaFormPage } from './cita-form';

@Component({
  selector: 'page-citas',
  templateUrl: 'citas.html'
})
export class CitasPage {
  private citas:any[] = [];

  constructor(
    public navCtrl: NavController,
    public citaService: CitaService
  ) {
    this.inicializar();
  }

  private inicializar() {
    this.citaService.getCitas()
    .subscribe(citas => this.citas = citas);
  }

  public verFormulario(parametro:any) {
    this.navCtrl.push(CitaFormPage, { parametro });
  }

  public eliminarCita(idCita: any){
    this.citaService.eliminarCita(idCita).subscribe(res =>{
      this.inicializar();
    })
  }
}
