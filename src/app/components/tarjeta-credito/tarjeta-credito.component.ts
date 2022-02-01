import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [];
  accion = "Agregar"
  id:number | undefined;
  form: FormGroup;
  

  constructor(private fb:FormBuilder, private toastr: ToastrService,
    private _tarjetaService : TarjetaService) { 
    this.form=this.fb.group({
      titular: ['',Validators.required],
      numeroTarjeta: ['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data=> {console.log(data)
      this.listTarjetas = data;}, error=> {console.log(error)})

  }

 guardarTarjeta(){
    const tarjeta: any ={
    titular:this.form.get('titular')?.value, 
    numeroTarjeta:this.form.get('numeroTarjeta')?.value, 
    fechaExpiracion:this.form.get('fechaExpiracion')?.value, 
    cvv:Number(this.form.get('cvv')?.value)}

    if(this.id==undefined){
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data=>
        {this.toastr.success('Tarjeta ingresada con éxito', '');
        this.obtenerTarjetas();
        this.form.reset()},  
        error=> {
          this.toastr.error("Algo ha salido mal","Oops...");
          console.log(error)
          console.log(tarjeta)}
      )
    }
    else{
      tarjeta.id=this.id
      this._tarjetaService.updateTarjeta(this.id,tarjeta).subscribe(data=>
        {
        this.form.reset()
        this.toastr.info('Tarjeta actualizada con éxito', '');
        this.obtenerTarjetas();
        this.accion="Agregar"
        this.id=undefined},  
        error=> {
          this.toastr.error("Algo ha salido mal","Oops...");
          console.log(error)
          console.log(tarjeta)}
      )
    }

   
    
  }

  eliminarTarjeta(index:number){
    this._tarjetaService.deleteTarjeta(index).subscribe(data=>
      {this.toastr.error("Tarjeta eliminada con éxito"," ");
      this.obtenerTarjetas()},  error=> {console.log(error)}
    )

  }

  editarTarjeta(tarjeta:any){
    this.accion="Editar";
    this.id=tarjeta.id;
    this.form.patchValue({
      titular:tarjeta.titular,
      numeroTarjeta:tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv:tarjeta.cvv
    })
  }
}
