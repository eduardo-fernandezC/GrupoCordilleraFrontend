# Grupo Cordillera — Frontend

Interfaz web construida con React + Vite para visualizar y administrar la información operativa del sistema: ventas, productos, sucursales, reportes y usuarios.

## Requisitos

- Node.js 18 o superior
- npm (o yarn)
- Backend (APIs) disponibles o configuradas mediante variables de entorno

## Instalación y ejecución (desarrollo)

```bash
npm install
npm run dev
```

El servidor de desarrollo de Vite se ejecuta por defecto en `http://localhost:5173`.

## Configuración (variables de entorno)

El proyecto utiliza variables de entorno con prefijo `VITE_`. Puedes definirlas en un archivo `.env` en la raíz del proyecto. Variables importantes:

- `VITE_DOMAIN` — Dominio de Auth0
- `VITE_CLIENT_ID` — Client ID de Auth0
- `VITE_AUDIENCE` — Audience (API) para Auth0
- `VITE_SCOPE` — Scopes (ej. `openid profile email`)
- `VITE_DASHBOARD_URL` — URL base del servicio de dashboard
- `VITE_DATA_URL` — URL base del servicio de datos
- `VITE_DASHBOARD_ENDPOINT` — Endpoint para dashboard (p. ej. `/dashboard`)
- `VITE_ROLES_ENDPOINT` — Endpoint para roles

## Funcionalidades principales

- Autenticación y autorización con Auth0.
- Visualización de dashboards y gráficos de ventas.
- Gestión y visualización de productos, sucursales y reportes.
- Notificaciones y manejo de errores en UI.
- Rutas protegidas según roles.

## Notas

- El frontend consume APIs configuradas mediante `VITE_DASHBOARD_URL` y `VITE_DATA_URL`.
- Para cambiar el puerto de desarrollo, configura `PORT` antes de ejecutar `npm run dev` o ajusta la configuración de Vite.
- El proyecto usa Vite + React; los scripts disponibles en `package.json` son `dev`, `build`, `preview` y `lint`.