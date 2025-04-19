document.addEventListener('DOMContentLoaded', function() {
    // Datos dummy para reservas. En producción, se obtendrían de un backend.
    // Se ha modificado para que la reserva más reciente (2025) esté en estado "Pendiente" 
    // y la reserva más antigua (2024) en estado "Completada".
    const reservations = [
      {
        id: "123456",
        fullDate: "2025-04-01",
        day: "01",
        month: "abr",
        year: "2025",
        time: "08:00",
        endTime: "", // Reserva pendiente, sin hora de salida aún.
        fare: "$5,000 COP",
        total: "",
        promotions: "",
        status: "Pendiente"
      },
      {
        id: "123457",
        fullDate: "2024-08-12",
        day: "12",
        month: "ago",
        year: "2024",
        time: "09:30",
        endTime: "10:30", // Reserva completada, con hora de salida.
        fare: "$5,000 COP",
        total: "$5,500 COP",
        promotions: "10% Descuento",
        status: "Completada"
      }
      // Puedes agregar más reservas siguiendo esta lógica.
    ];
  
    /**
     * Función para renderizar el listado de reservas en la página.
     */
    function renderReservations() {
      const listContainer = document.querySelector('.reservations-list ul');
      listContainer.innerHTML = ""; // Limpiar el listado
  
      if (reservations.length === 0) {
        document.querySelector('.no-reservations').style.display = 'block';
        return;
      } else {
        document.querySelector('.no-reservations').style.display = 'none';
      }
  
      reservations.forEach(reservation => {
        // Formatear la fecha: día + mes abreviado; se añade año solo si es distinto al año actual.
        let dateStr = reservation.day + " " + reservation.month;
        const currentYear = new Date().getFullYear();
        if (parseInt(reservation.year) !== currentYear) {
          dateStr += " " + reservation.year;
        }
  
        // Crear el elemento de lista para la reserva.
        const li = document.createElement('li');
        li.className = "reservation-item";
        li.innerHTML = `
          <div class="reservation-info">
            <span class="reservation-date">${dateStr}</span>
            <span class="reservation-time">${reservation.time}</span>
          </div>
          <button class="view-details" data-reservation-id="${reservation.id}">Ver Detalles</button>
        `;
        listContainer.appendChild(li);
      });
    }
  
    // Cargar dinámicamente los overlays: detalles de reserva y código QR.
    Promise.all([
      fetch('../components/reservation-details-overlay.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('reservation-details-overlay-placeholder').innerHTML = data;
        }),
      fetch('../components/qr-code-overlay.html')
        .then(response => response.text())
        .then(data => {
          let qrPlaceholder = document.getElementById('qr-code-overlay-placeholder');
          if (!qrPlaceholder) {
            qrPlaceholder = document.createElement('div');
            qrPlaceholder.id = 'qr-code-overlay-placeholder';
            document.body.insertBefore(qrPlaceholder, document.body.firstChild);
          }
          qrPlaceholder.innerHTML = data;
        })
    ]).then(() => {
      // Los overlays ya están cargados, ahora se pueden asignar los event listeners.
      const detailsOverlay = document.getElementById('reservation-details-overlay');
      const qrCodeOverlay = document.getElementById('qr-code-overlay');
  
      // Renderizar el listado de reservas.
      renderReservations();
  
      // Delegación de eventos para el botón "Ver Detalles".
      const listContainer = document.querySelector('.reservations-list ul');
      if (listContainer) {
        listContainer.addEventListener('click', function(e) {
          if (e.target && e.target.matches('button.view-details')) {
            const reservationId = e.target.getAttribute('data-reservation-id');
            const reservation = reservations.find(r => r.id === reservationId);
            if (reservation) {
              showReservationDetails(reservation);
            } else {
              alert("Reserva no encontrada.");
            }
          }
        });
      }
  
      /**
       * Función para mostrar el overlay con los detalles de una reserva.
       */
      function showReservationDetails(reservation) {
        if (!detailsOverlay) {
          console.error("No se encontró el overlay de detalles de reserva.");
          return;
        }
        document.getElementById('detail-full-date').textContent = reservation.fullDate;
        document.getElementById('detail-start-time').textContent = reservation.time;
        document.getElementById('detail-end-time').textContent = reservation.endTime || "N/A";
        document.getElementById('detail-fare').textContent = reservation.fare;
        document.getElementById('detail-total').textContent = reservation.total || "-";
        document.getElementById('detail-promotions').textContent = reservation.promotions || "Sin promociones";
        document.getElementById('detail-status').textContent = reservation.status;
  
        // Mostrar el botón "Ver Código QR" solo si la reserva está pendiente.
        const viewQRButton = document.getElementById('details-view-qr');
        if (reservation.status === "Pendiente") {
          viewQRButton.style.display = 'inline-block';
        } else {
          viewQRButton.style.display = 'none';
        }
        detailsOverlay.style.display = 'flex';
      }
  
      // Asignar event listener al botón "Cerrar" en el overlay de detalles.
      const detailsCloseBtn = document.getElementById('details-close');
      if (detailsCloseBtn && detailsOverlay) {
        detailsCloseBtn.addEventListener('click', () => {
          detailsOverlay.style.display = 'none';
        });
      }
  
      // Listener para el botón "Ver Código QR" en el overlay de detalles.
      const viewQRInDetailsBtn = document.getElementById('details-view-qr');
      if (viewQRInDetailsBtn && qrCodeOverlay) {
        viewQRInDetailsBtn.addEventListener('click', () => {
          qrCodeOverlay.style.display = 'flex';
        });
      }
  
      // Listener para el botón "Cerrar" en el overlay de Código QR.
      const qrCloseBtn = document.getElementById('qr-close');
      if (qrCloseBtn && qrCodeOverlay) {
        qrCloseBtn.addEventListener('click', () => {
          qrCodeOverlay.style.display = 'none';
          // Opcional: limpiar el contenedor del código QR para la próxima generación.
          const qrContainer = document.getElementById('qrcode');
          if (qrContainer) qrContainer.innerHTML = "";
        });
      }
  
      // Paginación (ejemplo básico).
      const prevPageBtn = document.querySelector('.pagination .prev-page');
      const nextPageBtn = document.querySelector('.pagination .next-page');
      if (prevPageBtn && nextPageBtn) {
        prevPageBtn.addEventListener('click', () => {
          console.log("Página anterior");
          // Lógica para cargar la página anterior.
        });
        nextPageBtn.addEventListener('click', () => {
          console.log("Siguiente página");
          // Lógica para cargar la siguiente página.
        });
      }
    }).catch(error => {
      console.error("Error al cargar los overlays:", error);
    });
  });
  