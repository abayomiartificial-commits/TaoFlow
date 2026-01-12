# 🌊 TaoFlow - El Camino del Tai Chi

<div align="center">

![TaoFlow Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

**Una plataforma interactiva de aprendizaje de Tai Chi impulsada por IA**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/abayomiartificial-commits/taoflow)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat&logo=vite)](https://vitejs.dev)

[Demo en Vivo](#) • [Documentación](./DEPLOYMENT.md) • [Reportar Bug](../../issues)

</div>

---

## ✨ Características

- 🧘 **Lecciones Interactivas**: Aprende Tai Chi paso a paso con contenido estructurado
- 🤖 **Asistente IA**: Obtén retroalimentación personalizada con Google Gemini
- 📊 **Sistema de Progreso**: Sigue tu avance con niveles y logros
- 🎯 **Práctica Guiada**: Estudio de práctica con temporizador y seguimiento
- 📚 **Biblioteca de Recursos**: Accede a videos, artículos y guías
- 👤 **Perfil de Usuario**: Gestiona tu información y progreso
- 🔐 **Autenticación Segura**: Login con Google OAuth vía Supabase

---

## 🚀 Tech Stack

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Lucide React** - Icon System

### Backend
- **Express.js** - API Server (Serverless)
- **Supabase** - Database & Authentication
- **PostgreSQL** - Data Storage
- **Google Gemini** - AI Integration

### Infrastructure
- **Vercel** - Hosting & Deployment
- **GitHub** - Version Control
- **Node.js 18+** - Runtime

---

## 📦 Estructura del Proyecto

```
taoflow/
├── components/           # React components
│   ├── Dashboard.tsx
│   ├── Library.tsx
│   ├── PracticeStudio.tsx
│   ├── Profile.tsx
│   └── ...
├── backend/             # Express API
│   ├── api/            # Serverless functions
│   ├── routes/         # API routes
│   ├── lib/            # Utilities
│   └── middleware/     # Auth & validation
├── lib/                # Frontend utilities
├── services/           # API clients
├── contexts/           # React contexts
├── types.ts            # TypeScript types
└── vercel.json         # Deployment config
```

---

## 🛠️ Instalación Local

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Supabase
- API Key de Google Gemini

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/abayomiartificial-commits/taoflow.git
   cd taoflow
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales:
   ```env
   VITE_SUPABASE_URL=tu_supabase_url
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   VITE_API_URL=http://localhost:3001
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   
   La app estará disponible en `http://localhost:5173`

---

## 🌐 Deployment a Producción

### Opción 1: Deploy con Vercel (Recomendado)

1. **Fork o clona este repositorio**

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click "New Project"
   - Importa tu repositorio
   - Framework: **Vite**

3. **Configura variables de entorno**
   
   En Vercel Dashboard → Settings → Environment Variables:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   VITE_API_URL=https://tu-app.vercel.app
   
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_ANON_KEY=tu_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   GEMINI_API_KEY=tu_gemini_key
   FRONTEND_URL=https://tu-app.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Tu app estará lista en ~2 minutos

### Opción 2: Deploy Manual

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

---

## 📊 Base de Datos

### Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)

2. Ejecuta el schema SQL:
   ```bash
   # El schema está en backend/database/schema.sql
   ```

3. Habilita autenticación con Google:
   - Dashboard → Authentication → Providers
   - Activa "Google"
   - Configura OAuth credentials

---

## 🔐 Seguridad

- ✅ JWT Authentication con Supabase
- ✅ Row Level Security (RLS) en base de datos
- ✅ CORS configurado correctamente
- ✅ Helmet.js para headers de seguridad
- ✅ API keys protegidas en backend
- ✅ Validación de inputs con Zod

---

## 📈 Roadmap

- [x] Sistema de autenticación
- [x] Lecciones básicas de Tai Chi
- [x] Sistema de progreso y niveles
- [x] Integración con IA (Gemini)
- [x] Estudio de práctica
- [ ] Modo offline
- [ ] App móvil (React Native)
- [ ] Comunidad y foros
- [ ] Clases en vivo
- [ ] Certificaciones

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

- **Richard Ortiz** - [GitHub](https://github.com/abayomiartificial-commits)

---

## 🙏 Agradecimientos

- Google Gemini por la integración de IA
- Supabase por la infraestructura backend
- Vercel por el hosting
- La comunidad de Tai Chi

---

## 📞 Soporte

¿Tienes preguntas? Abre un [issue](../../issues) o contacta:

- 📧 Email: [tu-email]
- 💬 Discord: [tu-discord]

---

<div align="center">

**Hecho con ❤️ para la comunidad de Tai Chi**

[⬆ Volver arriba](#-taoflow---el-camino-del-tai-chi)

</div>
