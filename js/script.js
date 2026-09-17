/* =========================
   MENÚ HAMBURGUESA
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        const menuAbierto = nav.classList.toggle("active");

        menuToggle.textContent = menuAbierto ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            String(menuAbierto)
        );

        menuToggle.setAttribute(
            "aria-label",
            menuAbierto ? "Cerrar menú" : "Abrir menú"
        );

    });


    /* Cerrar menú al seleccionar una opción */

    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menú"
            );

        });

    });

}


/* =========================
   RESERVA POR WHATSAPP
========================= */

const reservaForm = document.querySelector("#reservaForm");

if (reservaForm) {

    reservaForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const nombreInput = document.querySelector("#nombre");
        const servicioInput = document.querySelector("#servicio");
        const fechaInput = document.querySelector("#fecha");
        const horaInput = document.querySelector("#hora");


        if (
            !nombreInput ||
            !servicioInput ||
            !fechaInput ||
            !horaInput
        ) {
            return;
        }


        const nombre = nombreInput.value.trim();
        const servicio = servicioInput.value;
        const fecha = fechaInput.value;
        const hora = horaInput.value;


        /* Validación básica del nombre */

        if (nombre.length < 2) {

            alert("Por favor, ingresa tu nombre.");

            nombreInput.focus();

            return;
        }


        /* Validación de fecha */

        if (!fecha) {

            alert("Por favor, selecciona una fecha.");

            fechaInput.focus();

            return;
        }


        /* Validación de hora */

        if (!hora) {

            alert("Por favor, selecciona una hora.");

            horaInput.focus();

            return;
        }


        const horaSeleccionada = Number(
            hora.split(":")[0]
        );


        if (
            horaSeleccionada < 9 ||
            horaSeleccionada > 19
        ) {

            alert(
                "El horario de atención es de 09:00 a 19:00."
            );

            horaInput.focus();

            return;
        }


        /* Número de WhatsApp */

        const numeroWhatsApp = "593995854197";


        /* Mensaje */

        const mensaje = `Hola, quisiera reservar una cita en Black & Blade.

Mi nombre es ${nombre} y me gustaría agendar un ${servicio} para el ${fecha} a las ${hora}.

¿Me podrían confirmar si el horario está disponible?

¡Gracias!`;


        /* Crear enlace de WhatsApp */

        const url =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;


        /*
         * Abrir WhatsApp.
         * requestAnimationFrame mantiene la acción
         * asociada al evento del usuario.
         */

        requestAnimationFrame(() => {

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    });

}


/* =========================
   FECHA MÍNIMA
========================= */

const fechaInput = document.querySelector("#fecha");

if (fechaInput) {

    const hoy = new Date();

    const año = hoy.getFullYear();

    const mes = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoy.getDate()
    ).padStart(2, "0");


    const fechaActual =
        `${año}-${mes}-${dia}`;


    fechaInput.min = fechaActual;

}


/* =========================
   ANIMACIONES AL HACER SCROLL
========================= */

const elementosAnimados = document.querySelectorAll(
    ".servicio-card, " +
    ".galeria-item, " +
    ".sobre-contenido, " +
    ".sobre-imagen, " +
    ".reserva-info, " +
    ".reserva-form, " +
    ".contacto-contenido"
);


elementosAnimados.forEach((elemento) => {

    elemento.classList.add("animar");

});


/* =========================
   INTERSECTION OBSERVER
========================= */

const movimientoReducido =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    "IntersectionObserver" in window &&
    !movimientoReducido
) {

    const observer = new IntersectionObserver(
        (elementos) => {

            elementos.forEach((elemento) => {

                if (elemento.isIntersecting) {

                    elemento.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        elemento.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    elementosAnimados.forEach((elemento) => {

        observer.observe(elemento);

    });

} else {

    /*
     * Si el navegador no soporta IntersectionObserver
     * o el usuario redujo las animaciones,
     * mostramos directamente los elementos.
     */

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("visible");

    });

}