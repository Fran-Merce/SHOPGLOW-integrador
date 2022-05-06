

export const inputError = (input, message) => {  
  const submitButton = document.getElementById("submitBtn");
  submitButton !== null ? submitButton.classList.add("btn-disabled") : null;
  const inputErrorELem=input.nextElementSibling;
  inputErrorELem.innerHTML=message;
  input.classList.add("input-error--active");
  input.classList.remove("input-success--active");
  inputErrorELem.classList.add("auth__input--error-text-active");
  
};
export const inputSuccess = (input) => {
  const inputErrorELem=input.nextElementSibling;
  input.classList.remove("input-error--active");
  inputErrorELem.classList.remove("auth__input--error-text-active");
  input.classList.add("input-success--active");
}

