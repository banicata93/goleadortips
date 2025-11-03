# 📋 Инструкции за Деплоймънт към GitHub

## 🎯 Стъпка по Стъпка Ръководство

### Стъпка 1: Проверка на промените
Първо проверете какви файлове сте променили:

```bash
git status
```

Това ще покаже всички променени файлове в червено (unstaged) или зелено (staged).

---

### Стъпка 2: Добавяне на файловете към Git
Има два начина:

**Вариант А: Добавяне на всички променени файлове**
```bash
git add .
```

**Вариант Б: Добавяне на конкретни файлове**
```bash
git add src/components/FAQ.tsx
git add src/components/SubscriptionCard.tsx
git add src/pages/Index.tsx
```

---

### Стъпка 3: Commit на промените
Създайте commit с описателно съобщение:

```bash
git commit -m "Описание на промените"
```

**Примери за добри commit съобщения:**
- `"Update subscription features and pricing"`
- `"Fix FAQ text formatting"`
- `"Add new PayPal payment links for 15-day subscriptions"`
- `"Update testimonials and service descriptions"`

---

### Стъпка 4: Push към GitHub
Изпратете промените към GitHub:

```bash
git push origin main
```

Ако работите на друг branch (не main), заменете `main` с името на вашия branch.

---

### Стъпка 5: Проверка на Vercel
След push към GitHub:

1. **Отворете** [Vercel Dashboard](https://vercel.com)
2. **Влезте** в акаунта си
3. **Намерете** проекта `elite-pitch-picks-main`
4. **Проверете** статуса на деплоймънта (Building → Ready)
5. **Отворете** live сайта за да видите промените

---

## 🔄 Пълен Процес (Всички Команди Наред)

```bash
# 1. Проверка на промените
git status

# 2. Добавяне на всички файлове
git add .

# 3. Commit с описание
git commit -m "Update website content and fix bugs"

# 4. Push към GitHub
git push origin main
```

---

## ⚠️ Често Срещани Проблеми

### Проблем 1: "Changes not staged for commit"
**Решение:** Трябва да направите `git add` преди commit

```bash
git add .
git commit -m "Your message"
```

### Проблем 2: "Your branch is behind 'origin/main'"
**Решение:** Първо pull-нете промените от GitHub

```bash
git pull origin main
git push origin main
```

### Проблем 3: "Merge conflict"
**Решение:** Разрешете конфликтите ръчно в файловете

1. Отворете файловете с конфликти
2. Потърсете `<<<<<<<`, `=======`, `>>>>>>>`
3. Изберете коя версия да запазите
4. Премахнете маркерите
5. Запазете файла
6. Направете `git add` и `git commit`

### Проблем 4: Build грешка на Vercel
**Решение:** Проверете грешките в кода

1. Отворете Vercel Dashboard
2. Кликнете на failed deployment
3. Прочетете error log-а
4. Поправете грешката локално
5. Commit и push отново

---

## 📝 Проверка Преди Деплоймънт

Преди да направите push, проверете:

- ✅ Няма синтаксични грешки в кода
- ✅ Всички затворени скоби `{}`, `[]`, `()` са на място
- ✅ Всички запетаи `,` са добавени където трябва
- ✅ Текстовете имат space-ове след точки
- ✅ Няма "undefined" или "null" стойности
- ✅ PayPal линковете са правилни

---

## 🚀 Бързи Команди

### Проверка на Git статус
```bash
git status
```

### Виж последните commits
```bash
git log --oneline -5
```

### Отмени последния commit (ако не сте push-нали)
```bash
git reset --soft HEAD~1
```

### Виж разликите преди commit
```bash
git diff
```

### Виж кои файлове са променени
```bash
git diff --name-only
```

---

## 📞 Помощ

Ако имате проблеми:

1. Проверете error съобщението внимателно
2. Потърсете грешката в Google
3. Проверете Vercel deployment logs
4. Проверете дали всички файлове са commit-нати

---

## 🎓 Полезни Ресурси

- [Git Documentation](https://git-scm.com/doc)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Guides](https://guides.github.com/)

---

**Последна актуализация:** Ноември 2025
