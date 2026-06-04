"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  AvatarGroup,
  Badge,
  type BadgeTone,
  Breadcrumbs,
  Button,
  ButtonGroup,
  ButtonGroupText,
  Calendar,
  Card,
  Checkbox,
  CheckboxGroup,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ComboBox,
  Dialog,
  Disclosure,
  DisclosureGroup,
  Drawer,
  Dropdown,
  Expandable,
  Input,
  Link,
  ListBox,
  Loading,
  Meter,
  Pagination,
  Popover,
  ProgressBar,
  Radio,
  RadioGroup,
  SearchInput,
  Separator,
  Skeleton,
  Slider,
  Surface,
  Switch,
  Table,
  Tabs,
  Text,
  TextArea,
  TimeField,
  Toast,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  useToast,
} from "burne-ui";
import {
  IoBarChartOutline,
  IoBriefcaseOutline,
  IoDocumentOutline,
  IoFolderOutline,
  IoGlobeOutline,
  IoHeart,
  IoHeartOutline,
  IoHomeOutline,
  IoOpenOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoStarOutline,
  IoTrashOutline,
} from "react-icons/io5";

// ─── Layout helpers ──────────────────────────────────────────────────────────

function ShowcaseCard({
  title,
  description,
  children,
  cols = 5,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  cols?: 2 | 3 | 5;
}) {
  const colsCls = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    5: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
  }[cols];

  return (
    <div data-brn-section={title} className="flex w-full flex-col gap-xlarge rounded-xl border border-base bg-surface/40 p-large">
      <div className="flex flex-col gap-xsmall">
        <Text as="h2" variant="mid" className="font-semibold text-foreground">
          {title}
        </Text>
        {description && (
          <Text variant="small" className="text-muted">
            {description}
          </Text>
        )}
      </div>
      <div className={`grid w-full grid-cols-1 items-start gap-large ${colsCls}`}>
        {children}
      </div>
    </div>
  );
}

function Ex({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-large">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted/60">{label}</p>
      <div className="flex min-w-0 flex-col items-center gap-small">{children}</div>
    </div>
  );
}

/** Блочный компонент — 2/3 ширины ячейки, центрирован. */
function Block({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-[66.667%] min-w-0">{children}</div>;
}

// ─── Stateful demo components ────────────────────────────────────────────────

function LikeButton({ variant }: { variant: "default" | "outline" | "ghost" }) {
  const [liked, setLiked] = useState(false);
  return (
    <ToggleButton
      pressed={liked}
      onPressedChange={setLiked}
      variant={variant}
      leftIcon={liked ? <IoHeart /> : <IoHeartOutline />}
    >
      {liked ? "Нравится" : "Нравится"}
    </ToggleButton>
  );
}

function StarButton({ variant }: { variant: "default" | "outline" | "ghost" }) {
  const [starred, setStarred] = useState(false);
  return (
    <ToggleButton
      pressed={starred}
      onPressedChange={setStarred}
      variant={variant}
      leftIcon={<IoStarOutline />}
    >
      {starred ? "Сохранено" : "Сохранить"}
    </ToggleButton>
  );
}

function ViewToggle() {
  const [view, setView] = useState("grid");
  return (
    <ToggleButtonGroup
      type="single"
      value={view}
      onValueChange={(v) => { if (typeof v === "string" && v) setView(v); }}
    >
      <ToggleButton value="list">Список</ToggleButton>
      <ToggleButton value="grid">Сетка</ToggleButton>
      <ToggleButton value="table">Таблица</ToggleButton>
    </ToggleButtonGroup>
  );
}

function MultiSelect() {
  return (
    <ToggleButtonGroup type="multiple" defaultValue={["react"]}>
      <ToggleButton value="react">React</ToggleButton>
      <ToggleButton value="vue">Vue</ToggleButton>
      <ToggleButton value="svelte">Svelte</ToggleButton>
    </ToggleButtonGroup>
  );
}

function PaginationDemo({ totalPages = 10, siblingCount = 1 }: { totalPages?: number; siblingCount?: number }) {
  const [page, setPage] = useState(3);
  return (
    <Pagination page={page} totalPages={totalPages} siblingCount={siblingCount} onPageChange={setPage}>
      <Pagination.Previous />
      <Pagination.Pages />
      <Pagination.Next />
    </Pagination>
  );
}

const DEMO_IMG = "https://i.pinimg.com/736x/89/e2/85/89e285ca1fc973db199bf395f7c89669.jpg";
const DEMO_IMG2 = "https://i.pinimg.com/736x/d4/28/68/d42868c08e311574b445cf33cf33fabe.jpg";
const DEMO_IMG3 = "https://i.pinimg.com/736x/9d/83/5b/9d835bb868de6d5fc886c68031129602.jpg";

const COMBO_OPTIONS = [
  { value: "ru", label: "Русский", hint: "Интерфейс на русском", icon: <IoGlobeOutline aria-hidden /> },
  { value: "en", label: "English", hint: "UI in English", icon: <IoGlobeOutline aria-hidden /> },
  { value: "de", label: "Deutsch", hint: "Немецкий язык", icon: <IoGlobeOutline aria-hidden /> },
];

const TABLE_USERS = [
  { id: 1, name: "Kate Moore", role: "CEO", status: "Active" as const, email: "kate@acme.com" },
  { id: 2, name: "John Smith", role: "CTO", status: "Active" as const, email: "john@acme.com" },
  { id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave" as const, email: "sara@acme.com" },
  { id: 4, name: "Emily Davis", role: "Product", status: "Inactive" as const, email: "emily@acme.com" },
];

const STATUS_BADGE: Record<(typeof TABLE_USERS)[number]["status"], BadgeTone> = {
  Active: "success",
  Inactive: "danger",
  "On Leave": "warning",
};

const STATUS_ROW_TONE = STATUS_BADGE;

function DrawerDemo({
  label,
  placement = "right",
  size = "default",
  withHandle = false,
}: {
  label: string;
  placement?: "right" | "left" | "bottom" | "top";
  size?: "default" | "mid" | "full";
  withHandle?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>{label}</Button>
      <Drawer open={open} onOpenChange={setOpen} placement={placement} size={size}>
        {withHandle && <Drawer.Handle />}
        <Drawer.Header>
          <Drawer.HeadingBlock>
            <Drawer.Title>{label}</Drawer.Title>
            <Drawer.Description>placement: {placement}{size !== "default" ? `, size: ${size}` : ""}</Drawer.Description>
          </Drawer.HeadingBlock>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Body>
          <p className="text-base text-muted">Контент выдвижной панели.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={() => setOpen(false)}>Готово</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}

function DialogDemo({ label = "Открыть Dialog" }: { label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>{label}</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Настройки экспорта</Dialog.Title>
            <Dialog.Description>Выберите формат и директорию для сохранения.</Dialog.Description>
          </Dialog.HeadingBlock>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          <p className="text-sm text-muted">Произвольный контент: поля, списки, предпросмотр.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={() => setOpen(false)}>Сохранить</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

function DialogFormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>С формой</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Новый проект</Dialog.Title>
            <Dialog.Description>Заполните основные поля.</Dialog.Description>
          </Dialog.HeadingBlock>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          <div className="flex flex-col gap-small">
            <Input label="Название" placeholder="Мой проект" />
            <Input label="Описание" placeholder="Кратко о проекте" />
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={() => setOpen(false)}>Создать</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

function DialogSimpleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Простой</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Заголовок</Dialog.Title>
          </Dialog.HeadingBlock>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          <p className="text-sm text-muted">Без описания в шапке.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

function DialogScrollDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Скролл</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Длинный контент</Dialog.Title>
            <Dialog.Description>Body прокручивается при переполнении.</Dialog.Description>
          </Dialog.HeadingBlock>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i} className="mb-plus text-sm text-muted">Абзац {i + 1}. Текст для демонстрации скролла.</p>
          ))}
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

function DialogFooterDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>Footer</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Подтвердите действие</Dialog.Title>
          </Dialog.HeadingBlock>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          <p className="text-sm text-muted">Короткое сообщение.</p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Нет</Button>
          <Button variant="danger" onClick={() => setOpen(false)}>Да, удалить</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

function AlertDialogDemo({
  label,
  status,
  description,
  confirm,
}: {
  label: string;
  status?: "default" | "danger" | "success" | "info" | "warning";
  description?: string;
  confirm?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>{label}</Button>
      <AlertDialog open={open} onOpenChange={setOpen} status={status}>
        <AlertDialog.Header>
          <AlertDialog.HeadingBlock>
            <AlertDialog.Title>Подтверждение</AlertDialog.Title>
            <AlertDialog.Description>{description ?? "Окно не закроется по клику вне панели."}</AlertDialog.Description>
          </AlertDialog.HeadingBlock>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant={status === "danger" ? "danger" : "default"} onClick={() => setOpen(false)}>
            {confirm ?? "Продолжить"}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog>
    </>
  );
}

function ToastQuickDemo({ method }: { method: "success" | "danger" | "info" | "warning" | "promise" }) {
  const { toast } = useToast();
  if (method === "promise") {
    return (
      <Button
        variant="outline"
        onClick={() => {
          const p = new Promise<string>((resolve) => setTimeout(() => resolve("Готово"), 2000));
          toast.promise(p, {
            loading: "Сохранение…",
            success: (v) => `${v}! Данные сохранены`,
            error: "Не удалось сохранить",
          });
        }}
      >
        Promise
      </Button>
    );
  }
  const handlers = {
    success: () => toast.success("Файл сохранён", { description: "Синхронизация выполнена" }),
    danger: () => toast.danger("Ошибка соединения", { description: "Проверьте сеть" }),
    info: () => toast.info("Доступна новая версия"),
    warning: () => toast.warning("Хранилище почти заполнено"),
  };
  return (
    <Button variant={method === "danger" ? "danger" : method === "success" ? "default" : "outline"} onClick={handlers[method]}>
      {method}
    </Button>
  );
}

function ColorPickerDemo({ showAlpha = false }: { showAlpha?: boolean }) {
  const [color, setColor] = useState("#3b82f6");
  return (
    <div className="flex flex-col items-center gap-small">
      <ColorPicker value={color} onValueChange={setColor}>
        <ColorPicker.Trigger />
        <ColorPicker.Content showAlpha={showAlpha} />
      </ColorPicker>
      <Text variant="small" className="font-mono text-muted">{color}</Text>
    </div>
  );
}

function ColorPickerPresetsDemo() {
  const [color, setColor] = useState("#3b82f6");
  const presets = ["#ef4444", "#f97316", "#22c55e", "#3b82f6", "#a855f7"];
  return (
    <ColorPicker value={color} onValueChange={setColor}>
      <ColorPicker.Trigger />
      <ColorPicker.Content presets={presets} />
    </ColorPicker>
  );
}

// ─── Custom demo helpers ──────────────────────────────────────────────────────

function AsyncButtonDemo() {
  const [saving, setSaving] = useState(false);
  return (
    <div className="flex items-center gap-small">
      <Button
        leftIcon={saving ? <Loading size="small" color="accent" /> : undefined}
        disabled={saving}
        onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 2000); }}
      >
        {saving ? "Сохранение…" : "Сохранить"}
      </Button>
      <Button variant="ghost" disabled={saving}>Отмена</Button>
    </div>
  );
}

function CharCountTextArea() {
  const [val, setVal] = useState("");
  const max = 280;
  return (
    <div className="flex w-full flex-col gap-xsmall">
      <TextArea
        label="Твит"
        placeholder="Что происходит?"
        value={val}
        onChange={(e) => setVal((e.target as HTMLTextAreaElement).value)}
        rows={3}
      />
      <Text
        variant="small"
        className={`self-end ${val.length > max * 0.9 ? "text-warning" : "text-muted"}`}
      >
        {val.length} / {max}
      </Text>
    </div>
  );
}

function RGBSliderDemo() {
  const [r, setR] = useState(99);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);
  return (
    <div className="flex w-full flex-col gap-small">
      {([
        { label: "R", value: r, set: setR, cls: "text-danger" },
        { label: "G", value: g, set: setG, cls: "text-success" },
        { label: "B", value: b, set: setB, cls: "text-info" },
      ] as const).map(({ label, value, set, cls }) => (
        <div key={label} className="flex items-center gap-small">
          <span className={`w-4 shrink-0 font-mono text-xs font-bold ${cls}`}>{label}</span>
          <Slider value={value} onValueChange={set} min={0} max={255} className="flex-1">
            <Slider.Track><Slider.Rail /><Slider.Fill /><Slider.Thumb /></Slider.Track>
          </Slider>
          <span className="w-8 text-right font-mono text-xs text-muted">{value}</span>
        </div>
      ))}
      <div
        className="mt-xsmall h-8 w-full rounded-mid border border-base"
        style={{ backgroundColor: `rgb(${r},${g},${b})` }}
      />
    </div>
  );
}

function ColorSwatchPicker() {
  const [sel, setSel] = useState("#3b82f6");
  const palette = ["#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#a855f7","#ec4899","#6b7280"];
  return (
    <div className="flex flex-col items-center gap-mid">
      <div className="flex flex-wrap gap-small">
        {palette.map((c) => (
          <ColorSwatch
            key={c}
            color={c}
            size="mid"
            selected={sel === c}
            onClick={() => setSel(c)}
            aria-label={c}
          />
        ))}
      </div>
      <div className="flex items-center gap-small">
        <div className="h-6 w-6 rounded-small border border-base" style={{ backgroundColor: sel }} />
        <Text variant="small" className="font-mono text-muted">{sel}</Text>
      </div>
    </div>
  );
}

function FilterDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" leftIcon={<IoSettingsOutline />} onClick={() => setOpen(true)}>Фильтры</Button>
      <Drawer open={open} onOpenChange={setOpen} placement="right">
        <Drawer.Header>
          <Drawer.HeadingBlock>
            <Drawer.Title>Фильтры</Drawer.Title>
            <Drawer.Description>Уточните параметры поиска</Drawer.Description>
          </Drawer.HeadingBlock>
          <Drawer.Close />
        </Drawer.Header>
        <Drawer.Body>
          <div className="flex flex-col gap-large">
            <CheckboxGroup selection="multiple">
              <CheckboxGroup.Legend><CheckboxGroup.Label>Тип</CheckboxGroup.Label></CheckboxGroup.Legend>
              <CheckboxGroup.List>
                <Checkbox name="type" value="doc" label="Документы" defaultChecked />
                <Checkbox name="type" value="img" label="Изображения" />
                <Checkbox name="type" value="vid" label="Видео" />
              </CheckboxGroup.List>
            </CheckboxGroup>
            <RadioGroup defaultValue="any" name="sort">
              <RadioGroup.Legend><RadioGroup.Label>Сортировка</RadioGroup.Label></RadioGroup.Legend>
              <RadioGroup.List>
                <Radio value="any" label="По умолчанию" />
                <Radio value="date" label="По дате" />
                <Radio value="size" label="По размеру" />
              </RadioGroup.List>
            </RadioGroup>
            <div className="flex flex-col gap-small">
              <Text variant="small" className="font-semibold text-foreground">Диапазон</Text>
              <Slider label="Размер файла" defaultValue={[10, 80]}>
                <Slider.Track><Slider.Rail /><Slider.Fill /><Slider.Thumb /><Slider.Thumb /></Slider.Track>
              </Slider>
            </div>
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>Сбросить</Button>
          <Button onClick={() => setOpen(false)}>Применить</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}

function SortableTableDemo() {
  const [sort, setSort] = useState<{ column: string; direction: "ascending" | "descending" }>({
    column: "name",
    direction: "ascending",
  });
  const sorted = [...TABLE_USERS].sort((a, b) => {
    const dir = sort.direction === "ascending" ? 1 : -1;
    return a[sort.column as "name" | "role"] < b[sort.column as "name" | "role"] ? -dir : dir;
  });
  const toggle = (col: string) => setSort((s) =>
    s.column === col ? { column: col, direction: s.direction === "ascending" ? "descending" : "ascending" } : { column: col, direction: "ascending" }
  );
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Сортируемая" className="min-w-[360px]">
          <Table.Header>
            <Table.Column isRowHeader onClick={() => toggle("name")} className="cursor-pointer select-none">
              Имя {sort.column === "name" ? (sort.direction === "ascending" ? " ↑" : " ↓") : ""}
            </Table.Column>
            <Table.Column onClick={() => toggle("role")} className="cursor-pointer select-none">
              Роль {sort.column === "role" ? (sort.direction === "ascending" ? " ↑" : " ↓") : ""}
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {sorted.map((u) => (
              <Table.Row key={u.id} id={u.id}>
                <Table.Cell className="font-medium">{u.name}</Table.Cell>
                <Table.Cell className="text-muted">{u.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

function NewProjectDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" leftIcon={<IoDocumentOutline />} onClick={() => setOpen(true)}>Новый проект</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Header>
          <Dialog.HeadingBlock>
            <Dialog.Title>Создать проект</Dialog.Title>
            <Dialog.Description>Заполните основные данные о проекте.</Dialog.Description>
          </Dialog.HeadingBlock>
          <Dialog.Close />
        </Dialog.Header>
        <Dialog.Body>
          <div className="flex flex-col gap-mid">
            <Input label="Название" placeholder="Мой проект" size="small" />
            <Input label="Репозиторий" placeholder="https://github.com/…" size="small" {...({ prefix: <IoGlobeOutline /> } as object)} />
            <TextArea label="Описание" size="small" rows={2} placeholder="О чём этот проект?" />
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" size="small" onClick={() => setOpen(false)}>Отмена</Button>
          <Button size="small" onClick={() => setOpen(false)}>Создать</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

function ToastStackDemo() {
  const { toast } = useToast();
  return (
    <Button
      variant="secondary"
      onClick={() => {
        toast.success("Файл загружен", { description: "document.pdf" });
        setTimeout(() => toast.info("Ещё одно уведомление"), 300);
        setTimeout(() => toast.warning("Третье в стеке"), 600);
      }}
    >
      Показать стек
    </Button>
  );
}

/** Offset = sticky header + extra gap below it. */
function getSectionScrollOffset(): number {
  const root = document.documentElement;
  const header = parseFloat(
    getComputedStyle(root).getPropertyValue("--site-header-height") || "0",
  );
  const gap = parseFloat(
    getComputedStyle(root).getPropertyValue("--site-scroll-gap") || "16",
  );
  const measured =
    document.querySelector<HTMLElement>("[data-site-header]")?.offsetHeight ?? 0;
  return Math.max(header, measured) + gap;
}

function scrollToShowcaseSection(el: Element) {
  const top = el.getBoundingClientRect().top + window.scrollY - getSectionScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

function AccordionFAQ() {
  const items = [
    { title: "Как оформить заказ?", content: "Доставка по РФ 2–5 дней." },
    { title: "Условия возврата", content: "Возврат в течение 14 дней." },
    { title: "Уход за товаром", content: "Избегайте абразивов и агрессивной химии." },
  ];
  return (
    <Accordion defaultOpenIndex={0}>
      {items.map((item, index) => (
        <Accordion.Item key={index}>
          <Accordion.Heading>
            <Accordion.Trigger>
              <Accordion.Message>
                <Accordion.Content>
                  <Accordion.Title>{item.title}</Accordion.Title>
                </Accordion.Content>
                <Accordion.Indicator />
              </Accordion.Message>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

// ─── HomeShowcase ─────────────────────────────────────────────────────────────

export function HomeShowcase() {
  // ── Section-active tracking for the nav bar ─────────────────────────────────
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const attach = () => {
      const offset = getSectionScrollOffset();
      observer?.disconnect();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const title = entry.target.getAttribute("data-brn-section");
              if (title) {
                window.dispatchEvent(
                  new CustomEvent("brn:section", { detail: { section: title } }),
                );
              }
            }
          });
        },
        // Active when section top is just below the sticky header + gap.
        { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
      );

      document.querySelectorAll("[data-brn-section]").forEach((el) => observer!.observe(el));
    };

    attach();

    const header = document.querySelector("[data-site-header]");
    const ro = header ? new ResizeObserver(attach) : null;
    if (header && ro) ro.observe(header);

    // Fire immediately for the first visible section.
    const first = document.querySelector("[data-brn-section]");
    if (first) {
      window.dispatchEvent(
        new CustomEvent("brn:section", {
          detail: { section: first.getAttribute("data-brn-section") },
        }),
      );
    }

    return () => {
      observer?.disconnect();
      ro?.disconnect();
    };
  }, []);

  // Scroll the page to a section on nav-click.
  useEffect(() => {
    const handler = (e: Event) => {
      const { title } = (e as CustomEvent<{ title: string }>).detail;
      const el = document.querySelector(`[data-brn-section="${title}"]`);
      if (el) scrollToShowcaseSection(el);
    };
    window.addEventListener("brn:scroll-to", handler);
    return () => window.removeEventListener("brn:scroll-to", handler);
  }, []);

  return (
    <Toast.Provider>
    <div className="flex w-full flex-col gap-xlarge py-xlarge">
      {/* Hero */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-mid text-center">
        <h1 className="text-6xl font-medium text-foreground">Burne UI</h1>
        <Text variant="mid" className="text-muted">
          Готовые компоненты для вашего проекта на Tailwind CSS v4 — токены темы, анимации, доступность.
        </Text>
      </div>

      {/* ── Button ── */}
      <ShowcaseCard
        title="Button"
        description="Варианты, размеры, иконки, состояния."
      >
        <Ex label="Варианты">
          <div className="flex flex-wrap gap-small">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
        </Ex>
        <Ex label="Ghost & Danger">
          <div className="flex flex-wrap gap-small">
            <Button variant="ghost" ripple>Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Ex>
        <Ex label="Размеры">
          <div className="flex flex-wrap items-center gap-small">
            <Button variant="outline" size="small">Small</Button>
            <Button variant="outline" size="base">Base</Button>
            <Button variant="outline" size="mid">Mid</Button>
            <Button variant="outline" size="large">Large</Button>
          </div>
        </Ex>
        <Ex label="С иконкой">
          <div className="flex flex-wrap gap-small">
            <Button variant="default" leftIcon={<IoPersonOutline />}>Профиль</Button>
            <Button variant="outline" leftIcon={<IoBarChartOutline />}>Статистика</Button>
            <Button variant="secondary" iconOnly aria-label="Настройки">
              <IoSettingsOutline />
            </Button>
          </div>
        </Ex>
        <Ex label="Disabled">
          <div className="flex flex-wrap gap-small">
            <Button variant="default" disabled>Default</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="danger" disabled>Danger</Button>
          </div>
        </Ex>
      </ShowcaseCard>

      {/* ── Input ── */}
      <ShowcaseCard
        title="Input"
        description="Simple и compound API, статусы, password-тип, variant."
      >
        <Ex label="Default">
          <Block><Input label="Email" placeholder="you@example.com" hint="Для входа в аккаунт." /></Block>
        </Ex>
        <Ex label="Outline + Password">
          <Block>
            <Input
              label="Пароль"
              inputType="password"
              variant="outline"
              placeholder="••••••••"
              hint="Не менее 8 символов."
            />
          </Block>
        </Ex>
        <Ex label="Small size">
          <Block><Input label="Имя" placeholder="Иван" size="small" /></Block>
        </Ex>
        <Ex label="Large size">
          <Block><Input label="Компания" placeholder="Название" size="large" /></Block>
        </Ex>
        <Ex label="Danger status">
          <Block>
            <Input
              label="Логин"
              placeholder="username"
              status="danger"
              hint="Пользователь не найден."
            />
          </Block>
        </Ex>
        <Ex label="Custom — с иконкой">
          <Block>
            <Input label="Сайт" variant="outline" placeholder="https://example.com" {...({ prefix: <IoGlobeOutline className="text-muted" /> } as object)} hint="Ссылка на ваш проект." />
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Alert ── */}
      <ShowcaseCard title="Alert" description="Все статусные уведомления с индикатором.">
        <Ex label="Success">
          <Block>
            <Alert status="success">
              <Alert.Message>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Профиль обновлён</Alert.Title>
                </Alert.Content>
              </Alert.Message>
            </Alert>
          </Block>
        </Ex>
        <Ex label="Danger + Action">
          <Block>
            <Alert status="danger">
              <Alert.Message>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Ошибка подключения</Alert.Title>
                  <Alert.Description>Проверьте соединение.</Alert.Description>
                </Alert.Content>
              </Alert.Message>
              <Alert.Action>
                <Button size="small" variant="danger">Retry</Button>
              </Alert.Action>
            </Alert>
          </Block>
        </Ex>
        <Ex label="Info">
          <Block>
            <Alert status="info">
              <Alert.Message>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Новая версия</Alert.Title>
                  <Alert.Description>Обновите страницу.</Alert.Description>
                </Alert.Content>
              </Alert.Message>
            </Alert>
          </Block>
        </Ex>
        <Ex label="Warning">
          <Block>
            <Alert status="warning">
              <Alert.Message>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Сессия истекает</Alert.Title>
                  <Alert.Description>Сохраните изменения.</Alert.Description>
                </Alert.Content>
              </Alert.Message>
            </Alert>
          </Block>
        </Ex>
        <Ex label="Outline">
          <Block>
            <Alert status="outline">
              <Alert.Message>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Информация</Alert.Title>
                  <Alert.Description>Нейтральное уведомление.</Alert.Description>
                </Alert.Content>
              </Alert.Message>
            </Alert>
          </Block>
        </Ex>
        <Ex label="Custom — прогресс">
          <Block>
            <Alert status="info">
              <Alert.Message>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Загрузка файла…</Alert.Title>
                  <Alert.Description>
                    <ProgressBar value={65} max={100} className="mt-xsmall">
                      <ProgressBar.Track value={65} max={100} />
                    </ProgressBar>
                    <span className="mt-xsmall block text-xs text-muted">65 из 100 МБ</span>
                  </Alert.Description>
                </Alert.Content>
              </Alert.Message>
            </Alert>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Disclosure ── */}
      <ShowcaseCard title="Disclosure" description="Раскрывающиеся блоки. Варианты: default, outline, secondary, card, ghost.">
        <Ex label="Default">
          <Block>
            <DisclosureGroup variant="default" defaultValue="d1">
              <Disclosure value="d1">
                <Disclosure.Trigger>Как начать?</Disclosure.Trigger>
                <Disclosure.Content>
                  <Text variant="small" className="text-muted">Установите пакет и импортируйте стили.</Text>
                </Disclosure.Content>
              </Disclosure>
              <Disclosure value="d2">
                <Disclosure.Trigger>Есть ли TypeScript?</Disclosure.Trigger>
                <Disclosure.Content>
                  <Text variant="small" className="text-muted">Да, полные типы включены.</Text>
                </Disclosure.Content>
              </Disclosure>
            </DisclosureGroup>
          </Block>
        </Ex>
        <Ex label="Outline">
          <Block>
            <Disclosure variant="outline" defaultOpen>
              <Disclosure.Trigger>Outline вариант</Disclosure.Trigger>
              <Disclosure.Content>
                <Text variant="small" className="text-muted">Триггер снаружи, рамка только у контента.</Text>
              </Disclosure.Content>
            </Disclosure>
          </Block>
        </Ex>
        <Ex label="Secondary">
          <Block>
            <Disclosure variant="secondary" defaultOpen>
              <Disclosure.Trigger>Secondary вариант</Disclosure.Trigger>
              <Disclosure.Content>
                <Text variant="small" className="text-muted">Вторичный фон у контентной панели.</Text>
              </Disclosure.Content>
            </Disclosure>
          </Block>
        </Ex>
        <Ex label="Card group">
          <Block>
            <DisclosureGroup variant="card" defaultValue="c1">
              <Disclosure value="c1">
                <Disclosure.Trigger>Раздел A</Disclosure.Trigger>
                <Disclosure.Content>
                  <Text variant="small" className="text-muted">Контент раздела A.</Text>
                </Disclosure.Content>
              </Disclosure>
              <Disclosure value="c2">
                <Disclosure.Trigger>Раздел B</Disclosure.Trigger>
                <Disclosure.Content>
                  <Text variant="small" className="text-muted">Контент раздела B.</Text>
                </Disclosure.Content>
              </Disclosure>
            </DisclosureGroup>
          </Block>
        </Ex>
        <Ex label="Ghost">
          <Block>
            <Disclosure variant="ghost" defaultOpen>
              <Disclosure.Trigger>Ghost вариант</Disclosure.Trigger>
              <Disclosure.Content>
                <Text variant="small" className="text-muted">Минималистичный стиль без фона.</Text>
              </Disclosure.Content>
            </Disclosure>
          </Block>
        </Ex>
        <Ex label="Custom — настройки">
          <Block>
            <Disclosure variant="secondary" defaultOpen>
              <Disclosure.Trigger>Уведомления</Disclosure.Trigger>
              <Disclosure.Content>
                <div className="flex flex-col gap-mid p-small">
                  <div className="flex items-center justify-between gap-mid">
                    <div>
                      <Text variant="small" className="font-medium text-foreground">Email</Text>
                      <Text variant="small" className="text-muted">Ежедневный дайджест</Text>
                    </div>
                    <Switch defaultChecked aria-label="Email" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between gap-mid">
                    <div>
                      <Text variant="small" className="font-medium text-foreground">Push</Text>
                      <Text variant="small" className="text-muted">Мгновенные уведомления</Text>
                    </div>
                    <Switch aria-label="Push" />
                  </div>
                </div>
              </Disclosure.Content>
            </Disclosure>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Badge ── */}
      <ShowcaseCard title="Badge & ToggleButton" description="Тоны Badge и интерактивные кнопки-переключатели.">
        <Ex label="Badge — все тоны">
          <div className="flex flex-wrap gap-small">
            {(["default","outline","secondary","danger","success","info","warning"] as BadgeTone[]).map((tone) => (
              <Badge key={tone} color={tone} className="capitalize">{tone}</Badge>
            ))}
          </div>
        </Ex>
        <Ex label="Badge — small">
          <div className="flex flex-wrap gap-small">
            {(["danger","success","info","warning"] as BadgeTone[]).map((tone) => (
              <Badge key={tone} color={tone} size="small" className="capitalize">{tone}</Badge>
            ))}
          </div>
        </Ex>
        <Ex label="ToggleButton default">
          <LikeButton variant="default" />
        </Ex>
        <Ex label="ToggleButton outline">
          <LikeButton variant="outline" />
        </Ex>
        <Ex label="ToggleButton ghost">
          <StarButton variant="ghost" />
        </Ex>
        <Ex label="Custom — реакции">
          <ToggleButtonGroup type="multiple" separated>
            <ToggleButton value="heart" leftIcon={<IoHeart />}>12</ToggleButton>
            <ToggleButton value="star" leftIcon={<IoStarOutline />}>8</ToggleButton>
            <ToggleButton value="person" leftIcon={<IoPersonOutline />}>3</ToggleButton>
          </ToggleButtonGroup>
        </Ex>
      </ShowcaseCard>

      {/* ── Tabs ── */}
      <ShowcaseCard title="Tabs" description="Горизонтальные и вертикальные вкладки. Варианты: default, outline, secondary.">
        <Ex label="Default">
          <Block>
            <Tabs defaultValue="home" variant="default">
              <Tabs.List>
                <Tabs.Tab value="home">Главная</Tabs.Tab>
                <Tabs.Tab value="profile">Профиль</Tabs.Tab>
                <Tabs.Tab value="settings">Настройки</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="home"><Text variant="small" className="pt-small text-muted">Главная страница</Text></Tabs.Panel>
              <Tabs.Panel value="profile"><Text variant="small" className="pt-small text-muted">Страница профиля</Text></Tabs.Panel>
              <Tabs.Panel value="settings"><Text variant="small" className="pt-small text-muted">Настройки</Text></Tabs.Panel>
            </Tabs>
          </Block>
        </Ex>
        <Ex label="Outline">
          <Block>
            <Tabs defaultValue="work" variant="outline">
              <Tabs.List>
                <Tabs.Tab value="work">Работа</Tabs.Tab>
                <Tabs.Tab value="personal">Личное</Tabs.Tab>
                <Tabs.Tab value="archive">Архив</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="work"><Text variant="small" className="pt-small text-muted">Рабочие задачи</Text></Tabs.Panel>
              <Tabs.Panel value="personal"><Text variant="small" className="pt-small text-muted">Личные задачи</Text></Tabs.Panel>
              <Tabs.Panel value="archive"><Text variant="small" className="pt-small text-muted">Архивные задачи</Text></Tabs.Panel>
            </Tabs>
          </Block>
        </Ex>
        <Ex label="Secondary">
          <Block>
            <Tabs defaultValue="a" variant="secondary">
              <Tabs.List>
                <Tabs.Tab value="a">Analytics</Tabs.Tab>
                <Tabs.Tab value="b">Reports</Tabs.Tab>
                <Tabs.Tab value="c">Export</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="a"><Text variant="small" className="pt-small text-muted">Данные аналитики</Text></Tabs.Panel>
              <Tabs.Panel value="b"><Text variant="small" className="pt-small text-muted">Отчёты</Text></Tabs.Panel>
              <Tabs.Panel value="c"><Text variant="small" className="pt-small text-muted">Экспорт данных</Text></Tabs.Panel>
            </Tabs>
          </Block>
        </Ex>
        <Ex label="Vertical">
          <Block>
            <Tabs defaultValue="v1" orientation="vertical">
              <Tabs.List>
                <Tabs.Tab value="v1"><IoHomeOutline className="mr-xsmall inline" />Главная</Tabs.Tab>
                <Tabs.Tab value="v2"><IoPersonOutline className="mr-xsmall inline" />Профиль</Tabs.Tab>
                <Tabs.Tab value="v3"><IoBriefcaseOutline className="mr-xsmall inline" />Работа</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="v1"><Text variant="small" className="text-muted">Главная</Text></Tabs.Panel>
              <Tabs.Panel value="v2"><Text variant="small" className="text-muted">Профиль</Text></Tabs.Panel>
              <Tabs.Panel value="v3"><Text variant="small" className="text-muted">Работа</Text></Tabs.Panel>
            </Tabs>
          </Block>
        </Ex>
        <Ex label="Small size">
          <Block>
            <Tabs defaultValue="s1" size="small">
              <Tabs.List>
                <Tabs.Tab value="s1">Вкладка 1</Tabs.Tab>
                <Tabs.Tab value="s2">Вкладка 2</Tabs.Tab>
                <Tabs.Tab value="s3">Вкладка 3</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="s1"><Text variant="small" className="pt-small text-muted">Контент 1</Text></Tabs.Panel>
              <Tabs.Panel value="s2"><Text variant="small" className="pt-small text-muted">Контент 2</Text></Tabs.Panel>
              <Tabs.Panel value="s3"><Text variant="small" className="pt-small text-muted">Контент 3</Text></Tabs.Panel>
            </Tabs>
          </Block>
        </Ex>
        <Ex label="Custom — со счётчиком">
          <Block>
            <Tabs defaultValue="all" variant="secondary">
              <Tabs.List>
                <Tabs.Tab value="all">Все <Badge color="secondary" size="small" className="ml-xsmall">24</Badge></Tabs.Tab>
                <Tabs.Tab value="active">Активные <Badge color="success" size="small" className="ml-xsmall">18</Badge></Tabs.Tab>
                <Tabs.Tab value="done">Готово <Badge color="info" size="small" className="ml-xsmall">6</Badge></Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="all"><Text variant="small" className="pt-small text-muted">Все задачи проекта</Text></Tabs.Panel>
              <Tabs.Panel value="active"><Text variant="small" className="pt-small text-muted">В работе</Text></Tabs.Panel>
              <Tabs.Panel value="done"><Text variant="small" className="pt-small text-muted">Завершённые</Text></Tabs.Panel>
            </Tabs>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── TextArea ── */}
      <ShowcaseCard title="TextArea" description="Поле для ввода многострочного текста. Поддерживает resize, варианты, размеры, статусы.">
        <Ex label="Default">
          <Block><TextArea label="Описание" placeholder="Введите текст..." hint="Тяните за нижний правый угол." /></Block>
        </Ex>
        <Ex label="Outline">
          <Block><TextArea label="Комментарий" placeholder="Ваш комментарий..." variant="outline" /></Block>
        </Ex>
        <Ex label="Small">
          <Block><TextArea label="Заметка" placeholder="Краткая заметка..." size="small" /></Block>
        </Ex>
        <Ex label="Large">
          <Block><TextArea label="Статья" placeholder="Начните писать..." size="large" rows={4} /></Block>
        </Ex>
        <Ex label="Disabled">
          <Block><TextArea label="Только чтение" value="Этот текст нельзя редактировать." disabled readOnly hint="Поле недоступно для редактирования." /></Block>
        </Ex>
        <Ex label="Custom — счётчик">
          <Block><CharCountTextArea /></Block>
        </Ex>
      </ShowcaseCard>

      {/* ── ToggleButtonGroup ── */}
      <ShowcaseCard title="ToggleButtonGroup" description="Группа кнопок-переключателей. Режимы: single, multiple. Ориентация: horizontal, vertical.">
        <Ex label="Horizontal connected">
          <ViewToggle />
        </Ex>
        <Ex label="Multiple selection">
          <MultiSelect />
        </Ex>
        <Ex label="Vertical">
          <ToggleButtonGroup type="single" orientation="vertical" defaultValue="home">
            <ToggleButton value="home"><IoHomeOutline className="mr-xsmall inline" />Главная</ToggleButton>
            <ToggleButton value="profile"><IoPersonOutline className="mr-xsmall inline" />Профиль</ToggleButton>
            <ToggleButton value="work"><IoBriefcaseOutline className="mr-xsmall inline" />Работа</ToggleButton>
          </ToggleButtonGroup>
        </Ex>
        <Ex label="Separated">
          <ToggleButtonGroup type="single" separated defaultValue="month">
            <ToggleButton value="week">Неделя</ToggleButton>
            <ToggleButton value="month">Месяц</ToggleButton>
            <ToggleButton value="year">Год</ToggleButton>
          </ToggleButtonGroup>
        </Ex>
        <Ex label="Disabled">
          <ToggleButtonGroup type="single" disabled defaultValue="a">
            <ToggleButton value="a">Option A</ToggleButton>
            <ToggleButton value="b">Option B</ToggleButton>
            <ToggleButton value="c">Option C</ToggleButton>
          </ToggleButtonGroup>
        </Ex>
        <Ex label="Custom — форматирование">
          <ToggleButtonGroup type="multiple" defaultValue={["bold"]}>
            <ToggleButton value="bold"><strong>B</strong></ToggleButton>
            <ToggleButton value="italic"><em>I</em></ToggleButton>
            <ToggleButton value="under"><span className="underline">U</span></ToggleButton>
          </ToggleButtonGroup>
        </Ex>
      </ShowcaseCard>

      {/* ── Skeleton ── */}
      <ShowcaseCard title="Skeleton" description="Анимированные заглушки для состояния загрузки. Три вида анимации: wave, pulse, shimmer.">
        <Ex label="Wave — профиль">
          <div className="flex items-center gap-mid">
            <Skeleton.Circle variant="wave" className="h-10 w-10 shrink-0" />
            <Skeleton.Text variant="wave" lines={2} lastShort className="flex-1" />
          </div>
        </Ex>
        <Ex label="Pulse — текст">
          <Block><Skeleton.Text variant="pulse" lines={4} lastShort /></Block>
        </Ex>
        <Ex label="Shimmer — карточка">
          <Block>
            <div className="flex flex-col gap-small">
              <Skeleton variant="shimmer" radius="mid" className="h-24 w-full" />
              <Skeleton.Text variant="shimmer" lines={2} lastShort />
            </div>
          </Block>
        </Ex>
        <Ex label="Несколько кружков">
          <div className="flex gap-small">
            {[10, 10, 10, 10, 10].map((_, i) => (
              <Skeleton.Circle key={i} variant="wave" className="h-10 w-10" />
            ))}
          </div>
        </Ex>
        <Ex label="None (без анимации)">
          <Block>
            <div className="flex flex-col gap-small">
              <Skeleton variant="none" radius="small" className="h-4 w-3/4" />
              <Skeleton variant="none" radius="small" className="h-4 w-full" />
              <Skeleton variant="none" radius="small" className="h-4 w-1/2" />
            </div>
          </Block>
        </Ex>
        <Ex label="Custom — статья">
          <Block>
            <div className="flex flex-col gap-small">
              <Skeleton variant="shimmer" radius="mid" className="h-32 w-full" />
              <div className="flex items-center gap-small">
                <Skeleton.Circle variant="shimmer" className="h-8 w-8 shrink-0" />
                <Skeleton variant="shimmer" radius="small" className="h-3 w-24" />
              </div>
              <Skeleton variant="shimmer" radius="small" className="h-5 w-3/4" />
              <Skeleton.Text variant="shimmer" lines={3} lastShort />
            </div>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Calendar ── */}
      <ShowcaseCard title="Calendar" description="Выбор дат. Режимы: single, range, multiple. Варианты и размеры." cols={3}>
        <Ex label="Single (default)">
          <Calendar variant="default" />
        </Ex>
        <Ex label="Range selection">
          <Calendar mode="range" variant="outline" />
        </Ex>
        <Ex label="Multiple selection">
          <Calendar mode="multiple" variant="secondary" />
        </Ex>
        <Ex label="Small size">
          <Calendar size="small" />
        </Ex>
        <Ex label="Large size">
          <Calendar size="large" />
        </Ex>
        <Ex label="Custom — бронирование">
          <Card variant="outline" className="w-fit">
            <Card.Content>
              <Card.Title>Выберите дату</Card.Title>
              <Card.Description>Запись на консультацию</Card.Description>
            </Card.Content>
            <div className="px-base pb-small">
              <Calendar size="small" variant="secondary" />
            </div>
            <Card.Footer className="flex justify-end gap-small">
              <Button size="small" variant="ghost">Отмена</Button>
              <Button size="small">Забронировать</Button>
            </Card.Footer>
          </Card>
        </Ex>
      </ShowcaseCard>

      {/* ── Loading ── */}
      <ShowcaseCard title="Loading" description="Спиннер загрузки. Четыре размера, цвета из токенов темы.">
        <Ex label="Размеры">
          <div className="flex items-center gap-large">
            <Loading size="small" />
            <Loading size="base" />
            <Loading size="mid" />
            <Loading size="large" />
          </div>
        </Ex>
        <Ex label="Accent (default)">
          <Loading size="mid" color="accent" />
        </Ex>
        <Ex label="Success">
          <Loading size="mid" color="success" />
        </Ex>
        <Ex label="Danger">
          <Loading size="mid" color="danger" />
        </Ex>
        <Ex label="Warning">
          <Loading size="mid" color="warning" />
        </Ex>
        <Ex label="Custom — загрузка данных">
          <Card variant="secondary" className="w-fit min-w-[160px]">
            <Card.Content>
              <div className="flex items-center gap-mid">
                <Loading size="mid" color="accent" />
                <div>
                  <Text variant="small" className="font-medium text-foreground">Загрузка</Text>
                  <Text variant="small" className="text-muted">Пожалуйста, подождите…</Text>
                </div>
              </div>
            </Card.Content>
          </Card>
        </Ex>
      </ShowcaseCard>

      {/* ── SearchInput ── */}
      <ShowcaseCard title="SearchInput" description="Поле поиска с анимацией расширения, кнопкой очистки и ripple.">
        <Ex label="Default">
          <Block><SearchInput placeholder="Поиск…" /></Block>
        </Ex>
        <Ex label="Small">
          <Block><SearchInput size="small" placeholder="Поиск…" /></Block>
        </Ex>
        <Ex label="Large">
          <Block><SearchInput size="large" placeholder="Поиск…" /></Block>
        </Ex>
        <Ex label="С ripple">
          <Block><SearchInput ripple placeholder="Поиск с ripple…" /></Block>
        </Ex>
        <Ex label="Disabled">
          <Block><SearchInput disabled placeholder="Недоступно" /></Block>
        </Ex>
        <Ex label="Custom — шапка">
          <Block>
            <Surface variant="outline" padding="small" radius="mid">
              <div className="flex items-center gap-small">
                <SearchInput placeholder="Поиск по проекту…" className="flex-1" />
                <Button variant="outline" size="base" iconOnly aria-label="Настройки">
                  <IoSettingsOutline />
                </Button>
              </div>
            </Surface>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Card ── */}
      <ShowcaseCard title="Card" description="Карточка. Варианты: default, outline, secondary. Поддерживает нажатие.">
        <Ex label="Default">
          <Block>
            <Card>
              <Card.Content>
                <Card.Title>Заголовок</Card.Title>
                <Card.Description>Короткое описание контента карточки.</Card.Description>
              </Card.Content>
            </Card>
          </Block>
        </Ex>
        <Ex label="Outline">
          <Block>
            <Card variant="outline">
              <Card.Content>
                <Card.Title>Outline</Card.Title>
                <Card.Description>Полупрозрачный фон с размытием.</Card.Description>
              </Card.Content>
            </Card>
          </Block>
        </Ex>
        <Ex label="Secondary">
          <Block>
            <Card variant="secondary">
              <Card.Content>
                <Card.Title>Secondary</Card.Title>
                <Card.Description>Вторичная поверхность из токенов.</Card.Description>
              </Card.Content>
            </Card>
          </Block>
        </Ex>
        <Ex label="С футером">
          <Block>
            <Card>
              <Card.Content>
                <Card.Title>Материал</Card.Title>
                <Card.Description>Описание материала недели.</Card.Description>
              </Card.Content>
              <Card.Footer className="flex justify-end">
                <Button variant="ghost" size="small">Читать</Button>
              </Card.Footer>
            </Card>
          </Block>
        </Ex>
        <Ex label="Интерактивная">
          <Block>
            <Card onClick={() => {}} className="cursor-pointer">
              <Card.Content>
                <Card.Title>Нажмите меня</Card.Title>
                <Card.Description>Hover-lift и тень при нажатии.</Card.Description>
              </Card.Content>
            </Card>
          </Block>
        </Ex>
        <Ex label="Custom — статистика">
          <Block>
            <Card variant="secondary">
              <Card.Content>
                <Card.Title>Хранилище</Card.Title>
                <Card.Description>12.4 ГБ из 50 ГБ использовано</Card.Description>
              </Card.Content>
              <div className="px-large py-small">
                <Meter value={12.4} max={50}>
                  <Meter.Track value={12.4} max={50} />
                </Meter>
                <div className="mt-small flex justify-between">
                  <Text variant="small" className="text-muted">12.4 ГБ</Text>
                  <Text variant="small" className="text-muted">50 ГБ</Text>
                </div>
              </div>
            </Card>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Avatar ── */}
      <ShowcaseCard title="Avatar" description="Аватар пользователя с fallback, размерами и tooltip-ником.">
        <Ex label="Размеры">
          <div className="flex items-end gap-mid">
            <Avatar size="small" label="Анна"><Avatar.Fallback /></Avatar>
            <Avatar size="base" label="Борис"><Avatar.Fallback /></Avatar>
            <Avatar size="mid" label="Вера"><Avatar.Fallback /></Avatar>
            <Avatar size="large" label="Гриша"><Avatar.Fallback /></Avatar>
          </div>
        </Ex>
        <Ex label="С изображением">
          <div className="flex gap-small">
            <Avatar size="base" label="Фото 1">
              <Avatar.Image src={DEMO_IMG} alt="" loading="lazy" />
              <Avatar.Fallback />
            </Avatar>
            <Avatar size="base" label="Фото 2">
              <Avatar.Image src={DEMO_IMG2} alt="" loading="lazy" />
              <Avatar.Fallback />
            </Avatar>
            <Avatar size="base" label="Фото 3">
              <Avatar.Image src={DEMO_IMG3} alt="" loading="lazy" />
              <Avatar.Fallback />
            </Avatar>
          </div>
        </Ex>
        <Ex label="Tooltip-ник">
          <div className="flex gap-small">
            <Avatar size="base" label="Echo" nickname="echo_north" tooltipVariant="default">
              <Avatar.Fallback />
            </Avatar>
            <Avatar size="base" label="Orbit" nickname="orbit_fox" tooltipVariant="success">
              <Avatar.Fallback />
            </Avatar>
            <Avatar size="base" label="Vela" nickname="vela_wave" tooltipVariant="info">
              <Avatar.Fallback />
            </Avatar>
          </div>
        </Ex>
        <Ex label="AvatarGroup">
          <AvatarGroup>
            <Avatar size="base" label="A"><Avatar.Fallback /></Avatar>
            <Avatar size="base" label="B">
              <Avatar.Image src={DEMO_IMG} alt="" loading="lazy" />
              <Avatar.Fallback />
            </Avatar>
            <Avatar size="base" label="C"><Avatar.Fallback /></Avatar>
            <Avatar size="base" label="+3" nickname="+3"><Avatar.Fallback /></Avatar>
          </AvatarGroup>
        </Ex>
        <Ex label="Large group">
          <AvatarGroup>
            {["Анна","Борис","Вера","Гриша","Дима"].map((n) => (
              <Avatar key={n} size="mid" label={n}><Avatar.Fallback /></Avatar>
            ))}
          </AvatarGroup>
        </Ex>
        <Ex label="Custom — команда">
          <div className="flex flex-col gap-small">
            {[
              { name: "Kate Moore", role: "CEO", img: DEMO_IMG },
              { name: "John Smith", role: "CTO", img: DEMO_IMG2 },
              { name: "Sara Davis", role: "Designer", img: DEMO_IMG3 },
            ].map((m) => (
              <div key={m.name} className="flex items-center gap-mid">
                <Avatar size="base" label={m.name}>
                  <Avatar.Image src={m.img} alt="" loading="lazy" />
                  <Avatar.Fallback />
                </Avatar>
                <div className="flex-1">
                  <Text variant="small" className="font-medium text-foreground">{m.name}</Text>
                  <Text variant="small" className="text-muted">{m.role}</Text>
                </div>
                <Badge color="secondary" size="small">Online</Badge>
              </div>
            ))}
          </div>
        </Ex>
      </ShowcaseCard>

      {/* ── Form Controls ── */}
      <ShowcaseCard title="Form Controls" description="Checkbox, Radio и Switch — элементы выбора с поддержкой групп и состояний.">
        <Ex label="Checkbox">
          <div className="flex flex-col gap-small">
            <Checkbox label="Согласен с условиями" defaultChecked />
            <Checkbox label="Подписаться на рассылку" />
            <Checkbox label="Недоступен" disabled />
          </div>
        </Ex>
        <Ex label="Radio">
          <div className="flex flex-col gap-small">
            <Radio name="plan" value="free" label="Бесплатный" defaultChecked />
            <Radio name="plan" value="pro" label="Pro" />
            <Radio name="plan" value="enterprise" label="Enterprise" disabled />
          </div>
        </Ex>
        <Ex label="Switch">
          <div className="flex flex-col gap-small">
            <Switch defaultChecked aria-label="Тёмная тема" />
            <Switch aria-label="Уведомления" />
            <Switch disabled aria-label="Аналитика" />
          </div>
        </Ex>
        <Ex label="Switch sizes">
          <div className="flex items-center gap-large">
            <Switch size="base" defaultChecked aria-label="Base" />
            <Switch size="mid" defaultChecked aria-label="Mid" />
            <Switch size="large" defaultChecked aria-label="Large" />
          </div>
        </Ex>
        <Ex label="Checkbox sizes">
          <div className="flex items-center gap-large">
            <Checkbox size="small" aria-label="Small" defaultChecked />
            <Checkbox size="base" aria-label="Base" defaultChecked />
            <Checkbox size="mid" aria-label="Mid" defaultChecked />
            <Checkbox size="large" aria-label="Large" defaultChecked />
          </div>
        </Ex>
        <Ex label="Custom — настройки">
          <div className="flex flex-col gap-mid">
            {([
              { label: "Тёмная тема", hint: "Переключает тему оформления", checked: true },
              { label: "Push-уведомления", hint: "Мгновенные сообщения", checked: false },
              { label: "Аналитика", hint: "Сбор анонимных данных", checked: false },
            ] as const).map((s) => (
              <div key={s.label} className="flex items-center justify-between gap-mid">
                <div>
                  <Text variant="small" className="font-medium text-foreground">{s.label}</Text>
                  <Text variant="small" className="text-muted">{s.hint}</Text>
                </div>
                <Switch defaultChecked={s.checked} aria-label={s.label} />
              </div>
            ))}
          </div>
        </Ex>
      </ShowcaseCard>

      {/* ── Slider ── */}
      <ShowcaseCard title="Slider" description="Ползунок для числовых значений. Single и range, горизонтальный и вертикальный.">
        <Ex label="Horizontal">
          <Block>
            <Slider label="Громкость" defaultValue={60}>
              <Slider.Track><Slider.Rail /><Slider.Fill /><Slider.Thumb /></Slider.Track>
            </Slider>
          </Block>
        </Ex>
        <Ex label="Range">
          <Block>
            <Slider label="Диапазон цен" defaultValue={[20, 80]}>
              <Slider.Track><Slider.Rail /><Slider.Fill /><Slider.Thumb /><Slider.Thumb /></Slider.Track>
            </Slider>
          </Block>
        </Ex>
        <Ex label="С шагом">
          <Block>
            <Slider label="Рейтинг" defaultValue={3} min={1} max={5} step={1}>
              <Slider.Track><Slider.Rail /><Slider.Fill /><Slider.Thumb /></Slider.Track>
            </Slider>
          </Block>
        </Ex>
        <Ex label="Vertical">
          <Slider label="Уровень" defaultValue={40} orientation="vertical" className="h-32">
            <Slider.Track><Slider.Rail /><Slider.Fill /><Slider.Thumb /></Slider.Track>
          </Slider>
        </Ex>
        <Ex label="Disabled">
          <Block>
            <Slider label="Недоступен" defaultValue={50} disabled>
              <Slider.Track><Slider.Rail /><Slider.Fill /><Slider.Thumb /></Slider.Track>
            </Slider>
          </Block>
        </Ex>
        <Ex label="Custom — RGB">
          <Block><RGBSliderDemo /></Block>
        </Ex>
      </ShowcaseCard>

      {/* ── ButtonGroup ── */}
      <ShowcaseCard title="ButtonGroup" description="Группа кнопок без зазоров. Horizontal, vertical, с текстовой меткой.">
        <Ex label="Horizontal">
          <ButtonGroup>
            <Button variant="outline">Список</Button>
            <Button variant="outline">Сетка</Button>
            <Button variant="outline">Таблица</Button>
          </ButtonGroup>
        </Ex>
        <Ex label="Vertical">
          <ButtonGroup orientation="vertical">
            <Button variant="outline">По дате</Button>
            <Button variant="outline">По имени</Button>
            <Button variant="outline">По размеру</Button>
          </ButtonGroup>
        </Ex>
        <Ex label="С меткой">
          <ButtonGroup>
            <ButtonGroupText>Вид</ButtonGroupText>
            <Button variant="outline">Список</Button>
            <Button variant="outline">Сетка</Button>
          </ButtonGroup>
        </Ex>
        <Ex label="Danger в группе">
          <ButtonGroup>
            <Button variant="outline" leftIcon={<IoDocumentOutline />}>Открыть</Button>
            <Button variant="outline" leftIcon={<IoFolderOutline />}>Переместить</Button>
            <Button variant="danger" leftIcon={<IoTrashOutline />}>Удалить</Button>
          </ButtonGroup>
        </Ex>
        <Ex label="Sizes">
          <div className="flex flex-col gap-small items-start">
            <ButtonGroup buttonSize="small">
              <Button variant="outline">A</Button>
              <Button variant="outline">B</Button>
              <Button variant="outline">C</Button>
            </ButtonGroup>
            <ButtonGroup buttonSize="mid">
              <Button variant="outline">A</Button>
              <Button variant="outline">B</Button>
              <Button variant="outline">C</Button>
            </ButtonGroup>
          </div>
        </Ex>
        <Ex label="Custom — тулбар">
          <ButtonGroup>
            <Button variant="outline" iconOnly aria-label="Документ" leftIcon={<IoDocumentOutline />} />
            <Button variant="outline" iconOnly aria-label="Папка" leftIcon={<IoFolderOutline />} />
            <Button variant="outline" iconOnly aria-label="Статистика" leftIcon={<IoBarChartOutline />} />
            <Button variant="outline" iconOnly aria-label="Профиль" leftIcon={<IoPersonOutline />} />
            <Button variant="danger" iconOnly aria-label="Удалить" leftIcon={<IoTrashOutline />} />
          </ButtonGroup>
        </Ex>
      </ShowcaseCard>

      {/* ── Breadcrumbs + Pagination ── */}
      <ShowcaseCard title="Breadcrumbs & Pagination" description="Навигация по хлебным крошкам и пагинация по страницам.">
        <Ex label="Короткие">
          <Breadcrumbs>
            <Breadcrumbs.List>
              <Breadcrumbs.Item href="#" onClick={(e) => e.preventDefault()}>Главная</Breadcrumbs.Item>
              <Breadcrumbs.Item current>Профиль</Breadcrumbs.Item>
            </Breadcrumbs.List>
          </Breadcrumbs>
        </Ex>
        <Ex label="Длинные">
          <Block>
            <Breadcrumbs>
              <Breadcrumbs.List>
                <Breadcrumbs.Item href="#" onClick={(e) => e.preventDefault()}>Главная</Breadcrumbs.Item>
                <Breadcrumbs.Item href="#" onClick={(e) => e.preventDefault()}>Каталог</Breadcrumbs.Item>
                <Breadcrumbs.Item href="#" onClick={(e) => e.preventDefault()}>Электроника</Breadcrumbs.Item>
                <Breadcrumbs.Item current>Смартфоны</Breadcrumbs.Item>
              </Breadcrumbs.List>
            </Breadcrumbs>
          </Block>
        </Ex>
        <Ex label="Пагинация">
          <PaginationDemo totalPages={10} />
        </Ex>
        <Ex label="Много страниц">
          <PaginationDemo totalPages={50} siblingCount={1} />
        </Ex>
        <Ex label="Широкий диапазон">
          <PaginationDemo totalPages={20} siblingCount={2} />
        </Ex>
        <Ex label="Custom — навбар">
          <div className="flex flex-col gap-mid">
            <Breadcrumbs>
              <Breadcrumbs.List>
                <Breadcrumbs.Item href="#" onClick={(e) => e.preventDefault()}>
                  <IoHomeOutline className="inline" aria-hidden />
                </Breadcrumbs.Item>
                <Breadcrumbs.Item href="#" onClick={(e) => e.preventDefault()}>Продукты</Breadcrumbs.Item>
                <Breadcrumbs.Item current>Burne UI</Breadcrumbs.Item>
              </Breadcrumbs.List>
            </Breadcrumbs>
            <PaginationDemo totalPages={8} />
          </div>
        </Ex>
      </ShowcaseCard>

      {/* ── TimeField ── */}
      <ShowcaseCard title="TimeField" description="Поле ввода времени с раздельными сегментами чч:мм:сс.">
        <Ex label="Default">
          <Block><TimeField label="Начало" /></Block>
        </Ex>
        <Ex label="Outline">
          <Block><TimeField label="Конец" variant="outline" /></Block>
        </Ex>
        <Ex label="Small">
          <Block><TimeField label="Время" size="small" /></Block>
        </Ex>
        <Ex label="Large">
          <Block><TimeField label="Время" size="large" /></Block>
        </Ex>
        <Ex label="Disabled">
          <Block><TimeField label="Недоступно" disabled /></Block>
        </Ex>
        <Ex label="Custom — встреча">
          <Block>
            <div className="flex flex-col gap-small">
              <TimeField label="Начало встречи" variant="outline" />
              <TimeField label="Конец встречи" variant="outline" />
            </div>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── ColorSwatch + ColorSlider ── */}
      <ShowcaseCard title="ColorSwatch & ColorSlider" description="Цветовые свотчи и ползунок канала цвета для ColorPicker.">
        <Ex label="Swatches — палитра">
          <div className="flex flex-wrap gap-small">
            {["#ef4444","#f97316","#eab308","#22c55e","#3b82f6","#a855f7","#ec4899","#6b7280"].map((c) => (
              <ColorSwatch key={c} color={c} size="mid" />
            ))}
          </div>
        </Ex>
        <Ex label="Sizes">
          <div className="flex items-center gap-small">
            <ColorSwatch color="#3b82f6" size="small" />
            <ColorSwatch color="#3b82f6" size="base" />
            <ColorSwatch color="#3b82f6" size="mid" />
            <ColorSwatch color="#3b82f6" size="large" />
          </div>
        </Ex>
        <Ex label="С прозрачностью">
          <div className="flex gap-small">
            <ColorSwatch color="rgba(59,130,246,0.8)" showChecker size="mid" />
            <ColorSwatch color="rgba(239,68,68,0.5)" showChecker size="mid" />
            <ColorSwatch color="rgba(0,0,0,0)" showChecker size="mid" />
          </div>
        </Ex>
        <Ex label="Custom — выбор цвета">
          <ColorSwatchPicker />
        </Ex>
      </ShowcaseCard>

      {/* ── Meter + ProgressBar ── */}
      <ShowcaseCard title="Meter & ProgressBar" description="Индикаторы прогресса и измерения значений.">
        <Ex label="Meter 30%">
          <Block>
            <Meter label="Использование диска" value={30} max={100}>
              <Meter.Header><Meter.Label /><Meter.Value /></Meter.Header>
              <Meter.Track value={30} max={100} />
            </Meter>
          </Block>
        </Ex>
        <Ex label="Meter 75%">
          <Block>
            <Meter label="Заполнение" value={75} max={100}>
              <Meter.Header><Meter.Label /><Meter.Value /></Meter.Header>
              <Meter.Track value={75} max={100} />
            </Meter>
          </Block>
        </Ex>
        <Ex label="ProgressBar 45%">
          <Block>
            <ProgressBar label="Загрузка файла" value={45} max={100}>
              <ProgressBar.Header><ProgressBar.Label /><ProgressBar.Value /></ProgressBar.Header>
              <ProgressBar.Track value={45} max={100} />
            </ProgressBar>
          </Block>
        </Ex>
        <Ex label="Indeterminate">
          <Block>
            <ProgressBar label="Обработка" indeterminate>
              <ProgressBar.Header><ProgressBar.Label /></ProgressBar.Header>
              <ProgressBar.Track indeterminate />
            </ProgressBar>
          </Block>
        </Ex>
        <Ex label="Meter размеры">
          <Block>
            <div className="flex flex-col gap-mid">
              <Meter label="Small" value={60} size="small"><Meter.Track value={60} size="small" /></Meter>
              <Meter label="Base" value={60}><Meter.Track value={60} /></Meter>
              <Meter label="Mid" value={60} size="mid"><Meter.Track value={60} size="mid" /></Meter>
            </div>
          </Block>
        </Ex>
        <Ex label="Custom — диск">
          <Block>
            <div className="flex flex-col gap-mid">
              {[
                { label: "Системные", value: 14, max: 50, color: "var(--color-accent)" },
                { label: "Медиа", value: 28, max: 50, color: "var(--color-warning)" },
                { label: "Документы", value: 8, max: 50, color: "var(--color-success)" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-mid">
                  <Text variant="small" className="w-24 shrink-0 text-muted">{s.label}</Text>
                  <div className="flex-1">
                    <Meter value={s.value} max={s.max}>
                      <Meter.Track value={s.value} max={s.max} color={s.color} />
                    </Meter>
                  </div>
                  <Text variant="small" className="w-10 text-right font-mono text-muted">{s.value} ГБ</Text>
                </div>
              ))}
            </div>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Tooltip ── */}
      <ShowcaseCard title="Tooltip" description="Подсказка по hover и focus. Варианты и размеры.">
        <Ex label="Default">
          <Tooltip>
            <Tooltip.Trigger>
              <Button variant="outline">Наведите</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Подсказка по умолчанию</Tooltip.Content>
          </Tooltip>
        </Ex>
        <Ex label="Success">
          <Tooltip variant="success">
            <Tooltip.Trigger>
              <Button variant="outline">Success</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Операция выполнена</Tooltip.Content>
          </Tooltip>
        </Ex>
        <Ex label="Danger">
          <Tooltip variant="danger">
            <Tooltip.Trigger>
              <Button variant="outline">Danger</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Действие необратимо</Tooltip.Content>
          </Tooltip>
        </Ex>
        <Ex label="Info">
          <Tooltip variant="info">
            <Tooltip.Trigger>
              <Button variant="outline">Info</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Дополнительная информация</Tooltip.Content>
          </Tooltip>
        </Ex>
        <Ex label="Small size">
          <Tooltip size="small">
            <Tooltip.Trigger>
              <Button size="small" variant="outline">Small</Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Компактная подсказка</Tooltip.Content>
          </Tooltip>
        </Ex>
        <Ex label="Custom — иконки">
          <div className="flex gap-mid">
            {([
              { icon: <IoSettingsOutline />, tip: "Настройки", variant: "secondary" },
              { icon: <IoBarChartOutline />, tip: "Аналитика", variant: "info" },
              { icon: <IoPersonOutline />, tip: "Профиль", variant: "default" },
              { icon: <IoTrashOutline />, tip: "Удалить", variant: "danger" },
            ] as const).map(({ icon, tip, variant }) => (
              <Tooltip key={tip} variant={variant} size="small">
                <Tooltip.Trigger>
                  <Button variant="ghost" iconOnly aria-label={tip}>{icon}</Button>
                </Tooltip.Trigger>
                <Tooltip.Content>{tip}</Tooltip.Content>
              </Tooltip>
            ))}
          </div>
        </Ex>
      </ShowcaseCard>

      {/* ── Popover ── */}
      <ShowcaseCard title="Popover" description="Всплывающая панель по клику на триггере.">
        <Ex label="Basic">
          <Popover>
            <Popover.Trigger>
              <Button variant="outline">Открыть</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Body>
                <Text variant="small">Произвольный контент внутри панели.</Text>
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Ex>
        <Ex label="With header">
          <Popover side="bottom">
            <Popover.Trigger>
              <Button variant="secondary">Настройки</Button>
            </Popover.Trigger>
            <Popover.Content showArrow>
              <Popover.Arrow />
              <Popover.Header>
                <Popover.Label>Экспорт</Popover.Label>
                <Popover.Hint>Выберите формат</Popover.Hint>
              </Popover.Header>
              <Popover.Body>
                <div className="flex flex-col gap-small">
                  <Button size="small" variant="outline">PDF</Button>
                  <Button size="small" variant="outline">CSV</Button>
                </div>
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Ex>
        <Ex label="Outline trigger">
          <Popover>
            <Popover.Trigger>
              <Button variant="outline" leftIcon={<IoSettingsOutline />}>Меню</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Body>
                <Text variant="small">Быстрые действия и настройки.</Text>
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Ex>
        <Ex label="Left side">
          <Popover side="left">
            <Popover.Trigger>
              <Button variant="ghost">Слева</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Body><Text variant="small">Панель слева от триггера.</Text></Popover.Body>
            </Popover.Content>
          </Popover>
        </Ex>
        <Ex label="Large size">
          <Popover size="large">
            <Popover.Trigger>
              <Button variant="outline">Large</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Body><Text variant="small">Увеличенные отступы панели.</Text></Popover.Body>
            </Popover.Content>
          </Popover>
        </Ex>
        <Ex label="Custom — поделиться">
          <Popover>
            <Popover.Trigger>
              <Button variant="secondary" leftIcon={<IoOpenOutline />}>Поделиться</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.Header>
                <Popover.Label>Ссылка на проект</Popover.Label>
                <Popover.Hint>Доступна всем по ссылке</Popover.Hint>
              </Popover.Header>
              <Popover.Body>
                <div className="flex gap-small">
                  <Input placeholder="https://burne-ui.dev" className="flex-1" size="small" />
                  <Button size="small">Скопировать</Button>
                </div>
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Ex>
      </ShowcaseCard>

      {/* ── Dropdown ── */}
      <ShowcaseCard title="Dropdown" description="Выпадающее меню с одиночным выбором и группами.">
        <Ex label="Single select">
          <Dropdown selectionIndicator defaultValue="ru">
            <Dropdown.Trigger asChild>
              <Button variant="outline">Язык</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Group>
                <Dropdown.Label>Язык интерфейса</Dropdown.Label>
                <Dropdown.Item value="ru">
                  <Dropdown.ItemIndicator />
                  <Dropdown.ItemLabel>Русский</Dropdown.ItemLabel>
                </Dropdown.Item>
                <Dropdown.Item value="en">
                  <Dropdown.ItemIndicator />
                  <Dropdown.ItemLabel>English</Dropdown.ItemLabel>
                  <Dropdown.ItemIcon><IoGlobeOutline aria-hidden /></Dropdown.ItemIcon>
                </Dropdown.Item>
              </Dropdown.Group>
            </Dropdown.Popover>
          </Dropdown>
        </Ex>
        <Ex label="With hints">
          <Dropdown selectionIndicator defaultValue="ru">
            <Dropdown.Trigger asChild>
              <Button variant="outline">Регион</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Item value="ru">
                <Dropdown.ItemIndicator />
                <Dropdown.ItemLabel>Россия</Dropdown.ItemLabel>
                <Dropdown.ItemHint>UTC+3</Dropdown.ItemHint>
              </Dropdown.Item>
              <Dropdown.Item value="eu">
                <Dropdown.ItemIndicator />
                <Dropdown.ItemLabel>Европа</Dropdown.ItemLabel>
                <Dropdown.ItemHint>UTC+1</Dropdown.ItemHint>
              </Dropdown.Item>
            </Dropdown.Popover>
          </Dropdown>
        </Ex>
        <Ex label="With separator">
          <Dropdown defaultValue="profile">
            <Dropdown.Trigger asChild>
              <Button variant="secondary" leftIcon={<IoPersonOutline />}>Аккаунт</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Item value="profile" selection={false}>
                <Dropdown.ItemLabel>Профиль</Dropdown.ItemLabel>
              </Dropdown.Item>
              <Dropdown.Item value="settings" selection={false}>
                <Dropdown.ItemLabel>Настройки</Dropdown.ItemLabel>
                <Dropdown.ItemIcon><IoSettingsOutline aria-hidden /></Dropdown.ItemIcon>
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item value="logout" selection={false} variant="danger">
                <Dropdown.ItemLabel>Выйти</Dropdown.ItemLabel>
              </Dropdown.Item>
            </Dropdown.Popover>
          </Dropdown>
        </Ex>
        <Ex label="Disabled item">
          <Dropdown selectionIndicator defaultValue="a">
            <Dropdown.Trigger asChild>
              <Button variant="outline">План</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Item value="a">
                <Dropdown.ItemIndicator />
                <Dropdown.ItemLabel>Free</Dropdown.ItemLabel>
              </Dropdown.Item>
              <Dropdown.Item value="b" disabled>
                <Dropdown.ItemIndicator />
                <Dropdown.ItemLabel>Enterprise</Dropdown.ItemLabel>
                <Dropdown.ItemHint>Скоро</Dropdown.ItemHint>
              </Dropdown.Item>
            </Dropdown.Popover>
          </Dropdown>
        </Ex>
        <Ex label="Ghost trigger">
          <Dropdown defaultValue="edit">
            <Dropdown.Trigger asChild>
              <Button variant="ghost">Действия</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Item value="edit" selection={false}>
                <Dropdown.ItemLabel>Редактировать</Dropdown.ItemLabel>
              </Dropdown.Item>
              <Dropdown.Item value="delete" selection={false} variant="danger">
                <Dropdown.ItemLabel>Удалить</Dropdown.ItemLabel>
              </Dropdown.Item>
            </Dropdown.Popover>
          </Dropdown>
        </Ex>
        <Ex label="Custom — аккаунт">
          <Dropdown defaultValue="">
            <Dropdown.Trigger asChild>
              <button className="flex items-center gap-small rounded-mid px-small py-xsmall hover:bg-surface-secondary transition-colors">
                <Avatar size="small" label="Kate">
                  <Avatar.Image src={DEMO_IMG} alt="" loading="lazy" />
                  <Avatar.Fallback />
                </Avatar>
                <div className="text-left">
                  <Text variant="small" className="font-medium text-foreground leading-none">Kate Moore</Text>
                  <Text variant="small" className="text-muted">kate@acme.com</Text>
                </div>
              </button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Item value="profile" selection={false}>
                <Dropdown.ItemLabel>Профиль</Dropdown.ItemLabel>
                <Dropdown.ItemIcon><IoPersonOutline aria-hidden /></Dropdown.ItemIcon>
              </Dropdown.Item>
              <Dropdown.Item value="settings" selection={false}>
                <Dropdown.ItemLabel>Настройки</Dropdown.ItemLabel>
                <Dropdown.ItemIcon><IoSettingsOutline aria-hidden /></Dropdown.ItemIcon>
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item value="logout" selection={false} variant="danger">
                <Dropdown.ItemLabel>Выйти</Dropdown.ItemLabel>
              </Dropdown.Item>
            </Dropdown.Popover>
          </Dropdown>
        </Ex>
      </ShowcaseCard>

      {/* ── Dialog ── */}
      <ShowcaseCard title="Dialog" description="Модальное окно с header, body и footer.">
        <Ex label="Default">
          <DialogDemo />
        </Ex>
        <Ex label="С формой">
          <DialogFormDemo />
        </Ex>
        <Ex label="Без описания">
          <DialogSimpleDemo />
        </Ex>
        <Ex label="Длинный контент">
          <DialogScrollDemo />
        </Ex>
        <Ex label="Только footer">
          <DialogFooterDemo />
        </Ex>
        <Ex label="Custom — новый проект">
          <NewProjectDialogDemo />
        </Ex>
      </ShowcaseCard>

      {/* ── AlertDialog ── */}
      <ShowcaseCard title="AlertDialog" description="Модалка подтверждения со статусными тонами.">
        <Ex label="Default">
          <AlertDialogDemo label="Default" status="default" />
        </Ex>
        <Ex label="Danger">
          <AlertDialogDemo label="Удалить" status="danger" />
        </Ex>
        <Ex label="Success">
          <AlertDialogDemo label="Success" status="success" />
        </Ex>
        <Ex label="Info">
          <AlertDialogDemo label="Info" status="info" />
        </Ex>
        <Ex label="Warning">
          <AlertDialogDemo label="Warning" status="warning" />
        </Ex>
        <Ex label="Custom — удаление">
          <AlertDialogDemo label="Удалить 12 файлов" status="danger" description="Это действие необратимо. Все выбранные файлы будут удалены без возможности восстановления." confirm="Удалить всё" />
        </Ex>
      </ShowcaseCard>

      {/* ── Drawer ── */}
      <ShowcaseCard title="Drawer" description="Выдвижная панель. Плейсменты, размеры, Handle для свайпа.">
        <Ex label="Right">
          <DrawerDemo label="Справа" placement="right" />
        </Ex>
        <Ex label="Left">
          <DrawerDemo label="Слева" placement="left" />
        </Ex>
        <Ex label="Bottom + Handle">
          <DrawerDemo label="Снизу" placement="bottom" withHandle />
        </Ex>
        <Ex label="Mid size">
          <DrawerDemo label="Mid" placement="right" size="mid" />
        </Ex>
        <Ex label="Full">
          <DrawerDemo label="Full" placement="right" size="full" />
        </Ex>
        <Ex label="Custom — фильтры">
          <FilterDrawerDemo />
        </Ex>
      </ShowcaseCard>

      {/* ── Toast ── */}
      <ShowcaseCard title="Toast" description="Императивные уведомления через useToast(). Стек до 3 видимых.">
        <Ex label="Success">
          <ToastQuickDemo method="success" />
        </Ex>
        <Ex label="Danger">
          <ToastQuickDemo method="danger" />
        </Ex>
        <Ex label="Info">
          <ToastQuickDemo method="info" />
        </Ex>
        <Ex label="Warning">
          <ToastQuickDemo method="warning" />
        </Ex>
        <Ex label="Promise">
          <ToastQuickDemo method="promise" />
        </Ex>
        <Ex label="Custom — стек">
          <ToastStackDemo />
        </Ex>
      </ShowcaseCard>

      {/* ── Table ── */}
      <ShowcaseCard title="Table" description="Таблица данных. Сортировка, варианты, toned-строки, кастомные ячейки." cols={3}>
        <Ex label="Basic">
          <Block>
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Команда" className="min-w-[480px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Имя</Table.Column>
                    <Table.Column>Роль</Table.Column>
                    <Table.Column>Email</Table.Column>
                  </Table.Header>
                  <Table.Body items={TABLE_USERS}>
                    {(user) => (
                      <Table.Row key={user.id} id={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Block>
        </Ex>
        <Ex label="Secondary">
          <Block>
            <Table variant="secondary">
              <Table.ScrollContainer>
                <Table.Content aria-label="Команда secondary" className="min-w-[480px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Имя</Table.Column>
                    <Table.Column>Роль</Table.Column>
                    <Table.Column>Статус</Table.Column>
                  </Table.Header>
                  <Table.Body items={TABLE_USERS}>
                    {(user) => (
                      <Table.Row key={user.id} id={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                        <Table.Cell>{user.status}</Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Block>
        </Ex>
        <Ex label="Custom cells">
          <Block>
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Статусы" className="min-w-[480px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Имя</Table.Column>
                    <Table.Column>Статус</Table.Column>
                  </Table.Header>
                  <Table.Body items={TABLE_USERS}>
                    {(user: (typeof TABLE_USERS)[number]) => (
                      <Table.Row key={user.id} id={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>
                          <Badge color={STATUS_BADGE[user.status]} size="small">{user.status}</Badge>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Block>
        </Ex>
        <Ex label="Toned rows">
          <Block>
            <Table variant="toned">
              <Table.ScrollContainer>
                <Table.Content aria-label="Toned" className="min-w-[480px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Имя</Table.Column>
                    <Table.Column>Статус</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {TABLE_USERS.map((user) => (
                      <Table.Row key={user.id} id={user.id} tone={STATUS_ROW_TONE[user.status]}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.status}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Block>
        </Ex>
        <Ex label="Empty">
          <Block>
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Пусто" className="min-w-[480px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Имя</Table.Column>
                    <Table.Column>Роль</Table.Column>
                  </Table.Header>
                  <Table.Body items={[]} renderEmptyState={() => (
                    <span className="text-muted">Нет данных</span>
                  )}>
                    {() => null}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Block>
        </Ex>
        <Ex label="Custom — сортировка">
          <Block><SortableTableDemo /></Block>
        </Ex>
      </ShowcaseCard>

      {/* ── ColorPicker ── */}
      <ShowcaseCard title="ColorPicker" description="Выбор цвета через Popover. Canvas, hue/alpha слайдеры, hex-ввод.">
        <Ex label="Default">
          <ColorPickerDemo />
        </Ex>
        <Ex label="With alpha">
          <ColorPickerDemo showAlpha />
        </Ex>
        <Ex label="Small trigger">
          <div className="flex flex-col items-center gap-small">
            <ColorPicker defaultValue="#22c55e" size="small">
              <ColorPicker.Trigger />
              <ColorPicker.Content />
            </ColorPicker>
          </div>
        </Ex>
        <Ex label="Mid trigger">
          <div className="flex flex-col items-center gap-small">
            <ColorPicker defaultValue="#a855f7" size="mid">
              <ColorPicker.Trigger />
              <ColorPicker.Content />
            </ColorPicker>
          </div>
        </Ex>
        <Ex label="Presets">
          <ColorPickerPresetsDemo />
        </Ex>
        <Ex label="Custom — бренд">
          <div className="flex flex-col items-center gap-mid">
            <Text variant="small" className="text-muted">Фирменные цвета</Text>
            <div className="flex gap-mid">
              {(["#6d28d9","#0ea5e9","#10b981","#f59e0b"] as const).map((color, i) => (
                <div key={color} className="flex flex-col items-center gap-xsmall">
                  <ColorPicker defaultValue={color} size="mid">
                    <ColorPicker.Trigger />
                    <ColorPicker.Content />
                  </ColorPicker>
                  <Text variant="small" className="font-mono text-muted text-[10px]">
                    {["Primary","Blue","Green","Amber"][i]}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Ex>
      </ShowcaseCard>

      {/* ── Link ── */}
      <ShowcaseCard title="Link" description="Текстовая ссылка с hover-lift и иконками.">
        <Ex label="Default">
          <Link href="#" onClick={(e) => e.preventDefault()}>Подробнее</Link>
        </Ex>
        <Ex label="With icon">
          <Link href="#" showDefaultIcon defaultIconPosition="end" onClick={(e) => e.preventDefault()}>
            Дальше
          </Link>
        </Ex>
        <Ex label="Underline">
          <Link href="#" underline onClick={(e) => e.preventDefault()}>Документация</Link>
        </Ex>
        <Ex label="Small">
          <Link href="#" size="small" onClick={(e) => e.preventDefault()}>Маленькая ссылка</Link>
        </Ex>
        <Ex label="Custom icon">
          <Link href="#" leftIcon={<IoOpenOutline />} onClick={(e) => e.preventDefault()}>
            Открыть
          </Link>
        </Ex>
        <Ex label="Custom — ресурсы">
          <nav>
            <ul className="flex flex-col gap-small">
              {[
                { href: "#", label: "Документация" },
                { href: "#", label: "Компоненты" },
                { href: "#", label: "Исходный код" },
                { href: "#", label: "npm пакет" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} showDefaultIcon defaultIconPosition="end" onClick={(e) => e.preventDefault()}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Ex>
      </ShowcaseCard>

      {/* ── Surface & Separator ── */}
      <ShowcaseCard title="Surface & Separator" description="Базовые поверхности и разделители контента.">
        <Ex label="Default">
          <Surface padding="plus" className="w-40">
            <Text variant="small">default surface</Text>
          </Surface>
        </Ex>
        <Ex label="Outline">
          <Surface variant="outline" padding="plus" className="w-40">
            <Text variant="small">outline</Text>
          </Surface>
        </Ex>
        <Ex label="Secondary">
          <Surface variant="secondary" padding="plus" className="w-40">
            <Text variant="small">secondary</Text>
          </Surface>
        </Ex>
        <Ex label="With shadow">
          <Surface shadow="md" padding="plus" className="w-40">
            <Text variant="small">shadow md</Text>
          </Surface>
        </Ex>
        <Ex label="Separator">
          <div className="flex w-48 flex-col gap-small">
            <Text variant="small">Секция A</Text>
            <Separator />
            <Text variant="small">Секция B</Text>
            <Separator orientation="vertical" className="hidden" />
          </div>
        </Ex>
        <Ex label="Custom — тарифная карта">
          <Surface variant="outline" padding="plus" radius="large" className="w-52">
            <div className="flex flex-col gap-mid">
              <div>
                <Text variant="small" className="text-muted uppercase tracking-wide text-[10px]">Pro план</Text>
                <div className="mt-xsmall flex items-baseline gap-xsmall">
                  <span className="text-2xl font-bold text-foreground">$12</span>
                  <Text variant="small" className="text-muted">/мес</Text>
                </div>
              </div>
              <Separator />
              <ul className="flex flex-col gap-small">
                {["Безлимитные проекты", "Приоритетная поддержка", "Custom домен"].map((f) => (
                  <li key={f} className="flex items-center gap-small">
                    <Badge color="success" size="small">✓</Badge>
                    <Text variant="small" className="text-muted">{f}</Text>
                  </li>
                ))}
              </ul>
              <Button size="small">Выбрать план</Button>
            </div>
          </Surface>
        </Ex>
      </ShowcaseCard>

      {/* ── Accordion ── */}
      <ShowcaseCard title="Accordion" description="Группа раскрывающихся пунктов на базе Expandable." cols={3}>
        <Ex label="Default">
          <Block><AccordionFAQ /></Block>
        </Ex>
        <Ex label="Second open">
          <Block>
            <Accordion defaultOpenIndex={1}>
              <Accordion.Item>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    <Accordion.Message>
                      <Accordion.Content><Accordion.Title>Пункт 1</Accordion.Title></Accordion.Content>
                      <Accordion.Indicator />
                    </Accordion.Message>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel><Accordion.Body>Контент первого пункта.</Accordion.Body></Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    <Accordion.Message>
                      <Accordion.Content><Accordion.Title>Пункт 2</Accordion.Title></Accordion.Content>
                      <Accordion.Indicator />
                    </Accordion.Message>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel><Accordion.Body>Открыт по умолчанию.</Accordion.Body></Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Block>
        </Ex>
        <Ex label="Single item">
          <Block>
            <Accordion defaultOpenIndex={0}>
              <Accordion.Item>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    <Accordion.Message>
                      <Accordion.Content><Accordion.Title>Единственный пункт</Accordion.Title></Accordion.Content>
                      <Accordion.Indicator />
                    </Accordion.Message>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel><Accordion.Body>FAQ с одним ответом.</Accordion.Body></Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Block>
        </Ex>
        <Ex label="Custom — настройки">
          <Block>
            <Accordion defaultOpenIndex={0}>
              {([
                { title: "Профиль", hint: "Имя, аватар, email", body: <div className="flex flex-col gap-small"><Input size="small" label="Имя" placeholder="Иван Иванов" /><Input size="small" label="Email" placeholder="ivan@email.com" /></div> },
                { title: "Безопасность", hint: "Пароль и 2FA", body: <Switch defaultChecked aria-label="Двухфакторная аутентификация" /> },
              ]).map((s, i) => (
                <Accordion.Item key={s.title}>
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      <Accordion.Message>
                        <Accordion.Content>
                          <Accordion.Title>{s.title}</Accordion.Title>
                          <Accordion.Description>{s.hint}</Accordion.Description>
                        </Accordion.Content>
                        <Accordion.Indicator />
                      </Accordion.Message>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel><Accordion.Body>{s.body}</Accordion.Body></Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── Expandable ── */}
      <ShowcaseCard title="Expandable" description="Раскрывающийся блок. Simple и compound API." cols={3}>
        <Ex label="Simple">
          <Block>
            <Expandable title="Уведомления" description="Email и push">
              <p className="text-sm text-muted">Настройте каналы доставки уведомлений.</p>
            </Expandable>
          </Block>
        </Ex>
        <Ex label="Default open">
          <Block>
            <Expandable defaultOpen title="Открыт по умолчанию">
              <p className="text-sm text-muted">Контент виден сразу.</p>
            </Expandable>
          </Block>
        </Ex>
        <Ex label="С изображением">
          <Block>
            <Expandable title="Галерея" description="Редакционный кадр">
              <img src={DEMO_IMG} alt="" className="w-full rounded-mid object-cover" loading="lazy" />
            </Expandable>
          </Block>
        </Ex>
        <Ex label="Только заголовок">
          <Block>
            <Expandable title="Без описания">
              <p className="text-sm text-muted">Минимальный вариант триггера.</p>
            </Expandable>
          </Block>
        </Ex>
        <Ex label="Compound">
          <Block>
            <Expandable>
              <Expandable.Trigger>
                <Expandable.Content>
                  <Expandable.Title>Compound API</Expandable.Title>
                  <Expandable.Description>Кастомная разметка триггера</Expandable.Description>
                </Expandable.Content>
              </Expandable.Trigger>
              <Expandable.Panel>
                <p className="text-sm text-muted">Полный контроль над анатомией.</p>
              </Expandable.Panel>
            </Expandable>
          </Block>
        </Ex>
        <Ex label="Custom — код">
          <Block>
            <Expandable defaultOpen title="Пример кода" description="TypeScript">
              <Surface variant="secondary" radius="mid" padding="base" className="overflow-x-auto">
                <pre className="text-xs leading-relaxed text-foreground whitespace-pre">{`import { Button } from 'burne-ui';

export function Demo() {
  return (
    <Button variant="outline">
      Hello World
    </Button>
  );
}`}</pre>
              </Surface>
            </Expandable>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── ComboBox ── */}
      <ShowcaseCard title="ComboBox" description="Combobox с поиском. Simple API с options." cols={3}>
        <Ex label="Default">
          <Block>
            <ComboBox label="Язык" options={COMBO_OPTIONS} defaultValue="ru" placeholder="Выберите язык" />
          </Block>
        </Ex>
        <Ex label="Outline">
          <Block>
            <ComboBox label="Регион" variant="outline" options={COMBO_OPTIONS} defaultValue="en" />
          </Block>
        </Ex>
        <Ex label="Small">
          <Block>
            <ComboBox label="Язык" size="small" options={COMBO_OPTIONS} defaultValue="ru" />
          </Block>
        </Ex>
        <Ex label="Large">
          <Block>
            <ComboBox label="Язык" size="large" options={COMBO_OPTIONS} defaultValue="de" />
          </Block>
        </Ex>
        <Ex label="Disabled">
          <Block>
            <ComboBox label="Недоступно" options={COMBO_OPTIONS} disabled defaultValue="ru" />
          </Block>
        </Ex>
        <Ex label="Custom — фреймворк">
          <Block>
            <ComboBox
              label="Фреймворк"
              placeholder="Выберите фреймворк…"
              defaultValue="react"
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "svelte", label: "Svelte" },
                { value: "angular", label: "Angular" },
                { value: "solid", label: "Solid.js" },
              ]}
            />
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── ListBox ── */}
      <ShowcaseCard title="ListBox" description="Список выбора для Popover и ComboBox." cols={3}>
        <Ex label="Basic">
          <Block>
            <ListBox defaultValue="ru">
              <ListBox.Item value="ru" label="Русский" hint="Интерфейс на русском" />
              <ListBox.Item value="en" label="English" hint="UI in English" />
              <ListBox.Item value="de" label="Deutsch" disabled hint="Скоро" />
            </ListBox>
          </Block>
        </Ex>
        <Ex label="Compound">
          <Block>
            <ListBox defaultValue="en">
              <ListBox.Section>
                <ListBox.Header>Языки</ListBox.Header>
                <ListBox.Item value="ru">
                  <ListBox.Label>Русский</ListBox.Label>
                  <ListBox.Hint>Кириллица</ListBox.Hint>
                </ListBox.Item>
                <ListBox.Item value="en">
                  <ListBox.Label>English</ListBox.Label>
                  <ListBox.Hint>Latin</ListBox.Hint>
                  <ListBox.Icon><IoGlobeOutline aria-hidden /></ListBox.Icon>
                </ListBox.Item>
              </ListBox.Section>
            </ListBox>
          </Block>
        </Ex>
        <Ex label="Small size">
          <Block>
            <ListBox size="small" defaultValue="ru">
              <ListBox.Item value="ru" label="Русский" />
              <ListBox.Item value="en" label="English" />
            </ListBox>
          </Block>
        </Ex>
        <Ex label="Large size">
          <Block>
            <ListBox size="large" defaultValue="ru">
              <ListBox.Item value="ru" label="Русский" />
              <ListBox.Item value="en" label="English" />
            </ListBox>
          </Block>
        </Ex>
        <Ex label="Single item">
          <Block>
            <ListBox defaultValue="only">
              <ListBox.Item value="only" label="Единственный пункт" />
            </ListBox>
          </Block>
        </Ex>
        <Ex label="Custom — приоритет">
          <Block>
            <ListBox defaultValue="medium">
              <ListBox.Section>
                <ListBox.Header>Приоритет задачи</ListBox.Header>
                <ListBox.Item value="low">
                  <ListBox.Label>Низкий</ListBox.Label>
                  <ListBox.Hint>Когда будет время</ListBox.Hint>
                  <ListBox.Icon><Badge color="secondary" size="small">●</Badge></ListBox.Icon>
                </ListBox.Item>
                <ListBox.Item value="medium">
                  <ListBox.Label>Средний</ListBox.Label>
                  <ListBox.Hint>Текущий спринт</ListBox.Hint>
                  <ListBox.Icon><Badge color="warning" size="small">●</Badge></ListBox.Icon>
                </ListBox.Item>
                <ListBox.Item value="high">
                  <ListBox.Label>Высокий</ListBox.Label>
                  <ListBox.Hint>Срочно</ListBox.Hint>
                  <ListBox.Icon><Badge color="danger" size="small">●</Badge></ListBox.Icon>
                </ListBox.Item>
              </ListBox.Section>
            </ListBox>
          </Block>
        </Ex>
      </ShowcaseCard>

      {/* ── CheckboxGroup & RadioGroup ── */}
      <ShowcaseCard title="CheckboxGroup & RadioGroup" description="Группы связанных элементов выбора." cols={3}>
        <Ex label="Checkbox multiple">
          <Block>
            <CheckboxGroup selection="multiple">
              <CheckboxGroup.Legend>
                <CheckboxGroup.Label>Доставка</CheckboxGroup.Label>
                <CheckboxGroup.Hint>Можно выбрать несколько</CheckboxGroup.Hint>
              </CheckboxGroup.Legend>
              <CheckboxGroup.List>
                <Checkbox name="ship" value="courier" label="Курьер" defaultChecked />
                <Checkbox name="ship" value="pickup" label="Самовывоз" />
                <Checkbox name="ship" value="post" label="Почта" />
              </CheckboxGroup.List>
            </CheckboxGroup>
          </Block>
        </Ex>
        <Ex label="Checkbox single">
          <Block>
            <CheckboxGroup selection="single" defaultValue="pickup">
              <CheckboxGroup.Legend><CheckboxGroup.Label>Один вариант</CheckboxGroup.Label></CheckboxGroup.Legend>
              <CheckboxGroup.List>
                <Checkbox name="one" value="courier" label="Курьер" />
                <Checkbox name="one" value="pickup" label="Самовывоз" />
              </CheckboxGroup.List>
            </CheckboxGroup>
          </Block>
        </Ex>
        <Ex label="Radio vertical">
          <Block>
            <RadioGroup defaultValue="free" name="plan">
              <RadioGroup.Legend><RadioGroup.Label>Тариф</RadioGroup.Label></RadioGroup.Legend>
              <RadioGroup.List>
                <Radio value="free" label="Бесплатный" />
                <Radio value="pro" label="Pro" />
                <Radio value="enterprise" label="Enterprise" disabled />
              </RadioGroup.List>
            </RadioGroup>
          </Block>
        </Ex>
        <Ex label="Radio horizontal">
          <Block>
            <RadioGroup defaultValue="month" name="period">
              <RadioGroup.List orientation="horizontal">
                <Radio value="month" label="Месяц" />
                <Radio value="year" label="Год" />
              </RadioGroup.List>
            </RadioGroup>
          </Block>
        </Ex>
        <Ex label="Disabled group">
          <Block>
            <CheckboxGroup disabled defaultValue="a">
              <CheckboxGroup.List>
                <Checkbox name="d" value="a" label="Пункт A" />
                <Checkbox name="d" value="b" label="Пункт B" />
              </CheckboxGroup.List>
            </CheckboxGroup>
          </Block>
        </Ex>
        <Ex label="Custom — тариф">
          <Block>
            <RadioGroup defaultValue="pro" name="billing">
              <RadioGroup.Legend>
                <RadioGroup.Label>Тарифный план</RadioGroup.Label>
                <RadioGroup.Hint>Можно изменить в любое время</RadioGroup.Hint>
              </RadioGroup.Legend>
              <RadioGroup.List>
                <Radio value="free" label="Бесплатный — $0/мес" />
                <Radio value="pro" label="Pro — $12/мес" />
                <Radio value="team" label="Team — $49/мес" />
                <Radio value="enterprise" label="Enterprise" disabled />
              </RadioGroup.List>
            </RadioGroup>
          </Block>
        </Ex>
      </ShowcaseCard>
    </div>
    </Toast.Provider>
  );
}
