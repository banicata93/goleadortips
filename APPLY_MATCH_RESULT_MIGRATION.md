# Как да приложиш migration за match_result

## Стъпки:

1. **Отвори Supabase Dashboard**
   - Влез в https://supabase.com/dashboard
   - Избери твоя проект

2. **SQL Editor**
   - От менюто отляво избери "SQL Editor"
   - Натисни "New query"

3. **Копирай и изпълни SQL**
   Копирай следния SQL код и го изпълни:

```sql
-- Add match_result column to prediction_matches table
ALTER TABLE prediction_matches 
ADD COLUMN IF NOT EXISTS match_result TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN prediction_matches.match_result IS 'Result of individual match: WIN, LOSS, or NULL for pending';
```

4. **Натисни "Run"**
   - Ще видиш "Success. No rows returned"
   - Това означава че колоната е добавена успешно

5. **Провери**
   - Отиди в "Table Editor"
   - Избери таблица "prediction_matches"
   - Трябва да видиш новата колона "match_result"

## Готово! 🎉

Сега можеш да маркираш отделни мачове като WIN или LOSS в Admin панела, и те ще се показват в червено когато са загубени.
