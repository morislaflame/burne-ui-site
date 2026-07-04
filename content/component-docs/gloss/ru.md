# Gloss

Система стеклянных поверхностей (glass morphism) в Burne UI. Gloss — не отдельный компонент, а **визуальный режим** (`variant="gloss"` или связанные пропы), который подключает CSS-классы `gloss-panel`, `gloss-btn`, `gloss-indicator` и GSAP-motion для интерактивных элементов.

## Подключение

```tsx
import "burne-ui/styles.css";
```

Gloss-токены и утилиты подтягиваются вместе с основными стилями пакета (`glossPanel.css`, `glossInteractive.css`).

## Как включить

### `variant="gloss"`

На компонентах с prop `variant`:

```tsx
<Button variant="gloss">Сохранить</Button>
<Input variant="gloss" label="Email" />
<Card variant="gloss">...</Card>
<Dialog variant="gloss">...</Dialog>
<Alert variant="gloss" status="info" title="Подсказка" />
```

### Другие API

| Компонент | Prop | Значение |
|-----------|------|----------|
| `Tooltip` | `surface` | `"gloss"` |
| `Slider` | `gloss` | `true` |
| `Switch` | `gloss` | `true` |
| `SelectionIndicator` | `variant` | `"gloss"` |

## Поддерживаемые компоненты

Gloss доступен на большинстве интерактивных и контейнерных примитивов:

**Actions:** `Button`, `CloseButton`, `ToggleButton`, `ToggleButtonGroup`, `ButtonGroup`, `Kbd`

**Forms:** `Input`, `TextArea`, `Select`, `ComboBox`, `SearchInput`, `TimeField`, `Checkbox`, `Switch`, `Radio` / `RadioGroup`, `Slider`, `ColorPicker`, `SelectionIndicator`, `Calendar`

**Feedback:** `Badge`, `Alert`, `Toast`

**Overlays:** `Tooltip`, `Popover`, `Dropdown`, `Dialog`, `Drawer`, `AlertDialog`

**Data display:** `Card`, `Table`, `Surface`, `Avatar`, `ListBox`

**Disclosure:** `Expandable`, `Disclosure`, `Accordion`

На странице showcase **Gloss** собрана матрица компонентов с единым стеклянным языком.

## CSS-классы

| Класс | Назначение |
|-------|------------|
| `gloss-panel` | Статическая стеклянная панель (Card, Surface, ListBox root) |
| `gloss-deep` | Усиленная глубина / conic-stroke |
| `gloss-btn` | Интерактивная кнопочная оболочка |
| `gloss-control` | Поля ввода без видимого border |
| `gloss-indicator` | Selection indicator / checkbox shell |
| `gloss-wrap` | Stacking context для shadow bloom |
| `gloss-shadow` | Мягкая тень вокруг gloss-контейнера |

Статусные тона на gloss-кнопках: `gloss-btn-danger`, `gloss-btn-success`, `gloss-btn-info`, `gloss-btn-warning`.

## Токены темы

Прозрачность, обводка и блик задаются CSS-переменными после `burne-ui/styles.css`:

| Токен | Назначение |
|-------|------------|
| `--color-surface` | Базовый фон стекла |
| `--color-border` | Обводка / edge |
| `--gloss-tint-default` | Тон градиента панели |
| `--gloss-edge` | Край conic-stroke |
| `--gloss-blur` | `backdrop-filter` blur |
| `--gloss-drop-shadow` | Тень под панелью |
| `--gloss-text` | Цвет текста на gloss-control |

Переопределяйте токены в `:root` / `[data-theme]` для светлой и тёмной темы.

## Анимации

Интерактивный gloss использует **отдельный motion pipeline** (не shadow sm→md):

- `animateGlossInteractiveHoverLift` / `animateGlossInteractivePressSqueeze`
- `useGlossInteractiveHandlers` + `GLOSS_INTERACTIVE_MOTION_CLASS`
- Shine / conic через `@property` (`--gloss-angle-1`, `--gloss-shine-x`, …)

### `configureMotion`

```ts
import { configureMotion } from "burne-ui";

configureMotion({
  interactiveDuration: 280,
  hoverLiftScale: 1.025,
  pressSqueezeScale: [1, 0.98, 1],
  enableHoverLift: true,
  enablePressSqueeze: true,
});
```

На отдельном компоненте: `animated={false}` или `hoverLift={false}` отключает motion локально.

**Reduced motion / touch:** через `shouldSkipInteractiveHoverLift()` — без scale/lift.

## Отличия от обычного variant

| | default / outline / secondary | gloss |
|---|------------------------------|-------|
| Фон | `bg-surface`, токены border | gradient + backdrop blur |
| Hover shadow | `--shadow-sm` через `--el-shadow` | gloss box-shadow + shine |
| Press | adaptive squeeze на корне | gloss squeeze curve |
| Status | semantic fill / outline | `gloss-btn-*` text tint |

## SSR и Next.js

Для `backdrop-filter` на сайте может понадобиться fallback в `globals.css` (см. комментарий в `burne-ui-site/app/globals.css`):

```css
:is(.gloss-panel, .gloss-control, .gloss-btn, .gloss-indicator) {
  backdrop-filter: blur(var(--gloss-blur));
}
```

Tailwind v4 при `@source` иногда оставляет только `-webkit-backdrop-filter`.

## Практические заметки

- Gloss **не заменяет** `status` — семантика остаётся через `status` prop и `gloss-btn-*` классы.
- Не переопределяйте `gloss-deep` / conic-gradient без нужды — глубина завязана на CSS.
- Вложенные gloss-панели: следите за `isolation` и z-index (`gloss-wrap`).
- Для полей в `ButtonGroup` / `Form` gloss наследует `variant` из контекста группы.

## Storybook

Демо gloss разбросаны по stories компонентов (`*Gloss*` stories) и сводная страница **Theme / Gloss** на showcase-сайте.
