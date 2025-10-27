# 🤖 AI Prediction Import System

## 📖 Какво е това?

Система за автоматично импортиране на футболни прогнози от AI (ChatGPT, Claude, и др.) директно в Admin панела.

**Спестява време:** От 5 минути ръчно въвеждане → 30 секунди с AI Import! ⚡

---

## 🎯 Основни функции

✅ **AI Import бутон** в Admin панела  
✅ **JSON/CSV парсър** с валидация  
✅ **Preview преди импорт** - виждаш какво ще се добави  
✅ **Auto-calculation** на общ коефициент  
✅ **Batch import** - импортирай множество прогнози наведнъж  
✅ **Error handling** - ясни съобщения за грешки  
✅ **Download examples** - примерни файлове за всеки tier  

---

## 📂 Файлове

### Документация:
- **`QUICK_START_AI.md`** - Бърз старт (5 минути)
- **`AI_IMPORT_GUIDE.md`** - Пълно ръководство стъпка по стъпка
- **`AI_PREDICTION_FORMAT.md`** - Техническа спецификация на формата

### Код:
- **`src/lib/aiPredictionParser.ts`** - Parser за JSON/CSV
- **`src/components/AIImportDialog.tsx`** - UI компонент за импорт
- **`src/pages/Admin.tsx`** - Интеграция в Admin панела

---

## 🚀 Как да използваш?

### Метод 1: Quick Start (Препоръчителен)

1. Прочети **`QUICK_START_AI.md`**
2. Copy/Paste prompt в ChatGPT
3. Import JSON в Admin панела
4. Готово! 🎉

### Метод 2: Детайлно ръководство

1. Прочети **`AI_IMPORT_GUIDE.md`**
2. Следвай стъпките
3. Виж примерите
4. Експериментирай!

### Метод 3: Техническа документация

1. Прочети **`AI_PREDICTION_FORMAT.md`**
2. Разбери JSON структурата
3. Създай custom интеграция

---

## 📋 JSON Формат (Кратко)

```json
{
  "prediction_date": "2025-01-27",
  "tier": "silver",
  "ticket_odds": 1.80,
  "matches": [
    {
      "match_date": "2025-01-27",
      "match_name": "Arsenal vs Chelsea",
      "prediction": "1 (Home Win)",
      "odds": 1.80
    }
  ]
}
```

**Задължителни полета:**
- `prediction_date` - Дата (YYYY-MM-DD)
- `tier` - silver / gold / platinum
- `matches` - Масив с мачове
- `match_date`, `match_name`, `prediction`, `odds` - За всеки мач

---

## 🎨 Примери

### Silver (1 мач)
```json
{
  "tier": "silver",
  "matches": [{ "odds": 1.80, ... }]
}
```

### Gold (3-5 мача)
```json
{
  "tier": "gold",
  "ticket_odds": 3.40,
  "matches": [
    { "odds": 1.70, ... },
    { "odds": 2.00, ... }
  ]
}
```

### Platinum (3-5 мача, висок коефициент)
```json
{
  "tier": "platinum",
  "ticket_odds": 9.00,
  "matches": [
    { "odds": 3.00, ... },
    { "odds": 3.00, ... }
  ]
}
```

---

## 🔧 Технически детайли

### Валидация:
- ✅ Проверка на задължителни полета
- ✅ Валидация на дати (YYYY-MM-DD)
- ✅ Tier: silver/gold/platinum
- ✅ Silver = точно 1 мач
- ✅ Коефициенти > 0
- ✅ Auto-calculate ticket_odds

### Поддържани формати:
- **JSON** (препоръчителен)
- **CSV** (алтернатива)
- **JSON Array** (за batch import)

### Error Handling:
- Ясни съобщения за грешки
- Preview преди импорт
- Възможност за корекция

---

## 🎯 Workflow

```
┌─────────────┐
│   AI Tool   │ (ChatGPT/Claude)
│  Generates  │
│    JSON     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Copy/Paste  │
│     or      │
│ Upload File │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Parser    │ (Validation)
│  & Preview  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Import    │ (Load to form)
│  to Admin   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Save     │ (Add Prediction)
│ to Database │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Mark     │ (WIN/LOSS/VOID)
│   Result    │
└─────────────┘
```

---

## 💡 Tips & Best Practices

### 1. Запази AI Prompt
Създай си template prompt и го използвай всеки ден.

### 2. Batch Import
Генерирай всички 3 tier-а наведнъж:
```json
[
  { "tier": "silver", ... },
  { "tier": "gold", ... },
  { "tier": "platinum", ... }
]
```

### 3. Използвай Examples
Кликни "Download Examples" за да видиш точния формат.

### 4. Провери Preview
Винаги провери preview-то преди да импортираш.

### 5. Auto-calculation
Не е нужно да изчисляваш ticket_odds - системата го прави автоматично.

---

## 🐛 Troubleshooting

### Грешка: "Invalid JSON format"
**Решение:** Провери дали JSON-ът е валиден (използвай jsonlint.com)

### Грешка: "Invalid tier"
**Решение:** Tier трябва да е: `silver`, `gold`, или `platinum` (малки букви)

### Грешка: "Silver tier must have exactly 1 match"
**Решение:** Silver може да има само 1 мач

### Грешка: "Invalid date format"
**Решение:** Използвай формат `YYYY-MM-DD` (напр. `2025-01-27`)

### Грешка: "Missing required fields"
**Решение:** Провери дали всички задължителни полета са попълнени

---

## 🔮 Бъдещи подобрения

- [ ] API интеграция за автоматично импортиране
- [ ] Scheduled imports (cron jobs)
- [ ] Bulk result marking
- [ ] AI integration за автоматично маркиране на резултати
- [ ] Export на прогнози в различни формати
- [ ] Statistics и analytics за AI прогнозите

---

## 📞 Поддръжка

За въпроси и проблеми:
1. Виж документацията
2. Провери примерите
3. Тествай с example файловете

---

## 📊 Статистики

**Време за добавяне на прогноза:**
- ❌ Ръчно: ~5 минути
- ✅ С AI Import: ~30 секунди

**Спестено време:**
- За 1 прогноза: 4.5 минути
- За 3 прогнози (дневно): 13.5 минути
- За месец (90 прогнози): **6.75 часа!** ⏰

---

## 🎉 Заключение

AI Import системата прави добавянето на прогнози:
- ⚡ **По-бързо** (30 секунди вместо 5 минути)
- ✅ **По-точно** (автоматична валидация)
- 🎯 **По-лесно** (copy/paste вместо ръчно въвеждане)

**Започни сега с `QUICK_START_AI.md`!** 🚀

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** ✅ Production Ready
