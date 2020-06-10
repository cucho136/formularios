import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
    [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHerrera(control:FormControl):ErrorValidate{
    if (control.value?.toLowerCase()==='herrera') {
      return {
        noHerrera:true
      }
    }
    return null;

  }

  passwordIguales(pass1:string, pass2:string){
    return (formGroup:FormGroup)=>{
      const pass1control=formGroup.controls[pass1];
      const pass2contro2=formGroup.controls[pass2];

      if (pass1control.value ===pass2contro2.value) {
        pass2contro2.setErrors(null);
      }else{

        pass2contro2.setErrors({noEsIgual:true});
      }

    }
  }

  existeUsuario(control:FormControl):Promise<ErrorValidate> | Observable<ErrorValidate>{
    if (!control.value) {
      return Promise.resolve(null);
    }
    return new Promise((resolve,reject)=>
  {
    setTimeout(()=>{

      if (control.value==='striders') {
        resolve({existe:true})
      }else{
        resolve(null)
      }

    },3500)
  })

  }
}
