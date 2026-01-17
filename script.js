// ===== SCROLL SUAVE DEL MENÚ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ===== ENVÍO DEL FORMULARIO =====
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    const btnEnviar = document.getElementById('submit-btn');

    if (form && btnEnviar) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Cambiar texto del botón
            btnEnviar.innerText = "Enviando...";
            btnEnviar.disabled = true;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            fetch(form.action, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Accept": "application/json" 
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    // Limpiar formulario
                    form.reset();
                    
                    // Mostrar mensaje de éxito
                    alert("¡Formulario enviado con éxito! Nos pondremos en contacto pronto.");
                    
                    // Restaurar botón
                    btnEnviar.innerText = "Enviar Formulario";
                    btnEnviar.disabled = false;
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error al enviar el formulario. Por favor, intenta de nuevo o contáctanos directamente.");
                
                // Restaurar botón
                btnEnviar.innerText = "Enviar Formulario";
                btnEnviar.disabled = false;
            });
        });
    }
});