# AI Prediction Import Format

## Формат за AI прогнози

### JSON Формат (Препоръчителен)

AI трябва да връща JSON файл със следната структура:

```json
{
  "prediction_date": "2025-01-27",
  "tier": "silver",
  "ticket_odds": 1.85,
  "matches": [
    {
      "match_date": "2025-01-27",
      "match_name": "Arsenal vs Chelsea",
      "prediction": "1 (Home Win)",
      "odds": 1.85
    }
  ]
}
```

### CSV Формат (Алтернатива)

За CSV формат, използвайте следните колони:

```csv
prediction_date,tier,match_date,match_name,prediction,odds
2025-01-27,silver,2025-01-27,Arsenal vs Chelsea,1 (Home Win),1.85
```

## Полета

### Задължителни полета:

1. **prediction_date** - Дата на прогнозата (YYYY-MM-DD)
2. **tier** - Пакет: `silver`, `gold`, или `platinum`
3. **match_date** - Дата на мача (YYYY-MM-DD)
4. **match_name** - Име на мача (напр. "Arsenal vs Chelsea")
5. **prediction** - Прогноза (напр. "1 (Home Win)", "Over 2.5", "BTTS Yes")
6. **odds** - Коефициент (число, напр. 1.85)

### Опционални полета:

- **ticket_odds** - Общ коефициент на билета (за акумулатори)
- **result** - Резултат (ако е известен): "✅ WIN", "❌ LOSS", "⚠️ VOID"

## Примери за различни пакети

### Silver (Single Match)
```json
{
  "prediction_date": "2025-01-27",
  "tier": "silver",
  "ticket_odds": 1.80,
  "matches": [
    {
      "match_date": "2025-01-27",
      "match_name": "Manchester City vs Liverpool",
      "prediction": "Over 2.5 Goals",
      "odds": 1.80
    }
  ]
}
```

### Gold (Accumulator 3-5 matches)
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

### Platinum (High Odds Accumulator)
```json
{
  "prediction_date": "2025-01-27",
  "tier": "platinum",
  "ticket_odds": 45.00,
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
      "odds": 5.00
    },
    {
      "match_date": "2025-01-27",
      "match_name": "Atletico vs Sevilla",
      "prediction": "1X",
      "odds": 3.00
    }
  ]
}
```

## Множество прогнози (Batch Import)

За импортиране на множество прогнози наведнъж:

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

## Валидни типове прогнози

- `1 (Home Win)` - Победа за домакините
- `X (Draw)` - Равен
- `2 (Away Win)` - Победа за гостите
- `1X` - Домакин или равен
- `X2` - Гост или равен
- `12` - Домакин или гост
- `Over 1.5` - Над 1.5 гола
- `Over 2.5` - Над 2.5 гола
- `Over 3.5` - Над 3.5 гола
- `Under 2.5` - Под 2.5 гола
- `Under 3.5` - Под 3.5 гола
- `BTTS Yes` - И двата отбора ще вкарат
- `BTTS No` - Поне един отбор няма да вкара
- `Home Win & Over 2.5` - Домакин печели и над 2.5 гола
- `Away Win & Over 2.5` - Гост печели и над 2.5 гола
- `Home Win & BTTS` - Домакин печели и двата вкарват
- `Clean Sheet Home` - Домакин без допуснат гол
- `Clean Sheet Away` - Гост без допуснат гол

## Инструкции за AI

### Prompt за AI:
```
Генерирай футболна прогноза в JSON формат със следната структура:
- prediction_date: днешна дата (YYYY-MM-DD)
- tier: "silver" (за сингъл), "gold" (за акумулатор 3-5 мача), или "platinum" (за висок коефициент)
- ticket_odds: общ коефициент (изчислен като произведение на всички коефициенти)
- matches: масив от мачове, всеки със:
  - match_date: дата на мача
  - match_name: "Отбор 1 vs Отбор 2"
  - prediction: тип прогноза (напр. "1 (Home Win)", "Over 2.5")
  - odds: коефициент (число)

Изисквания:
- Silver: 1 мач, коефициент 1.70-1.90
- Gold: 3-5 мача, общ коефициент 3.0-4.0
- Platinum: 3-5 мача, общ коефициент 8.0-10.0
```

## Грешки и валидация

Системата ще валидира:
- ✅ Всички задължителни полета са попълнени
- ✅ Датите са в правилен формат
- ✅ Tier е един от: silver, gold, platinum
- ✅ Коефициентите са положителни числа
- ✅ За silver има точно 1 мач
- ✅ За gold/platinum има поне 1 мач

## Workflow

1. AI генерира JSON файл
2. Качваш файла в Admin панела
3. Системата парсва и показва preview
4. Потвърждаваш импорта
5. След мача маркираш резултата: WIN / LOSS / VOID
