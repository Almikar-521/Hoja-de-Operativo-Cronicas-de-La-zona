# 🚀 Guía de Despliegue Automático

Esta guía te explica cómo configurar el despliegue automático de tu aplicación en GitHub Pages.

## ✅ Lo que ya está configurado

Ya he creado y configurado:

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Ejecuta tests automáticamente
   - Construye la aplicación
   - Despliega a GitHub Pages

2. **Configuración de Vite** (`vite.config.ts`)
   - Base path configurado para GitHub Pages

## 📋 Pasos para activar el despliegue automático

### 1. Habilitar GitHub Pages en tu repositorio

1. Ve a tu repositorio en GitHub: `https://github.com/Almikar-521/Hoja-de-Operativo-Cronicas-de-La-zona`

2. Click en **Settings** (Configuración) en la parte superior

3. En el menú lateral izquierdo, click en **Pages**

4. En la sección **Build and deployment**:
   - **Source**: Selecciona **GitHub Actions**
   - (NO selecciones "Deploy from a branch")

5. Guarda los cambios

### 2. Hacer push de estos cambios

Una vez que hagas push de estos cambios al branch `main` (o el que hayas configurado), el despliegue se ejecutará automáticamente.

```bash
# Si estás en otro branch, primero necesitas mergear a main
git checkout main
git merge claude/improve-test-coverage-xsvUW
git push origin main
```

### 3. Ver el progreso del despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (tarda 2-3 minutos)

### 4. Acceder a tu aplicación

Una vez completado el despliegue, tu aplicación estará disponible en:

```
https://almikar-521.github.io/Hoja-de-Operativo-Cronicas-de-La-zona/
```

## 🔄 Despliegues futuros

De ahora en adelante, **cada vez que hagas push al branch `main`**:

1. ✅ Se ejecutarán todos los tests automáticamente
2. ✅ Si los tests pasan, se construye la aplicación
3. ✅ Se despliega automáticamente a GitHub Pages
4. ❌ Si algún test falla, el despliegue se cancela

## 🎯 Flujo de trabajo recomendado

```bash
# 1. Trabaja en un branch de feature
git checkout -b feature/nueva-funcionalidad

# 2. Haz tus cambios y commits
git add .
git commit -m "feat: añadir nueva funcionalidad"

# 3. Ejecuta tests localmente
npm test

# 4. Si todo está bien, push a GitHub
git push origin feature/nueva-funcionalidad

# 5. Crea un Pull Request en GitHub

# 6. Una vez aprobado, mergea a main
git checkout main
git merge feature/nueva-funcionalidad
git push origin main

# 7. ¡El despliegue automático se ejecuta!
```

---

## 🌐 Otras opciones de hosting (alternativas)

Si prefieres otras plataformas en lugar de GitHub Pages:

### Opción 2: Vercel (Recomendado para React)
- Más rápido que GitHub Pages
- SSL automático
- Previews de PRs
- **Cómo**: Conecta tu repo en [vercel.com](https://vercel.com) y listo

### Opción 3: Netlify
- Similar a Vercel
- Excelente para PWAs
- **Cómo**: Conecta tu repo en [netlify.com](https://netlify.com)

### Opción 4: Firebase Hosting
- Integración con otros servicios de Google
- Excelente para PWAs
- **Cómo**: Instala Firebase CLI y sigue [esta guía](https://firebase.google.com/docs/hosting)

---

## ❓ Sobre Google AI Studio

**Nota importante**: Google AI Studio NO es un servicio de hosting para aplicaciones web. Es una plataforma para prototipar con modelos de IA generativa (Gemini).

Si necesitas usar Google AI Studio en tu aplicación (por ejemplo, para añadir un chatbot con IA), eso sería una funcionalidad diferente que requeriría:
- Obtener una API key de Google AI Studio
- Integrar el SDK de Gemini en tu aplicación
- Crear componentes para interactuar con la IA

Si este es tu caso, házmelo saber y te ayudo a integrarlo.

---

## 🐛 Resolución de problemas

### El despliegue falla en GitHub Actions

1. Revisa el log en la pestaña Actions
2. Asegúrate de que todos los tests pasen localmente
3. Verifica que el build funcione: `npm run build`

### La página muestra "404" o recursos no cargan

- Asegúrate de que el `base` en `vite.config.ts` coincide con el nombre del repositorio
- Actualmente está configurado como: `'/Hoja-de-Operativo-Cronicas-de-La-zona/'`

### Los tests fallan en GitHub Actions pero pasan localmente

- Puede ser un problema de versiones de Node.js
- El workflow usa Node 20, asegúrate de tener la misma versión localmente

---

## 📊 Monitoreo

Después del primer despliegue, puedes:

1. Ver analytics en GitHub (pestaña Insights > Traffic)
2. Monitorear errores con herramientas como Sentry
3. Ver logs de despliegue en la pestaña Actions

---

**¿Necesitas ayuda?** Abre un issue en el repositorio o contáctame.
