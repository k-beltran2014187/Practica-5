import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TareaService } from '../../app/services/TareaService';
import { TareasPage } from './tareas';

@Component({
  selector: 'page-tarea-form',
  templateUrl: 'tarea-form.html',
})
export class TareaFormPage implements OnInit {
  private parametro:string;
  private titulo:string;

  private tarea:any = {
    titulo: "",
    descripcion: "",
    fechaInicial: "",
    fechaFinal: "",
    estado: "",
    idTarea: 0
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastController,
    public tareaService: TareaService
  ) {

    this.parametro = this.navParams.get('parametro');

    if(this.parametro != "nuevo") {
      this.tareaService.getTarea(this.parametro)
      .subscribe(res => this.tarea = res);
      this.titulo = "Detalle Tarea"
    } else {
      this.titulo = "Nuevo Tarea";
    }
  }

  ngOnInit() {}

  public guardar() {
   console.log('agrego');
   if(this.parametro != "nuevo"){
     this.tareaService.editarTarea(this.tarea)
     .subscribe(res =>{
       this.toast.create({
         message: res.mensaje,
         duration: 2000
       }).present();
       setTimeout(() => {
         if(res.estado){

         }else{
           this.navCtrl.push(TareasPage);
         }
       },3000);
     });
   }else{
     this.tareaService.nuevoTarea(this.tarea)
     .subscribe(res => {
       this.toast.create({
         message: res.mensaje,
         duration: 2000
       }).present();

      setTimeout(() => {
        if(res.estado) {
          this.navCtrl.push(TareasPage);

        } else {
          this.tarea.titulo = "";
          this.tarea.descripcion = "";
          this.tarea.fechaInicial = "";
          this.tarea.fechaFinal = "";
          this.tarea.estado = "";
        }
      }, 3000);

    });
  }
}
}
