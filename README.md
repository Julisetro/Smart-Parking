
# Smart Parking

## Descripción  
Smart Parking es un software para la gestion automatica de entradas y salidas de vehiculos en parqueaderos. Como parte del proyecto se incluye una pagina web responsiva para gestionar reservas de estacionamiento. Permite a los usuarios registrarse, iniciar sesión, crear y consultar reservas con códigos QR para control de acceso, revisar su historial, recibir notificaciones en tiempo real y ver el estado operativo del parqueadero.

## Tecnologías  
- HTML5  
- CSS3 (Flexbox, Grid)  
- JavaScript (ES6+)  
- Fetch API para cargar componentes dinámicos





## Features

- **Autenticación segura**  
  Registro e inicio de sesión con correo/cédula y contraseña, más opción “Recordarme” para sesiones persistentes.

- **Interfaz responsiva**  
  Diseño adaptativo que se ve y funciona bien en móviles, tablets y escritorios, con navegación fija en header y footer.

- **Gestión de reservas**  
  Date‑picker y time‑picker intuitivos, formulario y resumen en overlays, cancelación automática si no se escanea el QR a tiempo.

- **Códigos QR dinámicos**  
  Generación y visualización de códigos QR para cada reserva, accesibles desde el dashboard o el historial.

- **Historial completo**  
  Listado paginado de todas las reservas (pendientes, completadas o canceladas) con overlay de detalles y acceso al QR cuando corresponda.

- **Notificaciones en tiempo real**  
  Mensajes sobre promociones, cambios de horario, recordatorios de reserva y alertas de error o confirmación.

- **Panel de usuario**  
  Saludo personalizado, resumen de la próxima reserva, enlace a configuración de perfil y acceso rápido a todas las funcionalidades.

- **Cumplimiento de estándares**  
  Maquetación semántica en HTML5, estilos en CSS3 (Flexbox/Grid), y carga de componentes con Fetch API para mantener código modular y mantenible.


## Instalación y ejecución

1. Clona este repositorio:

```bash
  git clone https://github.com/Julisetro/Smart-Parking
```
2. Abre la carpeta public con un servidor HTTP local (Live Server, npx http-server, etc.).
3. Accede a http://localhost:PORT/ para ver la landing, luego navega a login.html, register.html, dashboard.html, reservations.html y reservation-history.html.
    
## Authors

- [@Julisetro](https://www.github.com/Julisetro)

