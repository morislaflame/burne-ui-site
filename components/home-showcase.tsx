"use client";

import {
  useCallback,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  type BadgeTone,
  Breadcrumbs,
  type AccordionItem,
  type BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  ButtonGroupText,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  Form,
  Input,
  SearchInput,
  Selector,
  SelectorOption,
  Text,
} from "burne-ui";
import { IoArrowForward, IoEllipsisHorizontal, IoGlobeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";

/** Ячейка сетки: на всю высоту ряда, контент по центру по вертикали и горизонтали. */
function GridSlot({
  label,
  children,
}: {
  label: string;
  children?: ReactNode;
}) {
  const empty = !children;
  return (
    <div
      className={`flex h-full min-h-0 min-w-0 w-full flex-col items-center justify-center rounded-base border border-base p-mid ${
        empty ? "border-dashed border-base/70 bg-transparent" : "bg-surface/40"
      }`}
    >
      {!children ? (
        <p className="text-center text-tools text-muted">{label}</p>
      ) : (
        children
      )}
    </div>
  );
}

const sampleOptions: SelectorOption[] = [
  {
    value: "ru",
    label: "Русский",
    description: "Интерфейс и уведомления на русском языке",
    icon: <IoGlobeOutline aria-hidden />,
  },
  {
    value: "en",
    label: "English",
    description: "UI and notifications in English",
    icon: <IoGlobeOutline aria-hidden />,
  },
  {
    value: "de",
    label: "Deutsch",
    description: "Nur Titel in der Auswahl; Beschreibung nur in der Liste",
    icon: <IoGlobeOutline aria-hidden />,
  },
];

const regionOptions: SelectorOption[] = [
  { value: "eu", label: "Европа", description: "EU, UK, ближний восток" },
  { value: "us", label: "Северная Америка", description: "США и Канада" },
  { value: "apac", label: "APAC", description: "Азия и Океания" },
];

/** Как в `burne-ui` `utils/mockImages` / стор AvatarGroup — замените на свои URL. */
const DEMO_AVATAR_IMAGE_1 =
  "https://i.pinimg.com/736x/89/e2/85/89e285ca1fc973db199bf395f7c89669.jpg";
const DEMO_AVATAR_IMAGE_2 =
  "https://i.pinimg.com/736x/d4/28/68/d42868c08e311574b445cf33cf33fabe.jpg";
const DEMO_AVATAR_IMAGE_3 =
  "https://i.pinimg.com/736x/9d/83/5b/9d835bb868de6d5fc886c68031129602.jpg";
const DEMO_AVATAR_IMAGE_4 =
  "https://i.pinimg.com/736x/ab/cb/a7/abcba71e1e62c9efb1e98b462058ce4c.jpg";

/** Как в `Breadcrumbs.stories.tsx` → Default (`shortChain`). */
function preventBreadcrumbNav(
  e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
) {
  e.preventDefault();
}

const breadcrumbsDemoItems: readonly BreadcrumbItem[] = [
  { label: "Главная", href: "#", onClick: preventBreadcrumbNav },
  { label: "Каталог", href: "#", onClick: preventBreadcrumbNav },
  { label: "Текущая страница" },
];

/** Как `VARIANT_GRID` в `Badge.stories.tsx` — все тона, размер по умолчанию. */
const badgeToneRow: readonly BadgeTone[] = [
  "default",
  "outline",
  "secondary",
  "danger",
  "success",
  "info",
  "warning",
];

const accordionInfoIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const accordionDemoItems: readonly AccordionItem[] = [
  {
    id: "delivery",
    title: "Как оформить заказ?",
    icon: accordionInfoIcon,
    content: (
      <Text variant="small" className="text-muted">
        Доставка по РФ 2–5 дней. Международная доставка рассчитывается отдельно.
      </Text>
    ),
  },
  {
    id: "returns",
    title: "При каких условиях можно вернуть товар?",
    content: (
      <Text variant="small" className="text-muted">
        Возврат возможен в течение 14 дней при сохранении товарного вида.
      </Text>
    ),
  },
  {
    id: "care",
    title: "Как ухаживать за товаром?",
    content: (
      <Text variant="small" className="text-muted">
        Избегайте абразивов и агрессивной химии. Хранить в сухом месте.
      </Text>
    ),
  },
];

/** Как в `Form.stories.tsx` → `ProfileForm` / `Default`. */
const formLocaleOptions: SelectorOption[] = [
  {
    value: "ru",
    label: "Русский",
    description: "Интерфейс и письма на русском",
  },
  {
    value: "en",
    label: "English",
    description: "UI and emails in English",
  },
  {
    value: "de",
    label: "Deutsch",
    description: "Oberfläche und E-Mails auf Deutsch",
  },
];

function ProfileFormDemo() {
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const [locale, setLocale] = useState("ru");

  return (
    <Form
      onSubmit={onSubmit}
      aria-label="Пример формы"
      className="w-full min-w-0 max-w-full"
    >
      <Input
        label="Имя"
        name="name"
        placeholder="Иван"
        autoComplete="name"
        isRequired
      />
      <Input
        label="Email"
        name="email"
        inputType="text"
        placeholder="you@example.com"
        autoComplete="email"
        isRequired
      />
      <Input
        label="Пароль"
        name="password"
        inputType="password"
        hint="Не менее 8 символов."
        autoComplete="new-password"
        isRequired
      />
      <Input
        label="Аватар"
        name="avatar"
        inputType="file"
        accept="image/*"
        placeholder="PNG или JPEG"
      />
      
      <div className="flex justify-end gap-plus pt-base">
        <Button type="button" variant="outline" size="base">
          Отмена
        </Button>
        <Button type="submit" variant="default" size="base">
          Сохранить
        </Button>
      </div>
    </Form>
  );
}

function ColumnTwoSelectors() {
  const [language, setLanguage] = useState("ru");
  const [region, setRegion] = useState("eu");

  return (
    <div className="flex w-full min-w-0 flex-col gap-mid">
      <Selector
        id="demo-selector-language"
        label="Язык интерфейса"
        hint={`Текущее значение: ${language}`}
        placeholder="Выберите язык"
        value={language}
        onValueChange={setLanguage}
        options={sampleOptions}
      />
      <Selector
        id="demo-selector-region"
        label="Регион"
        hint={`Текущее значение: ${region}`}
        placeholder="Выберите регион"
        value={region}
        onValueChange={setRegion}
        options={regionOptions}
      />
    </div>
  );
}

export function HomeShowcase() {
  return (
    <div className="mx-auto flex w-full flex-col gap-xlarge py-xlarge">
      <div className="flex flex-col gap-xlarge text-center items-center sm:text-left">
        <h1 className="text-6xl font-medium text-foreground">
          Burne UI — Design System
        </h1>
        <div className="flex flex-col items-center gap-xsmall">
        <Text variant="mid" className="max-w-component-mid text-muted">
          Готовые компоненты для вашего проекта на Tailwind CSS v4, токены темы и анимации. Собирайте приложения в разы быстрее.
        </Text>
        </div>
      </div>

      <div className="burne-site-showcase-grid">
        <GridSlot label="Колонка 1 — пример">
          <div className="flex flex-col gap-mid">
        <div className="flex flex-wrap items-center justify-center gap-plus">
          <Button variant="default">
            Default
          </Button>
          <Button variant="outline">
            Outline
          </Button>
          <Button variant="secondary">
            Secondary
          </Button>
          <Button variant="ghost" ripple>
            Ghost
          </Button>
          <Button variant="danger" ripple>
            Удалить
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-mid">
          <SearchInput ripple size="base" placeholder="Поиск" />
          <Dropdown selectionIndicator defaultValue="ru">
            <Dropdown.Trigger asChild>
              <Button variant="outline">Язык интерфейса</Button>
            </Dropdown.Trigger>
              <Dropdown.Content>
                <Dropdown.Group>
                  <Dropdown.Label>Выберите язык</Dropdown.Label>
                  <Dropdown.Item value="ru" description="Кириллица, локаль по умолчанию">
                    Русский
                  </Dropdown.Item>
                  <Dropdown.Item value="en" description="Latin script" hint={<IoGlobeOutline aria-hidden />}>
                    English
                  </Dropdown.Item>
                  <Dropdown.Item value="de" disabled description="Скоро">
                    Deutsch
                  </Dropdown.Item>
                </Dropdown.Group>
                <Dropdown.Separator />
                <Dropdown.Group>
                  <Dropdown.Label>Система</Dropdown.Label>
                  <Dropdown.Item value="sys" hint="⌘" selection={false}>
                    Настройки
                  </Dropdown.Item>
                </Dropdown.Group>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
        </GridSlot>

        <GridSlot label="Колонка 2 — пример">
          <ColumnTwoSelectors />
        </GridSlot>

        <GridSlot label="Колонка 3 — пример">
          <div className="flex w-full min-w-0 flex-col gap-mid">
            <Input
              variant="default"
              label="Текст"
              placeholder="Введите значение"
              hint="Вариант default — как в сторе Default."
              className="w-full min-w-0"
            />
            <Input
              variant="outline"
              inputType="password"
              label="Пароль"
              placeholder="••••••••"
              hint="Outline и тип password — как в сторях Outline и Password."
              className="w-full min-w-0"
            />
          </div>
        </GridSlot>

        <GridSlot label="Колонка 4 — Accordion">
          <Accordion
            items={accordionDemoItems}
            defaultOpenId="delivery"
            className="w-full"
          />
        </GridSlot>
        <GridSlot label="Колонка 5 — AvatarGroup">
          <div className="flex w-full min-w-0 flex-col items-center gap-xlarge">
            <div className="flex flex-wrap items-center justify-center gap-base">
              {badgeToneRow.map((tone) => (
                <Badge key={tone} color={tone} className="capitalize">
                  {tone}
                </Badge>
              ))}
            </div>
            <Breadcrumbs
                className="w-full max-w-full justify-center"
                items={breadcrumbsDemoItems}
              />
            <AvatarGroup>
              <Avatar size="base" label="Один" nickname="echo_north">
                <Avatar.Image src={DEMO_AVATAR_IMAGE_1} alt="" loading="lazy" />
                <Avatar.Fallback />
              </Avatar>
              <Avatar
                size="base"
                label="Два"
                nickname="orbit_fox"
                tooltipVariant="info"
              >
                <Avatar.Image src={DEMO_AVATAR_IMAGE_2} alt="" loading="lazy" />
                <Avatar.Fallback />
              </Avatar>
              <Avatar
                size="base"
                label="Три"
                nickname="vela_wave"
                tooltipVariant="success"
              >
                <Avatar.Image src={DEMO_AVATAR_IMAGE_3} alt="" loading="lazy" />
                <Avatar.Fallback />
              </Avatar>
              <Avatar
                size="base"
                label="Четыре"
                nickname="rust_line"
                tooltipVariant="default"
              >
                <Avatar.Image src={DEMO_AVATAR_IMAGE_4} alt="" loading="lazy" />
                <Avatar.Fallback />
              </Avatar>
              <Avatar
                size="base"
                label="Плюс пять"
                nickname="+5"
                tooltipVariant="warning"
              >
                <Avatar.Fallback />
              </Avatar>
            </AvatarGroup>
            
          </div>
        </GridSlot>
        <GridSlot label="Пустая ячейка — добавьте блок" >
          <div className="flex flex-col gap-mid">
          <Alert status="outline">
            <Alert.Message>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Outline</Alert.Title>
                <Alert.Description>Полупрозрачный фон с размытием.</Alert.Description>
              </Alert.Content>
            </Alert.Message>
          </Alert>

          <Alert status="danger">
            <Alert.Message>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Unable to connect to server</Alert.Title>
                <Alert.Description>
                  We&apos;re experiencing connection issues.
                </Alert.Description>
              </Alert.Content>
            </Alert.Message>
            <Alert.Action>
              <Button size="base" variant="danger">
                Retry
              </Button>
            </Alert.Action>
          </Alert>

          <Alert status="success">
            <Alert.Message>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Profile updated successfully</Alert.Title>
              </Alert.Content>
            </Alert.Message>
          </Alert>
          </div>
        </GridSlot>
        <GridSlot label="Колонка 6 — Card">
          <Card className="max-w-lg overflow-hidden">
            <div className="relative aspect-[16/8] w-full shrink-0 bg-muted">
              <img
                src={DEMO_AVATAR_IMAGE_1}
                alt="Абстрактный портрет в тёплых тонах"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <Card.Content>
              <div className="flex flex-wrap items-center gap-xsmall">
                <Badge color="info" size="small">
                  Редакция
                </Badge>
                <span className="inline-flex items-center gap-xsmall text-muted text-tools">
                  <IoTimeOutline className="icon-small shrink-0" aria-hidden />
                  8 мин
                </span>
              </div>
              <Card.Title className="mt-xsmall">Материал недели</Card.Title>
              <Card.Description>
                Крупное изображение без отступов по краям карточки; подпись и мета — в стандартном{" "}
                <code className="text-xs">Card.Content</code>.
              </Card.Description>
            </Card.Content>
            <Card.Footer className="flex items-center justify-between gap-base">
              <Text as="span" variant="tools" className="text-muted">
                Автор: студия
              </Text>
              <Button variant="ghost" size="base" ripple>
                Читать
                <IoArrowForward className="ml-xsmall inline icon-small align-middle" aria-hidden />
              </Button>
            </Card.Footer>
          </Card>
        </GridSlot>
        <GridSlot label="Колонка 7 — Badge">
          <div className="flex flex-col gap-xlarge">
          <ButtonGroup aria-label="Действия с документом">
            <ButtonGroupText>Вид</ButtonGroupText>
              <Button variant="outline" ripple>Список</Button>
              <Button variant="outline" groupSegment={{ orientation: "horizontal", position: "middle" }}>Сетка</Button>
              <Dropdown>
                <Dropdown.Trigger asChild>
                  <Button
                    variant="outline"
                    aria-label="Дополнительные действия"
                    iconOnly
                    groupSegment={{ orientation: "horizontal", position: "last" }}
                  >
                    <IoEllipsisHorizontal aria-hidden className="icon-base" />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item value="dup" selection={false}>
                    Дублировать
                  </Dropdown.Item>
                  <Dropdown.Item value="share" selection={false}>
                    Поделиться
                  </Dropdown.Item>
                  <Dropdown.Separator />
                  <Dropdown.Item value="del" variant="danger" selection={false}>
                    Удалить
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </ButtonGroup>
              <ButtonGroup orientation="vertical" buttonSize="base" aria-label="Вертикальная группа">
                <ButtonGroupText>Сортировка</ButtonGroupText>
                <Button variant="outline">По дате</Button>
                <Button variant="outline">По имени</Button>
                <Button variant="danger" leftIcon={<IoTrashOutline />}>
                  Удалить
                </Button>
              </ButtonGroup>

              <CheckboxGroup
                title="Уведомления"
                description="Один канал"
                selection="single"
                isRequired
              >
                <Checkbox name="channels" value="email" label="Email" />
                <Checkbox name="channels" value="push" label="Push в приложении" />
              </CheckboxGroup>
          </div>
        </GridSlot>
        <GridSlot label="Колонка 8 — Form">
          <ProfileFormDemo />
        </GridSlot>

      </div>
    </div>
  );
}
