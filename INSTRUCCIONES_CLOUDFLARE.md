# Guía de Despliegue en Cloudflare Pages para D'mente Studios

Esta guía detalla los pasos exactos para que el cliente (D'mente Studios) despliegue su landing page utilizando su propio repositorio de GitHub y una cuenta de Cloudflare.

## Prerrequisitos
1. El código de este directorio (`dmente_studios`) subido a un repositorio de GitHub público o privado en la cuenta del cliente.
2. Una cuenta gratuita creada en [Cloudflare](https://dash.cloudflare.com/sign-up).

---

## Pasos de Configuración en Cloudflare Pages

### 1. Conectar GitHub con Cloudflare
1. Inicia sesión en tu cuenta de Cloudflare.
2. En el menú de navegación lateral izquierdo, haz clic en **"Workers & Pages"**.
3. Haz clic en el botón azul **"Create application"** (Crear aplicación).
4. Selecciona la pestaña **"Pages"**.
5. Haz clic en el botón **"Connect to Git"** (Conectar con Git).
6. Selecciona la opción **GitHub**. Cloudflare pedirá autorización para acceder a tus repositorios. Puedes seleccionar "All repositories" o elegir específicamente el repositorio de la landing page.

### 2. Seleccionar el Repositorio
1. Una vez autorizada la conexión, verás una lista de tus repositorios de GitHub.
2. Selecciona el repositorio que contiene el código de D'mente Studios (por ejemplo, `dmente-landing`).
3. Haz clic en **"Begin setup"** (Comenzar configuración).

### 3. Configurar el Entorno de Build (Paso Crítico)
En esta pantalla debes ingresar los comandos exactos para que Cloudflare compile Next.js correctamente. Como el proyecto principal está dentro de la carpeta `front/`, la configuración debe ser la siguiente:

- **Project name:** `dmente-estudios` (o el nombre que prefieras, esto definirá la URL temporal, ej. `dmente-estudios.pages.dev`).
- **Production branch:** `main` (o `master`, dependiendo de tu GitHub).
- **Framework preset:** Selecciona **"Next.js"**.

**Atención: Configuración Avanzada de Rutas**
Asegúrate de configurar las rutas y comandos así:
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Root directory / Base directory:** `/front` (⚠️ Muy importante: como el proyecto next.js vive dentro de la carpeta `front`, debes indicar que el directorio raíz del build es `/front`).

### 4. Variables de Entorno (Opcional)
Si en el futuro el formulario de contacto o el sistema de reservas URiT requiere credenciales (Ej. `NEXT_PUBLIC_STRIPE_KEY`), se configuran en la sección **"Environment variables (advanced)"**. Por ahora, déjalo en blanco.

### 5. Desplegar
1. Haz clic en **"Save and Deploy"** (Guardar y desplegar).
2. Cloudflare clonará el repositorio, instalará las dependencias y ejecutará el build de forma automática. Este proceso suele tardar de 1 a 2 minutos.
3. Si el build es exitoso, verás un mensaje verde de "Success" y un enlace provisional (ej. `https://dmente-estudios.pages.dev`). Haz clic para verificar que la página se vea bien.

---

## Configurar el Dominio Personalizado (Mid-term)
Cuando el cliente compre el dominio final (ej. `dmenteestudios.com`):

1. En Cloudflare, ve a tu proyecto en **"Workers & Pages"**.
2. Haz clic en la pestaña **"Custom domains"** (Dominios personalizados).
3. Haz clic en **"Set up a custom domain"** e ingresa el dominio que compraste.
4. Cloudflare te guiará para cambiar los `Nameservers` (DNS) en el proveedor donde compraste el dominio (ej. GoDaddy, Namecheap) hacia los servidores de Cloudflare.
5. Una vez los DNS se propaguen, Cloudflare emitirá un certificado SSL gratuito automáticamente y tu dominio estará en vivo.
