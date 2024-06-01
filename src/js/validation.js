document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  function showError(element, message) {
    const errorElement = document.getElementById(element.id + 'Error');
    errorElement.textContent = message;
    element.focus();
  }

  function clearError(element) {
    const errorElement = document.getElementById(element.id + 'Error');
    errorElement.textContent = '';
  }

  function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const selectOption = document.getElementById('selectOption');

    clearError(nameInput);
    clearError(emailInput);
    clearError(messageInput);
    clearError(selectOption);

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Por favor, ingresa tu nombre.');
      isValid = false;
    }

    if (emailInput.value.trim() === '') {
      showError(emailInput, 'Por favor, ingresa tu correo electrónico.');
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showError(
          emailInput,
          'Por favor, ingresa un correo electrónico válido.'
        );
        isValid = false;
      }
    }

    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Por favor, ingresa tu mensaje.');
      isValid = false;
    }

    if (selectOption.value === '') {
      showError(selectOption, 'Por favor, selecciona un motivo de contacto.');
      isValid = false;
    }

    if (isValid) {
      nameInput.value = ''
      emailInput.value = ''
      messageInput.value = ''
      document.getElementById('confirm').style.display = 'inline';
    }
  }

  contactForm.addEventListener('submit', validateForm);
});
