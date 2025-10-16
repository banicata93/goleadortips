# 📊 Google Analytics Setup Guide

## Как да добавиш Google Analytics към сайта

### Стъпка 1: Създай Google Analytics Account

1. Отиди на https://analytics.google.com/
2. Кликни "Start measuring"
3. Създай Account и Property
4. Избери "Web" platform
5. Копирай твоя **Measurement ID** (формат: G-XXXXXXXXXX)

---

### Стъпка 2: Добави Measurement ID в .env

Отвори `.env` файла и добави:

```bash
VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

Замени `G-XXXXXXXXXX` с твоя реален Measurement ID.

---

### Стъпка 3: Инициализирай Analytics

В `src/main.tsx`, добави:

```typescript
import { initGA } from './lib/analytics';

// Initialize Google Analytics
if (import.meta.env.PROD) {
  initGA();
}
```

---

### Стъпка 4: Track Events (Опционално)

Използвай готовите функции за tracking:

```typescript
import { analytics } from '@/lib/analytics';

// Contact form submission
analytics.contactFormSubmit(email);

// Package click
analytics.packageClick('Gold Package');

// Navigation
analytics.navClick('/services');

// Custom event
trackEvent('button_click', 'CTA', 'Subscribe Now');
```

---

## 📈 Какво се track-ва автоматично:

- ✅ Page views
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time on page
- ✅ Navigation clicks
- ✅ Form submissions
- ✅ Errors

---

## 🧪 Тестване

### Development Mode
Analytics е **disabled** в development mode за да не замърсява данните.

### Production Mode
След deployment, провери в Google Analytics:
1. Realtime → Overview
2. Трябва да видиш активни потребители

---

## 🔒 Privacy & GDPR

Analytics се зарежда **след** cookie consent от потребителя.

Cookie Consent компонентът вече е интегриран в сайта.

---

## 📊 Полезни Metrics

### Engagement Metrics
- **Bounce Rate** - Колко бързо потребителите напускат
- **Average Session Duration** - Средно време на сайта
- **Pages per Session** - Средно страници на визита

### Conversion Metrics
- **Contact Form Submissions** - Брой изпратени форми
- **Package Clicks** - Интерес към пакетите
- **Scroll Depth** - Engagement със съдържанието

### Traffic Sources
- **Organic Search** - От Google/Bing
- **Direct** - Директен трафик
- **Referral** - От други сайтове
- **Social** - От социални мрежи

---

## 🎯 Custom Dashboards

Създай custom dashboard в Google Analytics:
1. **Conversions Dashboard** - Contact forms, package clicks
2. **Engagement Dashboard** - Scroll depth, time on page
3. **Traffic Dashboard** - Sources, devices, locations

---

## 🔧 Troubleshooting

### Analytics не работи?
1. Провери че Measurement ID е правилен
2. Провери че е в production mode
3. Провери в Network tab за gtag requests
4. Провери че cookie consent е даден

### Не виждам данни в GA?
- Изчакай 24-48 часа за пълни данни
- Realtime данни се появяват веднага
- Провери че не използваш ad blocker

---

**Готово! Analytics е настроен и готов за production. 🎉**
