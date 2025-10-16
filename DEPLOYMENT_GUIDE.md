# 🚀 Deployment Guide

## Преди да deploy-неш

### 1. Приложи Database Migration
```bash
# Отвори Supabase Dashboard
# SQL Editor -> New Query
# Copy-paste съдържанието от:
supabase/migrations/20251015000000_create_contact_messages.sql
# Run
```

### 2. Провери Environment Variables
```bash
# Провери .env файла
cat .env

# Трябва да съдържа:
VITE_SUPABASE_PROJECT_ID=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=...
```

### 3. Build локално за тест
```bash
npm run build
npm run preview
# Отвори http://localhost:4173
```

---

## Production Deployment

### Option 1: Vercel (Препоръчително)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

**Environment Variables в Vercel:**
- Settings -> Environment Variables
- Добави всички от `.env` файла

---

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`

---

### Option 3: Manual (VPS/Server)

```bash
# Build
npm run build

# Copy dist/ folder to server
scp -r dist/* user@server:/var/www/html/

# Setup nginx или apache
```

---

## Post-Deployment Checklist

### ✅ Функционалност
- [ ] Homepage се зарежда правилно
- [ ] Всички страници работят
- [ ] Dark mode toggle работи
- [ ] Contact form submission работи
- [ ] Navigation е функционална

### ✅ SEO
- [ ] Meta tags са видими (View Page Source)
- [ ] robots.txt е достъпен: `yourdomain.com/robots.txt`
- [ ] sitemap.xml е достъпен: `yourdomain.com/sitemap.xml`
- [ ] Structured data е валидна (Google Rich Results Test)

### ✅ Performance
- [ ] Page load < 3 seconds
- [ ] Images се lazy load-ват
- [ ] No console errors
- [ ] Mobile responsive

### ✅ Analytics
- [ ] Google Analytics tracking code (ако е добавен)
- [ ] Conversion tracking setup
- [ ] Error monitoring (Sentry, etc.)

---

## Update Domain в файлове

След deployment, обнови domain в:

### 1. sitemap.xml
```xml
<loc>https://ТВОЯТ-ДОМЕЙН.com/</loc>
```

### 2. robots.txt
```
Sitemap: https://ТВОЯТ-ДОМЕЙН.com/sitemap.xml
```

### 3. SEO.tsx (optional)
```typescript
const siteUrl = "https://ТВОЯТ-ДОМЕЙН.com";
```

---

## Мониторинг

### Google Search Console
1. Отиди на https://search.google.com/search-console
2. Добави property за твоя домейн
3. Verify ownership
4. Submit sitemap.xml

### Performance Monitoring
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **WebPageTest:** https://www.webpagetest.org/

---

## Troubleshooting

### Contact form не работи
```bash
# Провери дали migration е приложена
# Supabase Dashboard -> Table Editor
# Трябва да виждаш "contact_messages" таблица
```

### 404 errors на routes
```bash
# Добави _redirects файл (Netlify)
echo "/*    /index.html   200" > dist/_redirects

# Или vercel.json (Vercel)
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment variables не работят
```bash
# Провери че започват с VITE_
# Rebuild след промяна
npm run build
```

---

## Maintenance

### Седмично
- Провери contact form submissions в Supabase
- Review analytics data
- Check for errors in logs

### Месечно
- Обнови статистики в StatsSection.tsx
- Добави нови testimonials
- Update FAQ ако има нови въпроси
- Обнови sitemap lastmod dates

### Тримесечно
- Review и optimize SEO
- A/B test different content
- Update pricing ако е нужно

---

## Support

За въпроси относно deployment:
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com/

---

**Успешен deployment! 🎉**
