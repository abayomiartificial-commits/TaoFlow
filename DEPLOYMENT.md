# TaoFlow - Full Stack Deployment Guide

## 🎯 Arquitectura del Proyecto

```
taoflow/
├── frontend/              # React + Vite (ya existente)
│   ├── components/
│   ├── services/
│   ├── types.ts
│   ├── App.tsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── backend/              # Express API (nuevo)
│   ├── api/
│   ├── lib/
│   ├── middleware/
│   ├── routes/
│   ├── database/
│   └── package.json
│
└── vercel.json          # Configuración Vercel
```

---

## 🚀 Guía de Deployment Completa

### Paso 1: Configurar Supabase

1. **Crear Proyecto**
   - Ve a [supabase.com](https://supabase.com)
   - Click "New Project"
   - Nombre: `taoflow`
   - Región: Elige la más cercana
   - Contraseña de DB: Guárdala en lugar seguro

2. **Ejecutar Schema SQL**
   - Dashboard → SQL Editor
   - Copia `backend/database/schema.sql`
   - Click "Run"

3. **Configurar OAuth Google**
   - Dashboard → Authentication → Providers
   - Habilita "Google"
   - Sigue instrucciones en `backend/README.md`

4. **Obtener Credenciales**
   - Dashboard → Settings → API
   - Copia:
     - `Project URL` → `SUPABASE_URL`
     - `anon public` → `SUPABASE_ANON_KEY`
     - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

---

### Paso 2: Configurar GitHub

```bash
# Desde la raíz del proyecto
git init
git add .
git commit -m "feat: add backend infrastructure"
git branch -M main

# Crea repo en GitHub, luego:
git remote add origin https://github.com/TU_USUARIO/taoflow.git
git push -u origin main
```

---

### Paso 3: Deploy a Vercel

1. **Conectar Repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Importa tu repo de GitHub
   - Framework: **Vite**
   - Root Directory: `.` (raíz)

2. **Configurar Variables de Entorno**
   
   En Vercel Dashboard → Settings → Environment Variables:

   ```env
   # Supabase
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   
   # Backend (para serverless functions)
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_ANON_KEY=tu_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   GEMINI_API_KEY=tu_gemini_api_key
   FRONTEND_URL=https://tu-app.vercel.app
   NODE_ENV=production
   ```

3. **Deploy**
   - Click "Deploy"
   - Espera 2-3 minutos
   - Tu app estará en `https://taoflow.vercel.app`

---

### Paso 4: Actualizar OAuth Redirect

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Credentials → Tu OAuth Client
3. **Authorized redirect URIs**, agrega:
   ```
   https://tu-proyecto.supabase.co/auth/v1/callback
   ```

---

### Paso 5: Verificar Deployment

1. **Health Check del Backend**
   ```bash
   curl https://tu-app.vercel.app/api/health
   ```
   
   Deberías ver:
   ```json
   {
     "status": "ok",
     "timestamp": "...",
     "environment": "production"
   }
   ```

2. **Test Frontend**
   - Abre `https://tu-app.vercel.app`
   - Debería cargar la app
   - Intenta hacer login con Google

---

## 🔄 Workflow de Desarrollo

### Desarrollo Local

```bash
# Terminal 1: Frontend
npm run dev
# → http://localhost:3000

# Terminal 2: Backend
cd backend
npm run dev
# → http://localhost:3001
```

### Deploy Automático

Cada push a `main` despliega automáticamente:

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
# Vercel automáticamente despliega
```

### Preview Deployments

Cada PR crea un preview deployment automático.

---

## 📊 Monitoreo

### Vercel Dashboard
- **Analytics**: Tráfico y performance
- **Logs**: Errores en tiempo real
- **Deployments**: Historial de deploys

### Supabase Dashboard
- **Database**: Ver datos en tiempo real
- **Auth**: Usuarios registrados
- **Storage**: Uso de almacenamiento

---

## 🔐 Seguridad

### ✅ Implementado
- JWT authentication
- Row Level Security (RLS) en Supabase
- CORS configurado
- Helmet.js para headers de seguridad
- API key de Gemini en backend (no expuesta)

### ⚠️ Recomendaciones
- Habilita 2FA en Supabase
- Rota API keys periódicamente
- Monitorea logs de Vercel
- Configura rate limiting (opcional)

---

## 💰 Costos Estimados

### Free Tier (Uso Personal)
- **Vercel**: Free
  - 100 GB bandwidth
  - Serverless functions ilimitadas
  - Dominios custom gratis

- **Supabase**: Free
  - 500 MB database
  - 1 GB file storage
  - 50,000 usuarios activos/mes
  - 2 GB bandwidth

- **Google Gemini**: Free
  - 60 requests/minuto
  - 1500 requests/día

**Total: $0/mes** ✅

### Si Excedes Free Tier
- Vercel Pro: $20/mes
- Supabase Pro: $25/mes
- **Total: ~$45/mes**

---

## 🐛 Troubleshooting Común

### "Cannot find module" en Vercel
- Verifica que `package.json` está en la raíz correcta
- Verifica que `vercel.json` apunta a las rutas correctas

### CORS Error
- Verifica `FRONTEND_URL` en variables de entorno
- Verifica que coincide con la URL de Vercel

### "Invalid token" en API
- Token expiró → refresca sesión
- Verifica `SUPABASE_SERVICE_ROLE_KEY`

### Database connection error
- Verifica que schema.sql se ejecutó
- Verifica RLS policies
- Verifica credenciales de Supabase

---

## 📝 Checklist de Deployment

- [ ] Supabase proyecto creado
- [ ] Schema SQL ejecutado
- [ ] OAuth Google configurado
- [ ] Repositorio GitHub creado
- [ ] Código pusheado a GitHub
- [ ] Proyecto Vercel creado
- [ ] Variables de entorno configuradas
- [ ] Deployment exitoso
- [ ] Health check funciona
- [ ] Login con Google funciona
- [ ] API endpoints funcionan

---

## 🎉 ¡Listo!

Tu aplicación TaoFlow está ahora en producción con:
- ✅ Frontend React en Vercel
- ✅ Backend Express serverless en Vercel
- ✅ Base de datos PostgreSQL en Supabase
- ✅ Autenticación OAuth con Google
- ✅ IA con Google Gemini
- ✅ Deploy automático con GitHub

**URL de tu app**: `https://taoflow.vercel.app`

---

## 📚 Recursos Útiles

- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)
