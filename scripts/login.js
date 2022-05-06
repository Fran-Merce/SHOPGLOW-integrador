
import { defaultAlert } from './alerts.js';
const inputPassword=document.querySelector('[name="password"]');
const inputEmail=document.querySelector('[name="email"]');
const userData = JSON.parse(localStorage.getItem("userData"));
const inputsObj={
  email:false,
  password:false,
}
const errormessages={
  email:'Email incorrecto',
  password:'contraseña incorrecta',
  void:'el campo no puede estar vacio',
}


const passwordValidate=(inputPassword)=>{

  const inputValue= inputPassword.value
  if(inputValue.replace(/ /g, "").length === 0){
    inputPassword.nextElementSibling.innerHTML=errormessages['void']
    inputsObj.password=false
  }
  else{
    if(inputValue !== userData.password ){
      inputPassword.nextElementSibling.innerHTML=errormessages['password']
      inputsObj.password=false
    }else{
      inputPassword.nextElementSibling.classList.remove("auth__input--error-text-active");
      inputsObj.password=true
    }
    
  }
}
const emailValidate=(inputEmail)=>{

  const inputValue= inputEmail.value
  if(inputValue.replace(/ /g, "").length === 0) {
    inputEmail.nextElementSibling.innerHTML=errormessages['void']
    inputsObj.email=false
  }
  else{
    if(inputValue.toLowerCase() !== userData.email ){
      inputEmail.nextElementSibling.innerHTML=errormessages['email']
      inputsObj.email=false
    }else{
      inputEmail.nextElementSibling.classList.remove("auth__input--error-text-active");
      inputsObj.email=true
    }
  }
}

const submitBtnLogin=document.querySelector('#submitBtnLogin');
submitBtnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if(!userData){
    Swal.fire(defaultAlert( 'No hay usuario registrado','por favor registrese y luego inice sesion','swal-custom-class','warning'));
    inputPassword.nextElementSibling.classList.remove("auth__input--error-text-active");
    inputEmail.nextElementSibling.classList.remove("auth__input--error-text-active");
    document.querySelector('[name="password"]').value=""
    document.querySelector('[name="email"]').value=""
  }
  else{
    passwordValidate(inputPassword);
    emailValidate(inputEmail);
  }


  if(Object.values(inputsObj).every(e=>e===true)){
    Swal.fire(defaultAlert(`Bienvenido ${userData.username}` ,"Redireccionado a la pagina principal","swal-custom-class",""))
    localStorage.setItem("isLogged", "true");
    setTimeout(() => window.location='/index.html', 2000);
  }
  
})


