// qr-code.js
// Módulo para la generación de códigos QR usando la biblioteca qrcode.js

(function (global) {
    'use strict';
  
    /**
     * Genera un código QR en el contenedor especificado.
     * @param {string} containerId - El ID del elemento donde se mostrará el código QR.
     * @param {string} text - El texto o dato a codificar en el QR.
     * @param {object} options - Opciones adicionales para la generación del código QR.
     */
    function generateQRCode(containerId, text, options) {
      if (!containerId || !text) {
        console.error("Se requiere el ID del contenedor y el texto para generar el código QR.");
        return;
      }
      
      // Opciones por defecto para el QR
      var defaultOptions = {
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      };
      
      // Fusionar las opciones por defecto con las proporcionadas
      var qrOptions = Object.assign({}, defaultOptions, options, { text: text });
      
      var container = document.getElementById(containerId);
      if (!container) {
        console.error("No se encontró el contenedor con el ID: " + containerId);
        return;
      }
      
      // Limpiar cualquier contenido existente en el contenedor
      container.innerHTML = "";
      
      // Crear la instancia del código QR
      var qrcode = new QRCode(container, qrOptions);
      return qrcode;
    }
    
    // Exponer la función al ámbito global para poder usarla desde otras partes de la aplicación
    global.generateQRCode = generateQRCode;
    
  })(window);
  