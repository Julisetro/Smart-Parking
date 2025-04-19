document.addEventListener('DOMContentLoaded', () => {
    // Cargar los overlays dinámicamente y luego adjuntar event listeners
    Promise.all([
      fetch('../components/reservation-form-overlay.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('reservation-form-overlay-placeholder').innerHTML = data;
        }),
      fetch('../components/reservation-summary-overlay.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('reservation-summary-overlay-placeholder').innerHTML = data;
        }),
      fetch('../components/message-overlay.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('message-overlay-placeholder').innerHTML = data;
        }),
        fetch('../components/qr-code-overlay.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('qr-code-overlay-placeholder').innerHTML = data;
        })    
    ]).then(() => {
      // Los overlays ya están cargados, ahora se pueden asignar los listeners
      const reservationFormOverlay = document.getElementById('reservation-form-overlay');
      const reservationSummaryOverlay = document.getElementById('reservation-summary-overlay');
      const messageOverlay = document.getElementById('message-overlay');
      const qrCodeOverlay = document.getElementById('qr-code-overlay');
  
      // Botón para abrir el formulario de reserva
      const openReservationBtn = document.querySelector('.open-reservation-form');
      if (openReservationBtn && reservationFormOverlay) {
        openReservationBtn.addEventListener('click', () => {
          reservationFormOverlay.style.display = 'flex';
        });
      }
  
      // Botón "Cancelar" en el formulario de reserva
      const formCancelBtn = document.getElementById('form-cancel');
      if (formCancelBtn && reservationFormOverlay) {
        formCancelBtn.addEventListener('click', () => {
          reservationFormOverlay.style.display = 'none';
        });
      }
  
      // Botón "Continuar" en el formulario de reserva: enviar al resumen
      const formContinueBtn = document.getElementById('form-continue');
      if (formContinueBtn && reservationFormOverlay && reservationSummaryOverlay) {
        formContinueBtn.addEventListener('click', () => {
          const reservationDateInput = document.getElementById('reservation-date');
          const reservationTimeInput = document.getElementById('reservation-time');
  
          const reservationDate = reservationDateInput ? reservationDateInput.value : "";
          const reservationTime = reservationTimeInput ? reservationTimeInput.value : "";
  
          // Validación básica: se deben ingresar los datos
          if (reservationDate && reservationTime) {
            // Actualizar el resumen con los valores ingresados
            document.getElementById('summary-date').textContent = reservationDate;
            document.getElementById('summary-time').textContent = reservationTime;
            // Ocultar el formulario y mostrar el resumen
            reservationFormOverlay.style.display = 'none';
            reservationSummaryOverlay.style.display = 'flex';
          } else {
            // Mostrar mensaje de error si faltan datos
            showMessageOverlay("Ocurrió un error inesperado. Por favor, verifica los datos ingresados o intenta nuevamente.");
          }
        });
      }
  
      // Botón "Cancelar" en el overlay del resumen de reserva
      const summaryCancelBtn = document.getElementById('summary-cancel');
      if (summaryCancelBtn && reservationSummaryOverlay) {
        summaryCancelBtn.addEventListener('click', () => {
          reservationSummaryOverlay.style.display = 'none';
        });
      }
  
      // Botón "Confirmar Reserva" en el overlay del resumen
      const summaryConfirmBtn = document.getElementById('summary-confirm');
      if (summaryConfirmBtn && reservationSummaryOverlay) {
        summaryConfirmBtn.addEventListener('click', () => {
          reservationSummaryOverlay.style.display = 'none';
          showMessageOverlay("¡Reserva exitosa! Tu espacio ha sido reservado. Este mensaje se cerrará en breve.", true);
        });
      }
      
          // Botón "Ver Código QR" en la tarjeta de reserva realizada
      const viewQRBtn = document.querySelector('.reservation-card .view-qr');
      if (viewQRBtn && qrCodeOverlay) {
        viewQRBtn.addEventListener('click', () => {
          // Mostrar el overlay del código QR
          qrCodeOverlay.style.display = 'flex';
          // Generar el código QR en el contenedor con ID "qrcode"
          // Reemplaza "ReservaID: 123456789" con la información real de la reserva
          generateQRCode("qrcode", "ReservaID: 123456789", {
            width: 250,
            height: 250,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
        });
      }

    // Botón "Cerrar" en el overlay del Código QR
    const qrCloseBtn = document.getElementById('qr-close');
    if (qrCloseBtn && qrCodeOverlay) {
      qrCloseBtn.addEventListener('click', () => {
        qrCodeOverlay.style.display = 'none';
        // Limpiar el contenedor para la próxima generación
        document.getElementById("qrcode").innerHTML = "";
      });
    }
  
      // Función para mostrar el overlay de mensajes (error o éxito)
      function showMessageOverlay(message, autoClose) {
        if (messageOverlay) {
          document.getElementById('message-text').textContent = message;
          messageOverlay.style.display = 'flex';
          if (autoClose) {
            setTimeout(() => {
              messageOverlay.style.display = 'none';
            }, 4000);
          }
        }
      }
    }).catch(error => {
      console.error("Error al cargar los overlays:", error);
    });
  });
  