# 竞争产品选型库完整工作流 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将产品清单完善为可检索、可筛选、可比较、可浏览品牌情报并可跳转至竞品官方资料的四工作区资料库。

**Architecture:** 保持 React/Vite 单页应用，通过 `activeView` 管理工作区；产品、品牌和标准由本地强类型数据驱动。筛选、排序和比较逻辑放入 `src/lib`，详情和品牌档案通过统一的安全外链组件展示来源。

**Tech Stack:** React 19、TypeScript、Vite、Vitest、Testing Library、原生 CSS。

## Global Constraints

- 不引入未经厂商官网或官方 PDF 支持的产品、公司、项目或认证结论。
- 公司级公开能力范围不得显示为单一产品型号的额定参数。
- 所有外部来源链接以新标签页打开，并提供 `rel="noreferrer"`。
- 对比最多四条，任何比较入口与矩阵必须显示品牌和型号/系列。
- 桌面和手机端不能出现不可访问的主功能或内容截断。
- 保留 `公开证实`、`公开资料推断`、`待厂家确认` 的现有语义。

---

### Task 1: 产品检索、排序与选择逻辑

**Files:**
- Modify: `src/data/types.ts`
- Modify: `src/lib/selection.ts`
- Test: `src/lib/selection.test.ts`

**Interfaces:**
- Produces `SortKey = 'relevance' | 'brand' | 'temperature' | 'evidence'` and `sortSeries(items: ValveSeries[], key: SortKey): ValveSeries[]`.

- [ ] **Step 1: Write the failing tests**

```ts
it('matches a keyword against brand, model, application and medium', () => {
  expect(filterSeries(valveSeries, { ...defaultFilters, query: 'FGSS' }).length).toBeGreaterThan(0)
})

it('sorts by evidence level without dropping product identifiers', () => {
  const sorted = sortSeries(valveSeries, 'evidence')
  expect(sorted[0]).toMatchObject({ brand: expect.any(String), model: expect.any(String) })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/lib/selection.test.ts`

Expected: FAIL because `SortKey` and `sortSeries` do not exist.

- [ ] **Step 3: Implement the minimal typed sort**

```ts
export type SortKey = 'relevance' | 'brand' | 'temperature' | 'evidence'

export function sortSeries(items: ValveSeries[], key: SortKey) {
  return [...items].sort((left, right) => key === 'brand'
    ? left.brand.localeCompare(right.brand, 'zh-CN')
    : key === 'temperature'
      ? (left.minTemperature ?? Infinity) - (right.minTemperature ?? Infinity)
      : evidenceRank[left.evidence] - evidenceRank[right.evidence])
}
```

Expand the existing search haystack with standards and notes; keep all existing filters unchanged.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- src/lib/selection.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/types.ts src/lib/selection.ts src/lib/selection.test.ts
git commit -m "增加选型检索与排序逻辑"
```

### Task 2: 标准索引数据

**Files:**
- Create: `src/data/standards.ts`
- Test: `src/lib/selection.test.ts`

**Interfaces:**
- Produces `StandardReference { id, code, category, title, role, note }` and `standardReferences`.

- [ ] **Step 1: Write the failing test**

```ts
it('provides a navigable standard index with category and use boundary', () => {
  expect(standardReferences).toEqual(expect.arrayContaining([
    expect.objectContaining({ code: 'ISO 21011', category: '低温基础', role: expect.any(String), note: expect.any(String) }),
  ]))
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/lib/selection.test.ts`

Expected: FAIL because `standardReferences` is unavailable.

- [ ] **Step 3: Create bounded standards data**

```ts
export const standardReferences: StandardReference[] = [
  { id: 'iso-21011', code: 'ISO 21011', category: '低温基础', title: '低温用阀门', role: '低温阀的设计、制造与试验参考', note: '实际适用版本与附加要求以项目规格书为准。' },
]
```

Include the existing ISO 21011, BS 6364, GB/T 24925, LNG/船用和测试/认证分类条目. Do not attach a standard to a product or brand without existing source evidence.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm run test -- src/lib/selection.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/standards.ts src/lib/selection.test.ts
git commit -m "补充标准索引数据"
```

### Task 3: 四个可交互工作区

**Files:**
- Create: `src/components/LibraryView.tsx`
- Create: `src/components/CompareView.tsx`
- Create: `src/components/BrandDirectoryView.tsx`
- Create: `src/components/StandardsView.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/ComparisonPanel.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- `App` owns `activeView: 'library' | 'compare' | 'brands' | 'standards'`, filters, sorting and compared IDs.
- Views receive `onDetail(item)`, `onBrand(profile)`, `onCompare(id)`, `onRemove(id)` and `onNavigate(view)` callbacks.

- [ ] **Step 1: Write failing integration tests**

```tsx
it('searches products and shows an explicit no-results reset action', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.type(screen.getByLabelText('搜索产品或品牌'), 'not-a-valve')
  expect(screen.getByRole('button', { name: '重置条件' })).toBeInTheDocument()
})

it('opens comparison centre with brand and model for selected products', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.click(screen.getAllByLabelText('加入对比')[0])
  await user.click(screen.getAllByLabelText('加入对比')[1])
  await user.click(screen.getByRole('button', { name: '开始对比' }))
  expect(screen.getByRole('heading', { name: '对比中心' })).toBeInTheDocument()
  expect(screen.getByText(/纽威（Neway） · Cryogenic Gate Valve/)).toBeInTheDocument()
})

it('opens the brand directory with official source links', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.click(screen.getByRole('link', { name: '品牌情报' }))
  expect(screen.getByRole('heading', { name: '品牌情报' })).toBeInTheDocument()
  expect(screen.getAllByRole('link', { name: /官网资料/ })[0]).toHaveAttribute('target', '_blank')
})
```

- [ ] **Step 2: Run the tests to verify failure**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL because views and controls do not exist.

- [ ] **Step 3: Implement view state and focused components**

```tsx
type ViewName = 'library' | 'compare' | 'brands' | 'standards'
const [activeView, setActiveView] = useState<ViewName>('library')
```

`LibraryView` renders search, filters, sort, results and no-results reset. `CompareView` is a table-like parameter matrix; `BrandDirectoryView` filters cards by region/keyword and opens the existing profile dialog; `StandardsView` groups the new standard data. Make the floating compare action navigate to `compare`.

- [ ] **Step 4: Run the tests to verify pass**

Run: `npm run test -- src/App.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components src/App.test.tsx
git commit -m "完善竞品资料库工作区功能"
```

### Task 4: 统一安全外链、响应式视觉和发布验证

**Files:**
- Create: `src/components/SourceLinks.tsx`
- Modify: `src/components/ValveDetail.tsx`
- Modify: `src/components/BrandProfileDialog.tsx`
- Modify: `src/components/BrandDirectoryView.tsx`
- Modify: `src/styles/app.css`
- Modify: `src/styles/base.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Produces `SourceLinks({ sources, heading? }: { sources: SourceLink[]; heading?: string })`.

- [ ] **Step 1: Write failing safety and active-navigation tests**

```tsx
it('renders official product sources as safe new-tab links', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.click(screen.getAllByRole('button', { name: '查看详情' })[0])
  const source = screen.getAllByRole('link', { name: /Neway/ })[0]
  expect(source).toHaveAttribute('target', '_blank')
  expect(source).toHaveAttribute('rel', 'noreferrer')
})

it('marks the active workspace in primary navigation', async () => {
  const user = userEvent.setup(); render(<App />)
  await user.click(screen.getByRole('link', { name: '标准索引' }))
  expect(screen.getByRole('link', { name: '标准索引' })).toHaveAttribute('aria-current', 'page')
})
```

- [ ] **Step 2: Run the tests to verify failure**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL until shared links and navigation semantics exist.

- [ ] **Step 3: Add unified links and responsive styling**

```tsx
export function SourceLinks({ sources, heading = '公开来源' }: Props) {
  return <section><h3>{heading}</h3>{sources.map((source) =>
    <a key={source.url} className="source-link" href={source.url} target="_blank" rel="noreferrer">官网资料：{source.label}</a>
  )}</section>
}
```

Use the component in product detail, brand dialog and brand directory. Keep the navy/ice visual system, make comparison matrix horizontally scrollable, keep mobile navigation visible and ensure 390px views have no clipped primary controls.

- [ ] **Step 4: Run all automated checks**

Run: `npm run test && npm run build && git diff --check`

Expected: all tests pass, TypeScript build succeeds, no whitespace errors.

- [ ] **Step 5: Run browser verification and publish**

Run: `npm run dev -- --host 127.0.0.1`

Verify desktop and 390px: search → reset; select two → compare; brand directory → official source; standards view → active navigation. Capture screenshots and inspect them with `view_image`; fix clipped content or inaccessible controls before committing. Then run:

```bash
git add src/components src/styles src/App.tsx src/App.test.tsx
git commit -m "完善竞品资料库外链与响应式体验"
git push origin main
```

## Self-review

- Spec coverage: Tasks 1–4 implement search/sort, standards, all four workspaces, comparison, brand intelligence, source links, mobile layout, testing, browser verification and publish.
- Placeholder scan: no deferred work markers or undefined interfaces remain.
- Type consistency: all new components consume existing `ValveSeries`, `BrandProfile` and `SourceLink`; `SortKey` and `StandardReference` are defined before their views use them.
