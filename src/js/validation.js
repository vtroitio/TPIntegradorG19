
    document.addEventListener('DOMContentLoaded', function () {
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
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

        const form = event.target;

        const elements = {
          loginForm: {
            email: document.getElementById('loginEmail'),
            password: document.getElementById('loginPassword')
          },
          registerForm: {
            email: document.getElementById('registerEmail'),
            password: document.getElementById('registerPassword'),
            confirmPassword: document.getElementById('registerConfirmPassword')
          },
          contactForm: {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            message: document.getElementById('message'),
            selectOption: document.getElementById('selectOption')
          }
        };

        for (const key in elements[form.id]) {
          clearError(elements[form.id][key]);
        }

        if (form.id === 'loginForm' || form.id === 'registerForm') {
          const email = elements[form.id].email;
          const password = elements[form.id].password;

          if (email.value.trim() === '') {
            showError(email, 'Por favor, ingresa tu correo electrónico.');
            isValid = false;
          } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
              showError(email, 'Por favor, ingresa un correo electrónico válido.');
              isValid = false;
            }
          }

          if (password.value.trim() === '') {
            showError(password, 'Por favor, ingresa tu contraseña.');
            isValid = false;
          }

          if (form.id === 'registerForm') {
            const confirmPassword = elements[form.id].confirmPassword;

            if (confirmPassword.value.trim() === '') {
              showError(confirmPassword, 'Por favor, confirma tu contraseña.');
              isValid = false;
            } else if (password.value.trim() !== confirmPassword.value.trim()) {
              showError(confirmPassword, 'Las contraseñas no coinciden.');
              isValid = false;
            }
          }

          if (isValid) {
            const formData = new FormData(form);
            const data = {
              email: formData.get('email'),
              password: formData.get('password')
            };

            if (form.id === 'registerForm') {
              data.confirmPassword = formData.get('confirmPassword');
            }

            const endpoint = form.id === 'loginForm' ? '/auth/login' : '/auth/register';

            fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            .then(response => {
              if (response.ok) {
                window.location.hash = '#inicio'; // Redirige a la sección 'inicio' si el login o registro es exitoso
              } else {
                response.text().then(text => alert(text)); // Muestra el error si el login o registro falla
              }
            })
            .catch(error => console.error('Error:', error));
          }
        } else if (form.id === 'contactForm') {
          const name = elements[form.id].name;
          const email = elements[form.id].email;
          const message = elements[form.id].message;
          const selectOption = elements[form.id].selectOption;

          if (name.value.trim() === '') {
            showError(name, 'Por favor, ingresa tu nombre.');
            isValid = false;
          }

          if (email.value.trim() === '') {
            showError(email, 'Por favor, ingresa tu correo electrónico.');
            isValid = false;
          } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
              showError(email, 'Por favor, ingresa un correo electrónico válido.');
              isValid = false;
            }
          }

          if (message.value.trim() === '') {
            showError(message, 'Por favor, ingresa tu mensaje.');
            isValid = false;
          }

          if (selectOption.value === '') {
            showError(selectOption, 'Por favor, selecciona un motivo de contacto.');
            isValid = false;
          }

          if (isValid) {
            name.value = '';
            email.value = '';
            message.value = '';
            selectOption.value = '';
            document.getElementById('confirm').style.display = 'inline';
          }
        }
      }

      loginForm.addEventListener('submit', validateForm);
      registerForm.addEventListener('submit', validateForm);
      contactForm.addEventListener('submit', validateForm);
    });
 