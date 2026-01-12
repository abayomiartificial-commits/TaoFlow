# 🚀 TaoFlow - Guía Rápida de Deployment

## Checklist Pre-Deployment

### ✅ Información Necesaria

Antes de comenzar, necesitas tener a mano:

1. **Credenciales de Supabase**
   - [ ] Project URL
   - [ ] Anon Key (public)
   - [ ] Service Role Key (secret)
   
   📍 Ubicación: [Supabase Dashboard](https://supabase.com/dashboard) → Tu Proyecto → Settings → API

2. **API Key de Gemini**
   - [ ] Gemini API Key
   
   📍 Ubicación: [Google AI Studio](https://aistudio.google.com/app/apikey)

3. **Cuentas Configuradas**
   - [x] GitHub: `abayomiartificial-commits`
   - [x] Vercel: `richard-ortizs-projects-ee1a5390`

---

## 🎯 Pasos de Deployment

### Paso 1: Preparar el Código

```bash
# 1. Asegúrate de estar en la rama correcta
git status

# 2. Agregar todos los cambios
git add .

# 3. Commit
git commit -m "feat: prepare for production deployment"
```

### Paso 2: Crear Repositorio en GitHub

**Opción A: Usando GitHub CLI (Recomendado)**
```bash
# Si tienes GitHub CLI instalado
gh repo create taoflow --public --source=. --remote=origin --push
```

**Opción B: Manual**
1. Ve a https://github.com/abayomiartificial-commits
2. Click "New repository"
3. Nombre: `taoflow`
4. Visibilidad: Public
5. NO inicialices con README (ya tienes uno)
6. Click "Create repository"

Luego en tu terminal:
```bash
git remote add origin https://github.com/abayomiartificial-commits/taoflow.git
git branch -M main
git push -u origin main
```

### Paso 3: Conectar con Vercel

1. **Ir a Vercel**
   - URL: https://vercel.com/richard-ortizs-projects-ee1a5390
   - Click "Add New..." → "Project"

2. **Importar Repositorio**
   - Busca: `abayomiartificial-commits/taoflow`
   - Click "Import"

3. **Configurar Build**
   - Framework Preset: **Vite**
   - Root Directory: `./` (dejar como está)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Paso 4: Variables de Entorno en Vercel

En la pantalla de configuración, click "Environment Variables" y agrega:

#### Variables del Frontend (con prefijo VITE_)
```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_URL = https://taoflow.vercel.app
```

#### Variables del Backend
```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GEMINI_API_KEY = AIzaSy...
FRONTEND_URL = https://taoflow.vercel.app
NODE_ENV = production
```

**Importante:** Aplica a: Production, Preview, Development (marca las 3)

### Paso 5: Deploy!

1. Click "Deploy"
2. Espera 2-3 minutos
3. ✅ Tu app estará en: `https://taoflow.vercel.app`

---

## 🔍 Verificación Post-Deployment

### 1. Health Check del Backend
```bash
curl https://taoflow.vercel.app/api/health
```

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2026-01-12T...",
  "environment": "production"
}
```

### 2. Verificar Frontend
- Abre: https://taoflow.vercel.app
- Debería cargar la página principal
- No debería haber errores en la consola

### 3. Test de Autenticación
1. Click "Iniciar Sesión"
2. Selecciona "Continuar con Google"
3. Completa el flujo OAuth
4. Deberías regresar a la app autenticado

---

## 🔧 Configuración Post-Deployment

### Actualizar Supabase OAuth

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Tu Proyecto → Authentication → URL Configuration
3. Agrega:
   - **Site URL:** `https://taoflow.vercel.app`
   - **Redirect URLs:** `https://taoflow.vercel.app/**`

### Actualizar Google OAuth (si aplica)

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. APIs & Services → Credentials
3. Tu OAuth 2.0 Client ID
4. **Authorized redirect URIs**, agrega:
   ```
   https://xxxxx.supabase.co/auth/v1/callback
   ```

---

## 🐛 Troubleshooting Rápido

### Error: "Build failed"
```bash
# Verifica que el build funciona localmente
npm run build

# Si falla, revisa los errores de TypeScript
npx tsc --noEmit
```

### Error: "Cannot find module"
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `node_modules` no esté en el repo

### Error: "CORS"
- Verifica que `FRONTEND_URL` en Vercel coincida con la URL de deployment
- Revisa que `VITE_API_URL` apunte a la URL correcta

### Error: "Invalid token"
- Verifica que las variables de Supabase estén correctas
- Asegúrate de que `SUPABASE_SERVICE_ROLE_KEY` esté configurada

---

## 📊 Monitoreo

### Vercel Dashboard
- **Deployments:** Ver historial y logs
- **Analytics:** Tráfico y performance
- **Logs:** Errores en tiempo real

### Supabase Dashboard
- **Database:** Ver datos
- **Auth:** Usuarios registrados
- **Logs:** Queries y errores

---

## 🔄 Actualizaciones Futuras

Para deployar cambios:

```bash
# 1. Hacer cambios en el código
# 2. Commit
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push
git push origin main

# 4. Vercel automáticamente despliega! 🎉
```

---

## 💡 Tips

- **Preview Deployments:** Cada PR crea un preview automático
- **Rollback:** En Vercel → Deployments → Promote to Production
- **Logs en Tiempo Real:** Vercel CLI: `vercel logs`
- **Custom Domain:** Vercel → Settings → Domains

---

## 📞 Necesitas Ayuda?

Si algo no funciona:

1. Revisa los logs en Vercel Dashboard
2. Verifica las variables de entorno
3. Comprueba que el build funciona localmente
4. Revisa la documentación completa en [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ✅ Checklist Final

- [ ] Código pusheado a GitHub
- [ ] Repositorio conectado a Vercel
- [ ] Variables de entorno configuradas
- [ ] Deployment exitoso
- [ ] Health check funciona
- [ ] Frontend carga correctamente
- [ ] Login con Google funciona
- [ ] OAuth redirect URLs actualizadas
- [ ] Monitoreo configurado

---

<div align="center">

**¡Listo para producción! 🚀**

Tu app TaoFlow está ahora en vivo y accesible para todo el mundo.

</div>
