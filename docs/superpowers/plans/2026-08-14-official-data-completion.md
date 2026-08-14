# 官方资料逐项完善实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 仅以厂家官网和官方数据表逐项完善现有竞争产品资料。

**Architecture:** `src/data/competitors.ts` 保存产品事实，`src/data/sources.ts` 保存官方链接，`src/data/brandProfiles.ts` 保存品牌边界，`src/lib/selection.test.ts` 保护品牌、型号与来源关联。

**Tech Stack:** React、TypeScript、Vite、Vitest、GitHub Pages。

## Global Constraints

- 仅采用厂家官网页面、厂家官方 PDF 数据表/手册或厂家官方公告。
- 每个新字段必须由同条产品记录的 `sources` 支持。
- 官网没有型号级数据时保留“待厂家确认”，并在 `notes` 写明缺少资料类型。
- 船级社字段仅在厂家官网明确列出证书、型号或适用范围时填写。
- 比较记录必须始终保留品牌与型号。

---

### Task 1: 建立型号级缺口基线

**Files:**
- Modify: `src/lib/selection.test.ts`
- Modify: `src/data/competitors.ts`

**Interfaces:**
- Consumes: `valveSeries: ValveSeries[]`
- Produces: 具体型号的官方资料缺口说明。

- [ ] **Step 1: Write the failing test**

```ts
const tracked = valveSeries.filter((item) => ['gwc-floating-ball', 'habonim-c74', 'baker-masoneilan-21000', 'rays-cryo-butterfly-maintenance-port', 'flowserve-mccanna'].includes(item.id))
expect(tracked.every((item) => item.sources.length > 0 && item.notes.length > 0)).toBe(true)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run`

Expected: FAIL until each tracked model states its official-data boundary.

- [ ] **Step 3: Write minimal implementation**

Update each affected `notes` entry with the missing official document type; do not infer values.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- --run`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/selection.test.ts src/data/competitors.ts
git commit -m "标注型号级官方资料缺口"
```

### Task 2: 完善现有具体型号参数

**Files:**
- Modify: `src/data/sources.ts`
- Modify: `src/data/competitors.ts`
- Modify: `src/lib/selection.test.ts`

**Interfaces:**
- Consumes: `sources: Record<string, SourceLink>` and `ValveSeries`.
- Produces: GWC Floating Ball、Habonim C74、Baker 21000、Flowserve McCANNA、RAYS 维护口蝶阀的官方参数。

- [ ] **Step 1: Write the failing test**

```ts
expect(valveSeries.find((item) => item.id === 'gwc-floating-ball')?.notes.join(' ')).toContain('官方')
expect(valveSeries.find((item) => item.id === 'habonim-c74')?.notes.join(' ')).toContain('官方')
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run`

Expected: FAIL before new official product data is written.

- [ ] **Step 3: Write minimal implementation**

Use official product pages or official PDFs to populate only directly stated pressure, size, connection, material, construction, accessory and standard fields; add a named official source for every new page.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- --run`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/sources.ts src/data/competitors.ts src/lib/selection.test.ts
git commit -m "补全已有型号官网参数"
```

### Task 3: 处理泛系列与方案记录

**Files:**
- Modify: `src/data/sources.ts`
- Modify: `src/data/competitors.ts`
- Modify: `src/data/brandProfiles.ts`
- Modify: `src/lib/selection.test.ts`

**Interfaces:**
- Consumes: 泛系列 `ValveSeries`。
- Produces: 具名产品拆分记录或清晰的型号资料缺口说明。

- [ ] **Step 1: Write the failing test**

```ts
const generic = valveSeries.filter((item) => item.modelKind === '公开产品系列')
expect(generic.every((item) => item.notes.join(' ').includes('型号'))).toBe(true)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run`

Expected: FAIL before all generic records describe their model-level boundary.

- [ ] **Step 3: Write minimal implementation**

Add a new named record only when an official page names the product. Otherwise retain the generic record and identify the missing model datasheet, certificate or ordering specification in `notes`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- --run`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/sources.ts src/data/competitors.ts src/data/brandProfiles.ts src/lib/selection.test.ts
git commit -m "完善泛系列官方型号边界"
```

### Task 4: 船级社与认证边界核验

**Files:**
- Modify: `src/data/sources.ts`
- Modify: `src/data/competitors.ts`
- Modify: `src/lib/selection.test.ts`

**Interfaces:**
- Consumes: `classSocieties: string[]` and `standards: string[]`.
- Produces: 仅由官网证实的船级社适用信息。

- [ ] **Step 1: Write the failing test**

```ts
const classified = valveSeries.filter((item) => item.classSocieties.length > 0)
expect(classified.every((item) => item.sources.length > 0)).toBe(true)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- --run`

Expected: FAIL before any new classification range is sourced.

- [ ] **Step 3: Write minimal implementation**

Write DNV, ABS, LR or CCS only where the manufacturer official page provides the approval and product scope. Keep design codes in `standards` and unverified class societies empty.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- --run`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/sources.ts src/data/competitors.ts src/lib/selection.test.ts
git commit -m "核验船级社与认证边界"
```

### Task 5: 全库验证与发布

**Files:**
- Modify: `src/data/competitors.ts`
- Modify: `src/lib/selection.test.ts`

**Interfaces:**
- Consumes: 全部竞争产品数据与筛选/对比逻辑。
- Produces: 已发布的 GitHub Pages 资料库。

- [ ] **Step 1: Write completeness test**

```ts
expect(valveSeries.every((item) => item.brand.trim() && item.model.trim() && item.sources.length)).toBe(true)
```

- [ ] **Step 2: Run validation**

Run: `npm run test -- --run && npm run build && git diff --check`

Expected: all commands succeed.

- [ ] **Step 3: Publish**

```bash
git add src/data/competitors.ts src/data/sources.ts src/data/brandProfiles.ts src/lib/selection.test.ts
git commit -m "完成官方资料逐项核验"
git -c http.version=HTTP/1.1 push origin main
```

## Self-review

- Tasks cover official sources, incomplete fields, generic-series boundaries, class-society boundaries and publication.
- The plan uses existing `ValveSeries`, `SourceLink`, `classSocieties` and `standards` interfaces consistently.
- Missing official data remains explicitly marked rather than inferred.
