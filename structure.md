#Idea inicial de la estructura de carpetas del proyecto

smart-parking-frontend/
├── .vscode/                      # Configuraciones específicas para VS Code
│   └── settings.json
├── node_modules/                 # Dependencias instaladas (si usas npm o yarn)
├── public/                       # Archivos públicos que se sirven en producción
│   └── index.html                # Punto de entrada (landing page) o shell principal
├── src/                          # Código fuente del proyecto
│   ├── assets/                   # Recursos estáticos
│   │   ├── images/               # Imágenes, íconos y logos
│   │   └── styles/               # Archivos de estilos (CSS o preprocesadores)
│   │       ├── main.css          # Estilos globales
│   │       └── variables.css     # Variables de colores, fuentes y demás constantes
│   ├── components/               # Componentes reutilizables de la interfaz (Header, Footer, Navigation, etc.)
│   │   ├── Header.html
│   │   ├── Footer.html
│   │   └── Navigation.html
│   ├── pages/                    # Páginas completas de la aplicación
│   │   ├── login.html            # Pantalla de login
│   │   ├── register.html         # Pantalla de registro
│   │   ├── dashboard.html        # Dashboard principal después del login
│   │   ├── reservations.html     # Pantalla para crear nuevas reservas
│   │   ├── reservation-history.html  # Historial de reservas
│   │   ├── payment-status.html   # Página para revisar el estado de pago de reservas (indicación de pendiente o pagado)
│   │   └── error.html            # Pantalla de error (o modal/overlay para errores)
│   └── js/                       # Archivos JavaScript
│       ├── main.js               # Código principal y control de navegación
│       └── helpers.js            # Funciones y utilidades comunes
├── package.json                  # Configuración de dependencias y scripts
└── README.md                     # Documentación y guía del proyecto
