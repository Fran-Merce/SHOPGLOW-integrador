
import { inputError,inputSuccess } from "./auth.js";
const submitButton = document.getElementById("submitBtn");
const regexObj = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
  username: /^[a-zA-Z0-9]{2,16}$/,
  password: /^(?=.*\d)(?=.*[a-z]).{4,}$/,
  password2: /^(?=.*\d)(?=.*[a-z]).{4,}$/,
};

const validateObj={
  email:false,
  username:false,
  password:false,
  password2:false
}
const dataUser={
  username:"",
  password: "",
  email:""
}
const errormessages={
  email:"Ingresa un correo valido",
  username:"El nombre de usuario debe tener entre 2 y 16 caracteres",
  password:"La contraseña debe tener al menos 4 caracteres y contener al menos un número y una letra",
  password2:"Las contraseñas no coinciden",
  void:"El campo no puede estar vacio",
  emailRegistered:"El correo ya esta registrado"
}

const validate = ({target:input}) => {
    const inputType =input.name
    const inputValue = input.value.replace(/ /g, "");

    if(inputValue <= 1){
      inputError(input,errormessages['void'])
      validateObj[inputType]=false
    }else{
      
      if(regexObj[inputType].test(inputValue) === false){
        inputError(input,errormessages[inputType])
        validateObj[inputType]=false
      }
      else if(inputType === 'password2' && inputValue !== document.querySelector('[name="password"]').value){
        inputError(input,errormessages[inputType])
        validateObj[inputType]=false
      }
      else if  (inputType === 'email'){
        validateEmailStorage(input,inputType)
      }
      else{
        inputSuccess(input)
        validateObj[inputType]=true
      }
    if(Object.values(validateObj).every(e=>e===true)){
      submitButton.classList.remove("btn-disabled");
      submitButton.disabled=false;
      dataUser.username=document.querySelector('[name="username"]').value;
      dataUser.password=document.querySelector('[name="password"]').value;
      dataUser.email=document.querySelector('[name="email"]').value.toLowerCase();

    }
  }}

  
  const validateEmailStorage=(input,inputType)=>{
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(userData!==null){
    console.log(input)
    if(input.value === userData.email){
      inputError(input,errormessages['emailRegistered'])
      validateObj.email=false
    }else{
      inputSuccess(input)
      validateObj[inputType]=true
    }
  }else{
    inputSuccess(input)
    validateObj[inputType]=true
  }
  
}
const submit = (e) => {
  e.preventDefault();
  localStorage.setItem("userData", JSON.stringify(dataUser));
  window.location.href='/pages/login.html'
}


submitButton.addEventListener("click", submit);
document.querySelectorAll("input").forEach(input=>{
  input.addEventListener("blur",validate)
})


