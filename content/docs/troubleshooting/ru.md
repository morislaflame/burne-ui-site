# Troubleshooting

## Компонент есть, но стили «сломаны»

1. Подключён ли `@import "burne-ui/styles.css"`?
2. Есть ли `@source` на код приложения (`app/`, `components/`, …) — **без** `node_modules/burne-ui/dist`?
3. Оверрайды идут **после** импорта кита?
4. Есть ли `@import "burne-ui/theme-bridge.css"` (полный `@theme`-мост)? См. [Стили](/docs/styles).

## Turbopack / PostCSS fatal panic при `next dev`

Обычно из‑за `@source` на весь `burne-ui/dist` вместе с prebuilt `styles.css`. Уберите этот `@source` и очистите `.next`.

## Gloss-панели без blur

С **1.5.3+** blur уже в `burne-ui/styles.css`. Не копируйте fallback в `globals.css`. Если blur пропал — обновите пакет и проверьте оверрайды gloss в app CSS.

## Шрифт в Theme panel не меняется визуально

1. В DevTools на `<html>` меняется `--font-family-sans`
2. `@import "burne-ui/theme-bridge.css"` после импорта кита (или эквивалентный `@theme inline` с `--font-sans`)
3. `html, body { font-family: var(--font-family-sans); }`
4. Подключены Google Fonts / `next/font` для выбранного семейства

## `text-base` выглядит как 1rem вместо ~0.875rem

Подключите `burne-ui/theme-bridge.css` (или добавьте в `@theme inline`: `--text-base: var(--text-base-size);`).

## Не работает `useToast()`

- Нет `Toast.Provider` (или `BurneUIProvider` с toast) выше по дереву.

## Тема не переключается

- Атрибут ставится не на `document.documentElement` (`<html>`).

## Вспышка темы при загрузке (SSR)

- Нет `ThemeScript` / `getThemeScript` в root layout
- Не совпадают `storageKey` / `defaultTheme` у скрипта и провайдера
- Нет `suppressHydrationWarning` на `<html>`

## Анимации «не меняются»

- `configureMotion(...)` вызван слишком поздно или не в клиентском слое

## Final checklist

- [ ] `burne-ui` + `react-icons` + `gsap`
- [ ] `burne-ui/styles.css`
- [ ] Tailwind `@source` только на приложение
- [ ] `@import "burne-ui/theme-bridge.css"` + font-family на body
- [ ] `ThemeScript` + провайдер для светлой/тёмной темы
- [ ] Опционально motion + toast
