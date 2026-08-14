# 竞品品牌档案 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为现有船用低温阀门产品库加入可追溯的品牌公司、制造基地、产品系列和市场覆盖档案。

**Architecture:** 新建 `brandProfiles` 数据集，用品牌展示名作为关联键，产品记录不复制公司资料。产品详情查询对应档案并提供弹窗入口；档案弹窗只呈现厂商官网已披露的信息与来源链接。

**Tech Stack:** React 19、TypeScript、Vite、Vitest。

## Global Constraints

- 公司、地址、市场与产品系列仅用厂商官网或厂商官方 PDF。
- 未公开披露的信息显示“官网未披露”，不作推断。
- 用户此前整理但未获官网确认的型号继续使用“待厂家确认”。
- 品牌档案必须有官方名称、核验日期和至少一个来源链接。

---

### Task 1: 建立品牌档案数据和完整性验证

**Files:**
- Modify: `src/data/types.ts`
- Create: `src/data/brandProfiles.ts`
- Modify: `src/data/sources.ts`
- Modify: `src/lib/selection.test.ts`

**Interfaces:**
- Produces: `BrandProfile` with `brand`, `officialName`, `headquarters`, `manufacturing`, `productFamilies`, `marineLngPositioning`, `marketCoverage`, `sources`, `verifiedAt`, `notes`.
- Produces: `brandProfiles: BrandProfile[]` and `profileForBrand(brand: string): BrandProfile | undefined`.

- [ ] **Step 1: Write the failing test**

```ts
it('maps every product brand to a source-backed brand profile', () => {
  expect(valveSeries.every((item) => {
    const profile = profileForBrand(item.brand)
    return Boolean(profile?.officialName && profile.sources.length && profile.verifiedAt)
  })).toBe(true)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/lib/selection.test.ts`

Expected: FAIL because `profileForBrand` and the brand-profile data do not exist.

- [ ] **Step 3: Write minimal implementation**

```ts
export interface BrandProfile {
  brand: string
  officialName: string
  headquarters: string
  manufacturing: string[]
  productFamilies: string[]
  marineLngPositioning: string[]
  marketCoverage: string[]
  sources: SourceLink[]
  verifiedAt: string
  notes: string[]
}

export const profileForBrand = (brand: string) => brandProfiles.find((item) => item.brand === brand)
```

Populate one profile for every distinct product brand with official sources and conservative “官网未披露” values where necessary.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/lib/selection.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/types.ts src/data/brandProfiles.ts src/data/sources.ts src/lib/selection.test.ts
git commit -m "新增竞品品牌档案数据"
```

### Task 2: 在产品详情接入品牌档案

**Files:**
- Create: `src/components/BrandProfileDialog.tsx`
- Modify: `src/components/ValveDetail.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/app.css`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: `profileForBrand`, `BrandProfile` from Task 1.
- Produces: `BrandProfileDialog({ profile, onClose })` and a “查看品牌档案” button in product detail.

- [ ] **Step 1: Write the failing test**

```tsx
it('opens the associated brand profile from a product detail', async () => {
  render(<App />)
  await userEvent.click(screen.getAllByRole('button', { name: '查看详情' })[0])
  await userEvent.click(screen.getByRole('button', { name: '查看品牌档案' }))
  expect(screen.getByRole('dialog', { name: '品牌档案' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/App.test.tsx`

Expected: FAIL because the profile entry point and dialog do not exist.

- [ ] **Step 3: Write minimal implementation**

```tsx
{profile && <button onClick={() => onProfile(profile)}>查看品牌档案</button>}
{profile && <BrandProfileDialog profile={profile} onClose={() => setBrandProfile(null)} />}
```

The dialog must display the official company name, headquarters, manufacturing information, product families, LNG/marine positioning, market coverage, notes, sources, and verified date.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/App.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/BrandProfileDialog.tsx src/components/ValveDetail.tsx src/App.tsx src/styles/app.css src/App.test.tsx
git commit -m "在产品详情展示竞品品牌档案"
```

### Task 3: 全量验证并发布

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: all brand profile data and dialog components.
- Produces: updated data-method wording clarifying brand-profile source rules.

- [ ] **Step 1: Add source-rule copy**

```tsx
<p>品牌档案仅收录厂商官网或官方 PDF 已披露的信息；“官网未披露”不代表不存在。</p>
```

- [ ] **Step 2: Verify all behavior**

Run: `npm run test && npm run build && git diff --check`

Expected: all tests pass, production build succeeds, and diff check returns no output.

- [ ] **Step 3: Commit and publish**

```bash
git add src/App.tsx
git commit -m "说明竞品品牌档案数据口径"
git push origin main
```

- [ ] **Step 4: Verify Pages deployment**

Run: `gh run list --repo Cloudyluk/marine-cryogenic-valve-competitive-library --limit 1 --json status,conclusion,headSha`

Expected: the run for the pushed commit reports `conclusion: success`.
