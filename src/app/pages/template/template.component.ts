import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario ={
    nombre:'Jesus',
    apellido:'Herrera',
    correo:'cucho136@hotmail.com',
    pais:'VEN',
    genero:'m'
  }
  paises:any[]=[];


  constructor(private paisservice:PaisService) { }

  ngOnInit(): void {
    this.paisservice.getPaise().subscribe(data=>{
      this.paises=data;
      this.paises.unshift({
        nombre:'Seleccione Pais',
        codigo:''
      })
      console.log(this.paises);


    });
  }

  guardar(forma:NgForm){
    if (forma.invalid){
      Object.values(forma.controls).forEach(control=>{
        control.markAsTouched();
      })
      return;
    }
    console.log(forma.value);

  }

}
