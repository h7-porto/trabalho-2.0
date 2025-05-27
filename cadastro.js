function validatefield(){
  const emailvalid= emailvalido();
  const senhavalida = passwordvalid();
  const nomevalido = namevalid();
  document.getElementById('reservar').disabled = !emailvalid || !senhavalida || !nomevalido ;
  
    
  
  
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
function namevalid(){
    const namevalid = document.getElementById('nome').value;
    if (!namevalid){
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}