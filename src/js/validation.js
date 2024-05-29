function validateForm() {
  
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var messageInput = document.getElementById('message');
    var selectOption = document.getElementById('selectOption');

   
    if (nameInput.value.trim() === '') {
        alert('Por favor, ingresa tu nombre.');
        nameInput.focus();
        return false;
    }

    if (emailInput.value.trim() === '') {
        alert('Por favor, ingresa tu correo electrónico.');
        emailInput.focus();
        return false;
    }

    if (messageInput.value.trim() === '') {
        alert('Por favor, ingresa tu mensaje.');
        messageInput.focus();
        return false;
    }

    if (selectOption.value === '') {
        alert('Por favor, selecciona un motivo de contacto.');
        selectOption.focus();
        return false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        alert('Por favor, ingresa un correo electrónico válido.');
        emailInput.focus();
        return false;
    }
    return true;
}