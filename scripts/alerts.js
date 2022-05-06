import {handleDelete} from "./cart.js"
export const deleteProduct = {
  title: "Esta seguro?",
  text: "de eliminar este producto del carrito",
  icon: "warning",
  iconColor: "red",
  showCancelButton: true,
  confirmButtonColor: "#000",
  cancelButtonColor: "#000",
  confirmButtonText: "Si Quiero Eliminarlo",
  customClass: {
    container: "swal-custom-class",
    title: "swal-custom-class",
    actions: "swal-custom-class",
    confirmButton: "swal-custom-class",
    cancelButton: "swal-custom-class",
  },
};
export const handleDeleteAlert = (e,productIdCart) => {
  Swal.fire(
    deleteProduct
  ).then((result) => {
    if (result.isConfirmed) {
      handleDelete(e);
    
      Swal.fire(defaultAlert('Eliminado!', '', 'swal-custom-class','success'))
    }
  });
};

export const defaultAlert = (title, text, className,icon) => {
  console.log(className)
  return{
    title: title,
    text: text,
    icon: icon === 'warning' ? icon : "success",
    iconColor:icon === 'warning' ? '#ff0000' : '#00ff00',
    confirmButtonColor:'#000',
    customClass: {
      container: className,
      title: className,
      actions: className,
      confirmButton: className,
      cancelButton: className,
      
    },
  };
} 


