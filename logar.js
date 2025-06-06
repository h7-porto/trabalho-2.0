function validatefield(){
  const emailvalid= emailvalido();
  const senhavalida = passwordvalid();
  
  document.getElementById('reservar').disabled = !emailvalid || !senhavalida;
  
    
  
  
}
function emailvalido(){
    const email =  document.getElementById('email').value;
    if(!email){
        return false;
    }
        return validateEmail(email);
    
}
function passwordvalid(){
    const password = document.getElementById('senha').value;
    if (!password){
        return false;
    }
        return true;
}


function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}