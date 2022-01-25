import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas: any[] = [
    {titulo: 'Juan Perez', numeroTarjeta:'45786175',fechaExpiracion: '11/23',cvv:'123'},
    {titulo: 'Miguel Lopez', numeroTarjeta:'54568544',fechaExpiracion: '04/23',cvv:'456'}
  ];

  form: FormGroup;
  

  constructor(private fb:FormBuilder, private toastr: ToastrService) { 
    this.form=this.fb.group({
      titular: ['',Validators.required],
      numeroTarjeta: ['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion: ['',[Validators.required, Validators.maxLength(5),Validators.minLength(5)]],
      cvv: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  agregarTarjeta(){
    const tarjeta: any ={
    titulo:this.form.get('titular')?.value, 
    numeroTarjeta:this.form.get('numeroTarjeta')?.value, 
    fechaExpiracion:this.form.get('fechaExpiracion')?.value, 
    cvv:this.form.get('cvv')?.value}
    this.listTarjetas.push(tarjeta)
    this.toastr.success('Tarjeta ingresada con éxito', '');
    this.form.reset
  }

  eliminarTarjeta(index:number){
    this.listTarjetas.splice(index,1)
    this.toastr.error('Tarjeta eliminada con éxito', '');
  }
}
