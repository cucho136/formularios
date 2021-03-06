import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;

  constructor( private fb:FormBuilder,
                private validadores:ValidadoresService) {

    this.crearFormulario();
    this.cargarData();
    this.crearListeners()

   }

  ngOnInit(): void {
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido(){
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  get pasatiempo(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido(){
    const pass1=this.forma.get('pass1').value;
    const pass2=this.forma.get('pass2').value;

    return (pass1===pass2) ? false : true;
  }


  crearFormulario(){
    this.forma=this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(5)]],
      apellido:['',[Validators.required, Validators.minLength(5),this.validadores.noHerrera]],
      correo:['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario:['', , this.validadores.existeUsuario],
      pass1:['',Validators.required],
      pass2:['',Validators.required],
      pasatiempos:this.fb.array([]),
      direccion:this.fb.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required],
      }),
    },{
      validators:this.validadores.passwordIguales('pass1','pass2')
    });


  }

  crearListeners(){
    this.forma.valueChanges.subscribe(valor=>{
      console.log(valor);

    })
    this.forma.statusChanges.subscribe(status => console.log(status))
  }

  cargarData(){
    this.forma.reset({
      nombre: "pedro",
      apellido: "perez",
      correo: "pedro123@gmail.com",
      direccion: {
        distrito: "merida",
        ciudad: "merida"
      }
    })
  }
  agregarPasatiempos(){
    this.pasatiempo.push(this.fb.control(''))
  }

  borrarPasatiempo(i:number){
    this.pasatiempo.removeAt(i);
  }

  guardar(){
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control=>{
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach(control=>control.markAsTouched());
        }else {

        control.markAsTouched();
      }
      });
    }

    this.forma.reset({
      correo:'cucho136@hotmail.com'
    });

  }

}
