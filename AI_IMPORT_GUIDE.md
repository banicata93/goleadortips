# 📋 AI Import Guide - Стъпка по стъпка

## 🎯 Какво прави системата?

Системата позволява да импортираш прогнози от AI директно в Admin панела, без да въвеждаш всичко ръчно.

## 📝 Стъпка 1: AI трябва да генерира JSON файл

### Prompt за AI (ChatGPT, Claude, и др.):

```
Генерирай футболна прогноза в JSON формат:

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

Изисквания:
- Silver: 1 мач, коефициент 1.70-1.90
- Gold: 3-5 мача, общ коефициент 3.0-4.0
- Platinum: 3-5 мача, общ коефициент 8.0-10.0
```

### AI ще върне нещо като:

**За Silver:**
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

**За Gold:**
```json
{
  "prediction_date": "2025-01-27",
  "tier": "gold",
  "ticket_odds": 8.50,
  "matches": [
    {
      "match_date": "2025-01-27",
      "match_name": "Arsenal vs Chelsea",
      "prediction": "1 (Home Win)",
      "odds": 1.70
    },
    {
      "match_date": "2025-01-27",
      "match_name": "Barcelona vs Real Madrid",
      "prediction": "Over 2.5",
      "odds": 2.00
    },
    {
      "match_date": "2025-01-27",
      "match_name": "Bayern vs Dortmund",
      "prediction": "BTTS Yes",
      "odds": 2.50
    }
  ]
}
```

## 🖥️ Стъпка 2: Импортиране в Admin панела

1. **Отвори Admin панела** (http://localhost:8080/admin)

2. **Кликни на "AI Import" бутона** (горе вдясно до "Copy Last")

3. **Избери метод на импортиране:**
   - **Опция A:** Качи JSON файл (натисни "Choose File")
   - **Опция B:** Copy/Paste JSON текста директно в текстовото поле

4. **Натисни "Parse Content"** - системата ще валидира данните

5. **Провери Preview:**
   - ✅ Зелена карта = Всичко е OK
   - ❌ Червена карта = Има грешки (виж какво трябва да се поправи)

6. **Натисни "Import X Prediction(s)"**

7. **Данните се зареждат в формата** - готови за запазване!

## ✅ Стъпка 3: Маркиране на резултат

След като мачът приключи:

1. **Намери прогнозата в списъка**

2. **Кликни на един от бутоните:**
   - 🟢 **WIN** - Прогнозата е печеливша
   - 🔴 **LOSS** - Прогнозата е загубена
   - 🟡 **VOID** - Мачът е отменен/върнат

3. **Готово!** Резултатът се показва в Archives

## 📊 Примерен Workflow

### Ден 1 (Сутрин):
1. Питаш AI: "Генерирай Silver прогноза за днес"
2. AI връща JSON
3. Copy/Paste в Admin → Import
4. Натискаш "Add Prediction"
5. Прогнозата е публикувана!

### Ден 1 (Вечер):
1. Отваряш Admin панела
2. Намираш прогнозата
3. Кликаш "WIN" или "LOSS"
4. Готово!

## 🎨 Валидни типове прогнози

AI може да използва следните прогнози:

### Основни:
- `1 (Home Win)` - Победа домакини
- `X (Draw)` - Равен
- `2 (Away Win)` - Победа гости

### Double Chance:
- `1X` - Домакин или равен
- `X2` - Гост или равен
- `12` - Домакин или гост

### Голове:
- `Over 1.5` / `Over 2.5` / `Over 3.5`
- `Under 2.5` / `Under 3.5`

### BTTS (Both Teams To Score):
- `BTTS Yes` - И двата вкарват
- `BTTS No` - Поне един не вкарва

### Комбинирани:
- `Home Win & Over 2.5`
- `Away Win & Over 2.5`
- `Home Win & BTTS`
- `Clean Sheet Home`
- `Clean Sheet Away`

## 🚨 Често срещани грешки

### Грешка: "Invalid tier"
**Решение:** Tier трябва да е точно: `silver`, `gold`, или `platinum` (малки букви)

### Грешка: "Silver tier must have exactly 1 match"
**Решение:** Silver може да има само 1 мач

### Грешка: "Invalid date format"
**Решение:** Датата трябва да е във формат `YYYY-MM-DD` (напр. `2025-01-27`)

### Грешка: "Invalid odds"
**Решение:** Коефициентът трябва да е число (напр. `1.85`, не `"1.85"`)

## 💡 Tips & Tricks

1. **Използвай "Download Examples"** бутона за да видиш точния формат

2. **За множество прогнози** (Silver, Gold, Platinum за един ден):
   ```json
   [
     { "tier": "silver", ... },
     { "tier": "gold", ... },
     { "tier": "platinum", ... }
   ]
   ```

3. **AI може да изчисли ticket_odds автоматично** - просто не го включвай и системата ще го изчисли

4. **Запази AI prompt-а** за бързо генериране всеки ден

## 🔄 Автоматизация (Бъдеще)

В бъдеще може да добавим:
- Автоматично импортиране от API
- Scheduled imports (всеки ден в 10:00)
- Bulk result marking
- AI integration за автоматично маркиране на резултати

## 📞 Нужда от помощ?

Виж пълната документация в `AI_PREDICTION_FORMAT.md`
