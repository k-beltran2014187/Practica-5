import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { CitaService } from '../../app/services/CitaService';
import { CitasPage } from './citas';

@Component({
  selector: 'page-cita-form',
  templateUrl: 'cita-form.html',
})
export class CitaFormPage implements OnInit {
  private parametro:string;
  private titulo:string;

  private cita:any = {
    lugar: "",
    fecha: "",
    idContacto: 0,
    idCita: 0,
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public citaService: CitaService
  ) {

    this.parametro = this.navParams.get('parametro');

    if(this.parametro != "nuevo") {
      this.citaService.getCita(this.parametro)
      .subscribe(res => this.cita = res);
      this.titulo = "Detalle Cita"
    } else {
      this.titulo = "Nuevo Cita";
    }
  }

  ngOnInit() {}

  public guardar() {
   console.log('agrego');
   if(this.parametro != "nuevo"){
     this.citaService.editarCita(this.cita)
     .subscribe(res =>{
       this.toast.create({
         message: res.mensaje,
         duration: 2000
       }).present();
       setTimeout(() => {
         if(res.estado){

         }else{
           this.navCtrl.push(CitasPage);
         }
       },3000);
     });
   }else{
     this.citaService.nuevoCita(this.cita)
     .subscribe(res => {
       this.toast.create({
         message: res.mensaje,
         duration: 2000
       }).present();

      setTimeout(() => {
        if(res.estado) {
          this.navCtrl.push(CitasPage);

        } else {
          this.cita.lugar = "";
          this.cita.fecha = "";
          this.cita.idContacto = 0;
        }
      }, 3000);

    });
  }
}
}
