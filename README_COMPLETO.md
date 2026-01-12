# 🥋 TaoFlow - El Camino del Tai Chi

> Aprende Tai Chi con inteligencia artificial personalizada

[![Made with React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Powered by Gemini](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![Deploy on Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?logo=vercel)](https://vercel.com)

---

## 🌟 Características

- 🎯 **Curriculum Personalizado**: IA genera un plan de aprendizaje adaptado a tu nivel y objetivos
- 📸 **Análisis de Postura**: Captura tu postura y recibe feedback instantáneo con IA
- 📚 **Biblioteca de Lecciones**: Contenido curado para todos los niveles
- 🏆 **Gamificación**: Sistema de puntos, achievements y niveles
- 👤 **Perfil de Progreso**: Seguimiento detallado de tu evolución
- 🔐 **Autenticación Segura**: Login con Google OAuth

---

## 🚀 Demo

**[Ver Demo en Vivo](https://taoflow.vercel.app)** _(después de deploy)_

---

## 📸 Screenshots

_Screenshots vendrán después del deployment_

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Lucide React** - Icons

### Backend
- **Express.js** - API Framework
- **Vercel Serverless** - Hosting
- **Node.js** - Runtime

### Database & Auth
- **Supabase** - PostgreSQL Database
- **Supabase Auth** - OAuth Authentication
- **Row Level Security** - Data Protection

### AI
- **Google Gemini** - Curriculum Generation
- **Gemini Vision** - Posture Analysis

---

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratis)
- Cuenta de Vercel (gratis)
- API Key de Google Gemini (gratis)
- Google Cloud Console (para OAuth)

---

## 🏃 Inicio Rápido

### 1. Clonar Repositorio

```bash
git clone https://github.com/[tu-usuario]/taoflow.git
cd taoflow
```

### 2. Instalar Dependencias

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Configurar Variables de Entorno

#### Frontend: `.env.local`
```env
VITE_SUPABASE_URL=https://[tu-proyecto].supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
VITE_API_URL=http://localhost:3001
GEMINI_API_KEY=tu_gemini_api_key
```

#### Backend: `backend/.env`
```env
SUPABASE_URL=https://[tu-proyecto].supabase.co
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
GEMINI_API_KEY=tu_gemini_api_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a SQL Editor
3. Ejecuta el contenido de `backend/database/schema.sql`
4. Configura OAuth Google en Authentication → Providers

### 5. Ejecutar en Desarrollo

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

### Deploy a Vercel

1. **Push a GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Conectar con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Import repository
   - Framework: Vite
   - Deploy

3. **Configurar Variables de Entorno en Vercel**
   - Settings → Environment Variables
   - Agrega todas las variables (ver `.env.example`)

4. **Actualizar OAuth Redirects**
   - Google Cloud Console
   - Authorized redirect URIs: `https://[tu-proyecto].supabase.co/auth/v1/callback`

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para guía completa.

---

## 📚 Documentación

### Para Desarrolladores

- **[Índice Maestro](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/indice_maestro.md)** - Navegación de toda la documentación
- **[Arquitectura Técnica](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/arquitectura_tecnica.md)** - Diseño del sistema
- **[Referencia Rápida](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/referencia_rapida.md)** - Comandos y snippets

### Para Planificación

- **[Plan de Finalización](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/plan_finalizacion_taoflow.md)** - Roadmap completo
- **[Plan de Acción Inmediata](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/accion_inmediata.md)** - Guía día a día
- **[Checklist de Progreso](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/checklist_progreso.md)** - Seguimiento de tareas

---

## 🏗️ Estructura del Proyecto

```
taoflow/
├── components/              # Componentes React
│   ├── LoginPage.tsx
│   ├── Dashboard.tsx
│   ├── PracticeStudio.tsx
│   ├── Library.tsx
│   ├── Profile.tsx
│   ├── EvaluationFlow.tsx
│   ├── Navigation.tsx
│   └── ErrorBoundary.tsx
├── contexts/
│   └── AuthContext.tsx     # Context de autenticación
├── lib/
│   ├── supabase.ts         # Cliente Supabase
│   └── api.ts              # API client
├── backend/                # Backend API
│   ├── api/
│   │   └── index.js        # Express server
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & error handling
│   ├── lib/                # Supabase & Gemini
│   └── database/
│       └── schema.sql      # Database schema
├── types.ts                # TypeScript types
├── App.tsx                 # Root component
└── index.tsx               # Entry point
```

---

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Curriculum
```
POST /api/curriculum/generate
GET  /api/curriculum
```

### Posture Analysis
```
POST /api/posture/analyze
GET  /api/posture/history
```

### User Profile
```
GET  /api/user/profile
PUT  /api/user/profile
GET  /api/user/achievements
POST /api/user/achievements
```

### Lessons
```
GET  /api/lessons
POST /api/lessons/:id/complete
```

Ver [Arquitectura Técnica](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/arquitectura_tecnica.md) para detalles completos.

---

## 🗄️ Base de Datos

### Tablas Principales

- `profiles` - Perfiles de usuario
- `curriculums` - Curriculums personalizados
- `lessons` - Biblioteca de lecciones
- `user_lessons` - Progreso de lecciones
- `posture_analyses` - Historial de análisis
- `achievements` - Logros desbloqueados

Todas las tablas tienen Row Level Security (RLS) habilitado.

---

## 🔐 Seguridad

- ✅ JWT Authentication con Supabase
- ✅ Row Level Security en todas las tablas
- ✅ CORS configurado
- ✅ Helmet.js para headers de seguridad
- ✅ API keys nunca expuestas en frontend
- ✅ HTTPS en producción

---

## 🧪 Testing

```bash
# Probar backend
cd backend
npm run dev
curl http://localhost:3001/api/health

# Probar frontend
npm run dev
# Abrir http://localhost:3000
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "CORS"
Verifica que `FRONTEND_URL` en backend/.env coincide con la URL del frontend.

### Error: "Invalid token"
El token JWT puede haber expirado. Haz logout y login de nuevo.

Ver [Referencia Rápida - Troubleshooting](C:/Users/jodme/.gemini/antigravity/brain/72f1728a-b0fd-4b1c-840b-c54378fbb51a/referencia_rapida.md#-troubleshooting) para más ayuda.

---

## 💰 Costos

### Free Tier (Recomendado)
- **Vercel**: Free (100GB bandwidth)
- **Supabase**: Free (500MB DB, 50K usuarios/mes)
- **Gemini**: Free (1500 requests/día)

**Total: $0/mes** ✅

### Si Escala
- Vercel Pro: $20/mes
- Supabase Pro: $25/mes
- **Total: ~$45/mes**

---

## 🗺️ Roadmap

### ✅ Fase 1: MVP (Completado 70%)
- [x] Frontend base
- [x] Backend API
- [x] Autenticación
- [x] Schema de base de datos
- [ ] Integración completa
- [ ] Deploy a producción

### 🔄 Fase 2: Mejoras (En progreso)
- [ ] Sistema de gamificación completo
- [ ] Más lecciones
- [ ] Optimizaciones de performance
- [ ] Responsive design mejorado

### 📅 Fase 3: Futuro
- [ ] Grabación de video
- [ ] Funcionalidad social
- [ ] App móvil nativa
- [ ] Marketplace de instructores

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [GitHub](https://github.com/tu-usuario)

---

## 🙏 Agradecimientos

- Google Gemini por la IA
- Supabase por el backend
- Vercel por el hosting
- La comunidad de Tai Chi

---

## 📞 Soporte

- 📧 Email: tu-email@example.com
- 💬 Discord: [Link a servidor]
- 🐦 Twitter: [@tu_handle]

---

## 🌟 ¡Dale una estrella!

Si este proyecto te ayudó, considera darle una ⭐ en GitHub!

---

**Hecho con ❤️ y Tai Chi**

**El camino del Tai Chi comienza con un solo paso** 🥋✨
