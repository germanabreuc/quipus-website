# quipus-website

Sitio web de Quipus (quipusmx.com). Estático, generado con [Eleventy](https://www.11ty.dev/), editable
desde un panel de administración ([Sveltia CMS](https://github.com/sveltia/sveltia-cms)) sin tocar código.

## Cómo está armado

- `src/` — contenido y plantillas del sitio (Nunjucks + Markdown).
- `src/blog/` — artículos del blog (uno por archivo `.md`).
- `src/descargables/` — descargables listados en `/recursos/`.
- `src/assets/` — CSS, fuentes, logos y fotografía ya optimizados para web.
- `admin/` — panel de Sveltia CMS (`/admin/`).
- `netlify.toml` — configuración de build para Netlify.

El build genera un sitio 100% estático en `_site/` — no hay backend ni base de datos.

## 1. Desplegar en Netlify

1. Crea una cuenta o inicia sesión en [Netlify](https://app.netlify.com).
2. **Add new site → Import an existing project** y conecta el repo `germanabreuc/quipus-website` de
   GitHub.
3. Configuración de build (Netlify debería detectarla sola desde `netlify.toml`, pero por si acaso):
   - **Build command:** `npm run build`
   - **Publish directory:** `_site`
4. Deploy. Netlify te da una URL tipo `algo-random.netlify.app` — pruébala antes de conectar el dominio.
5. Para conectar `quipusmx.com`: en el sitio de Netlify ve a **Domain settings → Add a domain**, escribe
   `quipusmx.com`, y sigue las instrucciones para apuntar tus DNS (Netlify te da los registros exactos;
   normalmente es cambiar los nameservers a Netlify DNS o agregar un registro A/CNAME donde tengas el
   dominio registrado).

## 2. Activar el panel de administración (Sveltia CMS)

El panel vive en `quipusmx.com/admin/`. Para que German pueda entrar con su cuenta de GitHub y publicar
sin tocar código, hay un paso manual único que solo se puede hacer desde la interfaz de GitHub (no tiene
API para automatizarlo):

1. En GitHub, ve a **Settings → Developer settings → OAuth Apps → New OAuth App**
   (o directamente: https://github.com/settings/applications/new).
2. Llena el formulario:
   - **Application name:** Quipus CMS (o el nombre que prefieras)
   - **Homepage URL:** `https://quipusmx.com` (o la URL de Netlify si el dominio aún no está conectado)
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Genera un **Client Secret** y copia el **Client ID** y el **Client Secret**.
4. En Netlify, ve a **Site settings → Access control → OAuth** (a veces aparece como **Site configuration
   → Identity and access → OAuth**) → **Install provider** → GitHub, y pega ahí el Client ID y el Client
   Secret.
5. Listo. Ahora `quipusmx.com/admin/` va a mostrar un botón "Login with GitHub" que funciona sin
   Netlify Identity ni Git Gateway.

German necesita tener acceso de escritura al repo `quipus-website` en GitHub para poder iniciar sesión en
el panel (como dueño del repo, ya lo tiene).

## 3. Cómo publicar un post del blog (paso a paso)

1. Entra a `quipusmx.com/admin/`.
2. Inicia sesión con GitHub (botón "Login with GitHub").
3. En el panel, entra a la colección **Blog**.
4. Click en **New Blog** (o el botón de "+").
5. Llena: título, fecha, resumen (aparece en el listado de `/recursos/`), imagen de portada (opcional) y
   el contenido del artículo.
6. **Deja desmarcada** la casilla "Marcar como ejemplo (Próximamente)" — esa casilla es solo para el
   contenido de muestra que dejamos como referencia visual.
7. Click en **Publish** (o "Save" y luego "Publish", según la versión del panel).
8. Eso crea un commit directo en el repo de GitHub. Netlify detecta el commit automáticamente y vuelve a
   desplegar el sitio — el post nuevo aparece en `quipusmx.com/recursos/` en 1–2 minutos.

Publicar un descargable (colección **Descargables**) funciona igual: título, descripción y el archivo a
subir.

### Antes de dar esto por terminado

Falta hacer la prueba real: publicar un post de ejemplo desde el panel ya desplegado y confirmar que
aparece en el sitio en vivo. Esto solo se puede hacer una vez el repo esté en GitHub, el sitio desplegado
en Netlify, y el OAuth App conectado (pasos 1 y 2 de arriba).

## Desarrollo local

```bash
npm install
npm start        # sirve el sitio en http://localhost:8080 con recarga en vivo
npm run build     # genera el sitio estático en _site/
```

## Notas de contenido y assets

- El texto de las páginas viene tal cual de `QUIPUS_contenido_sitio_web.md` (Drive), sin reescribir.
- La tipografía **Chomsky** está licenciada bajo SIL Open Font License 1.1 (verificado en los metadatos
  del propio archivo `.otf`) — permite uso, embebido y redistribución como webfont sin costo ni
  restricción adicional.
- Los gradientes de marca se recrearon en CSS a partir de la paleta oficial (`#7344ED`, `#D84747`,
  `#0DC5C7`, `#EDC022`), siguiendo la descripción del brandbook ("creado a partir de sus colores,
  exceptuando blanco y negro"). Los archivos `.grd` originales son presets de Photoshop y no se pueden
  usar directamente en la web.
- Fotografía: se usaron 6 fotos del set "FOTOS PARA SITIO WEB" que sí bajaban por debajo de 10MB.
  Quedaron 3 fotos sin usar (`20250508-IMG_4485`, `_MEL5732`, `20250508-IMG_5276`) porque pesaban entre
  13–27MB en crudo y superan el límite de descarga de la herramienta usada en este proceso — si German
  quiere incluirlas, hay que comprimirlas manualmente primero (o pedir que las re-exporten en <10MB) y
  agregarlas a `src/assets/img/photos/`.
- De los 10 logos en la carpeta `LOGOS`, se usaron 9. Falta `Logo - Quipus - Negro.png` (variante negra
  del isotipo simple) — no se pudo descargar en este proceso; no es bloqueante porque el sitio usa las
  variantes de imagotipo (que sí se bajaron completas) para header y footer.
- Recursos (blog y descargables) tiene contenido de ejemplo marcado con la etiqueta "Próximamente" —
  bórralo o reemplázalo desde el panel cuando haya contenido real.
