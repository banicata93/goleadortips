# 🚀 Quick Start - AI Import (5 минути)

## 📋 Какво ще научиш?

Как да използваш AI (ChatGPT/Claude) за автоматично генериране на прогнози и да ги импортираш с 1 клик.

---

## 🎯 Стъпка 1: Копирай този Prompt в ChatGPT/Claude

```
Генерирай футболна прогноза за днес в JSON формат.

Изисквания:
- prediction_date: днешна дата (YYYY-MM-DD)
- tier: "silver" (за 1 мач с коефициент 1.70-1.90)
- matches: масив с 1 мач
- Всеки мач има: match_date, match_name, prediction, odds

Пример структура:
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

Генерирай реална прогноза за днешни мачове.
```

---

## 📥 Стъпка 2: Copy/Paste в Admin

1. Отвори: http://localhost:8080/admin
2. Кликни **"AI Import"** бутон (горе вдясно)
3. **Paste** JSON-а от AI в текстовото поле
4. Кликни **"Parse Content"**
5. Виж preview-то (трябва да е зелено ✅)
6. Кликни **"Import 1 Prediction(s)"**
7. Кликни **"Add Prediction"** за да запазиш

**Готово!** Прогнозата е публикувана! 🎉

---

## ✅ Стъпка 3: Маркирай резултат (след мача)

1. Намери прогнозата в списъка
2. Кликни:
   - **WIN** ✅ - ако е печеливша
   - **LOSS** ❌ - ако е загубена
   - **VOID** ⚠️ - ако мачът е отменен

---

## 🎨 Примери за различни пакети

### Silver (1 мач, коефициент 1.70-1.90)

**Prompt:**
```
Генерирай Silver прогноза (1 мач, коефициент 1.70-1.90) за днес в JSON формат.
```

**AI отговор:**
```json
{
  "prediction_date": "2025-01-27",
  "tier": "silver",
  "ticket_odds": 1.85,
  "matches": [
    {
      "match_date": "2025-01-27",
      "match_name": "Manchester City vs Liverpool",
      "prediction": "Over 2.5 Goals",
      "odds": 1.85
    }
  ]
}
```

---

### Gold (3-5 мача, общ коефициент 3.0-4.0)

**Prompt:**
```
Генерирай Gold прогноза (акумулатор с 3 мача, общ коефициент около 3.5) за днес в JSON формат.
```

**AI отговор:**
```json
{
  "prediction_date": "2025-01-27",
  "tier": "gold",
  "ticket_odds": 3.40,
  "matches": [
    {
      "match_date": "2025-01-27",
      "match_name": "Arsenal vs Chelsea",
      "prediction": "1 (Home Win)",
      "odds": 1.70
    },
    {
      "match_date": "2025-01-27",
      "match_name": "Barcelona vs Atletico",
      "prediction": "Over 2.5",
      "odds": 2.00
    }
  ]
}
```

---

### Platinum (3-5 мача, общ коефициент 8.0-10.0)

**Prompt:**
```
Генерирай Platinum прогноза (акумулатор с 3 мача, общ коефициент около 9.0) за днес в JSON формат.
```

**AI отговор:**
```json
{
  "prediction_date": "2025-01-27",
  "tier": "platinum",
  "ticket_odds": 9.00,
  "matches": [
    {
      "match_date": "2025-01-27",
      "match_name": "Juventus vs Inter",
      "prediction": "2 (Away Win)",
      "odds": 3.00
    },
    {
      "match_date": "2025-01-27",
      "match_name": "PSG vs Lyon",
      "prediction": "Home Win & Over 2.5",
      "odds": 3.00
    }
  ]
}
```

---

## 🔥 Pro Tips

### 1. Генерирай всички 3 пакета наведнъж

**Prompt:**
```
Генерирай 3 прогнози за днес (Silver, Gold, Platinum) в един JSON масив.
```

**AI отговор:**
```json
[
  {
    "prediction_date": "2025-01-27",
    "tier": "silver",
    "matches": [...]
  },
  {
    "prediction_date": "2025-01-27",
    "tier": "gold",
    "matches": [...]
  },
  {
    "prediction_date": "2025-01-27",
    "tier": "platinum",
    "matches": [...]
  }
]
```

Импортирай всички 3 наведнъж! 🚀

---

### 2. Запази Prompt-а

Създай си файл `my-ai-prompt.txt`:

```
Генерирай футболни прогнози за днес:

1. Silver: 1 мач, коефициент 1.70-1.90
2. Gold: 3 мача, общ коефициент 3.0-4.0
3. Platinum: 3 мача, общ коефициент 8.0-10.0

Формат: JSON масив с 3 обекта.
Използвай реални днешни мачове от топ лиги.
```

Всеки ден просто copy/paste в AI! ⚡

---

### 3. Валидни типове прогнози

AI може да използва:
- `1 (Home Win)`, `X (Draw)`, `2 (Away Win)`
- `Over 2.5`, `Under 2.5`
- `BTTS Yes`, `BTTS No`
- `1X`, `X2`, `12`
- `Home Win & Over 2.5`
- `Clean Sheet Home`

---

## 🎬 Видео Tutorial (Идея)

1. Отвори ChatGPT
2. Paste prompt
3. Copy JSON
4. Отвори Admin
5. AI Import → Paste → Import
6. Add Prediction
7. **Готово за 30 секунди!** ⏱️

---

## ❓ FAQ

**Q: AI генерира грешен формат?**
A: Кликни "Download Examples" в AI Import диалога за да видиш точния формат.

**Q: Мога ли да редактирам след импорт?**
A: Да! Данните се зареждат в формата и можеш да ги променяш преди да запазиш.

**Q: Какво ако AI сгреши датата?**
A: Просто промени `prediction_date` и `match_date` преди да импортираш.

**Q: Мога ли да импортирам CSV?**
A: Да, но JSON е по-лесен. Виж `AI_PREDICTION_FORMAT.md` за CSV формат.

---

## 🎯 Резюме

1. **Prompt → AI** (10 секунди)
2. **Copy → Admin → Import** (20 секунди)
3. **Add Prediction** (5 секунди)
4. **Маркирай резултат след мача** (5 секунди)

**Общо време: ~40 секунди вместо 5 минути ръчно въвеждане!** 🚀

---

## 📚 Допълнителни ресурси

- Пълна документация: `AI_PREDICTION_FORMAT.md`
- Детайлно ръководство: `AI_IMPORT_GUIDE.md`
- Примери в Admin панела: Бутон "Download Examples"

---

**Готов си! Започни да използваш AI за прогнози! 🎉**
