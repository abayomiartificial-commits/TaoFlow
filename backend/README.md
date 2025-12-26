# TaoFlow Backend - Setup Guide

## 📋 Estructura del Backend

```
backend/
├── api/
│   └── index.js          # Express server principal (Vercel serverless)
├── lib/
│   ├── supabase.js       # Cliente Supabase
│   └── gemini.js         # Servicio Gemini AI
├── middleware/
│   ├── auth.js           # Autenticación JWT
│   └── errorHandler.js   # Manejo de errores
├── routes/
│   ├── curriculum.js     # Rutas de currículum
│   ├── posture.js        # Análisis de postura
│   ├── user.js           # Perfil de usuario
│   └── lessons.js        # Lecciones
├── database/
│   └── schema.sql        # Schema de Supabase
├── package.json
├── .env.example
└── .gitignore
```

---

## 🚀 Setup Local

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Configurar Variables de Entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Supabase (obtén de https://app.supabase.com)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# Gemini API (obtén de https://aistudio.google.com/apikey)
GEMINI_API_KEY=tu_gemini_api_key

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### 3. Configurar Base de Datos en Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Crea un nuevo proyecto (o usa uno existente)
3. Ve a **SQL Editor**
4. Copia y pega el contenido de `database/schema.sql`
5. Ejecuta el script

### 4. Configurar OAuth con Google en Supabase

1. En Supabase Dashboard → **Authentication** → **Providers**
2. Habilita **Google**
3. Ve a [Google Cloud Console](https://console.cloud.google.com)
4. Crea un nuevo proyecto o usa uno existente
5. Habilita **Google+ API**
6. Ve a **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
7. Tipo: **Web application**
8. **Authorized redirect URIs**: 
   ```
   https://tu-proyecto.supabase.co/auth/v1/callback
   ```
9. Copia **Client ID** y **Client Secret** a Supabase

### 5. Ejecutar el Servidor

```bash
npm run dev
```

El servidor estará en `http://localhost:3001`

Verifica que funciona:
```bash
curl http://localhost:3001/api/health
```

---

## 🌐 Deploy a Vercel

### 1. Preparar Repositorio GitHub

```bash
# Desde la raíz del proyecto (taoflow/)
git init
git add .
git commit -m "Initial commit with backend"
git branch -M main
git remote add origin https://github.com/tu-usuario/taoflow.git
git push -u origin main
```

### 2. Configurar Vercel

1. Ve a [Vercel Dashboard](https://vercel.com)
2. Click **Add New** → **Project**
3. Importa tu repositorio de GitHub
4. **Framework Preset**: Vite
5. **Root Directory**: `.` (raíz del proyecto)
6. Click **Deploy**

### 3. Configurar Variables de Entorno en Vercel

En Vercel Dashboard → **Settings** → **Environment Variables**, agrega:

```
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
GEMINI_API_KEY=tu_gemini_api_key
FRONTEND_URL=https://tu-app.vercel.app
NODE_ENV=production
```

### 4. Actualizar Redirect URI en Google OAuth

Agrega la URL de Vercel a las **Authorized redirect URIs**:
```
https://tu-proyecto.supabase.co/auth/v1/callback
```

### 5. Redeploy

Cada vez que hagas push a GitHub, Vercel automáticamente desplegará los cambios.

---

## 📡 Endpoints API

### Health Check
```
GET /api/health
```

### Curriculum
```
POST /api/curriculum/generate
Headers: Authorization: Bearer <token>
Body: { ageRange, fitnessLevel, primaryGoal, physicalLimitations, previousExperience }

GET /api/curriculum
Headers: Authorization: Bearer <token>
```

### Posture Analysis
```
POST /api/posture/analyze
Headers: Authorization: Bearer <token>
Body: { imageBase64, sessionId? }

GET /api/posture/history?limit=10
Headers: Authorization: Bearer <token>
```

### User Profile
```
GET /api/user/profile
Headers: Authorization: Bearer <token>

PUT /api/user/profile
Headers: Authorization: Bearer <token>
Body: { name?, experience?, goals?, limitations? }

GET /api/user/achievements
Headers: Authorization: Bearer <token>

POST /api/user/achievements
Headers: Authorization: Bearer <token>
Body: { title, points }
```

### Lessons
```
GET /api/lessons
Headers: Authorization: Bearer <token>

POST /api/lessons/:id/complete
Headers: Authorization: Bearer <token>
```

---

## 🔐 Autenticación

El backend usa **JWT tokens** de Supabase. El frontend debe:

1. Autenticar usuario con Supabase Auth
2. Obtener el token JWT
3. Incluirlo en cada request:

```javascript
const token = (await supabase.auth.getSession()).data.session?.access_token;

fetch('https://tu-api.vercel.app/api/user/profile', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🧪 Testing Local

### Test Health Endpoint
```bash
curl http://localhost:3001/api/health
```

### Test con Token (necesitas autenticarte primero)
```bash
# Obtén token del frontend o Supabase Dashboard
TOKEN="tu_jwt_token"

# Test profile
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/user/profile
```

---

## 📝 Próximos Pasos

1. ✅ Backend creado
2. ⏳ Actualizar frontend para usar API
3. ⏳ Implementar autenticación en frontend
4. ⏳ Conectar componentes con endpoints
5. ⏳ Testing end-to-end
6. ⏳ Deploy a producción

---

## 🐛 Troubleshooting

### Error: "Missing Supabase environment variables"
- Verifica que `.env` existe y tiene las variables correctas
- En Vercel, verifica que las variables de entorno están configuradas

### Error: "Invalid token"
- El token JWT puede haber expirado
- Verifica que el token se está enviando correctamente en el header
- Verifica que `SUPABASE_SERVICE_ROLE_KEY` es correcto

### Error: "Failed to fetch lessons"
- Verifica que la base de datos está configurada (schema.sql ejecutado)
- Verifica RLS policies en Supabase
- Verifica que el usuario está autenticado

### CORS Error
- Verifica que `FRONTEND_URL` en `.env` coincide con la URL del frontend
- En producción, actualiza `FRONTEND_URL` a la URL de Vercel

---

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Express.js Docs](https://expressjs.com/)
- [Google Gemini API](https://ai.google.dev/docs)
