// Import our custom CSS
import '../scss/styles.scss';

// Import only the Bootstrap components we need
import { Popover } from 'bootstrap';

// Add validation for the contact form
document.addEventListener("DOMContentLoaded", function() {
    // Agregar evento 'submit' al formulario
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        // Obtener los valores de los campos
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var howFound = document.querySelectorAll('input[name="howFound"]:checked');
        var reason = document.getElementById("selectOption").value;

        // Validar que los campos obligatorios estén completos
        if (!name || !email || !message || howFound.length === 0 || !reason) {
            // Mostrar un mensaje de error
            alert("Por favor completa todos los campos obligatorios.");
            // Detener el envío del formulario
            event.preventDefault();
        }
    });

    // Create an example popover
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach(popover => {
        new Popover(popover);
    });
});
