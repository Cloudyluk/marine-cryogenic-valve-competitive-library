# Existing Competitor Catalog Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add every public cryogenic valve product family found in the official catalogs of brands already represented in the library, without inventing technical values.

**Architecture:** Product data remains in the existing `ValveSeries[]` static catalogue. Every added row receives a direct manufacturer source entry; the existing filters, details panel and comparison table consume it unchanged. Each manufacturer catalog is a self-contained release batch.

**Tech Stack:** TypeScript, React, Vitest, Vite, GitHub Pages.

## Global Constraints

- Use only manufacturer websites or manufacturer-issued datasheets as evidence.
- Each product has its own `ValveSeries` record with `brand` and `model`.
- Write `待厂家确认` for a field that the official source does not state; do not infer, convert or reconcile conflicting values.
- Keep model/series status explicit through `modelKind` and notes.
- Before every batch: add a focused failing coverage test, then make it pass; run all tests, `npm run build`, and `git diff --check`.
- Commit and push each manufacturer batch separately to `main`.

---

### Task 1: Habonim official cryogenic catalog

**Files:**
- Modify: `src/data/sources.ts`
- Modify: `src/data/competitors.ts`
- Modify: `src/lib/selection.test.ts`

**Consumes:** `ValveSeries` and `SourceLink` from `src/data/types.ts`; official category `https://habonim.com/valves/cryogenic-valves/`.

**Produces:** One source-backed record each for C26, C28, C31, C32, C47, C61, C62, C73, C77, C78, C81, C83, C91, C92, C93, C94, C95 and C96, in addition to existing C47-BD/C52/C74/C82.

- [ ] **Step 1: Write the failing coverage test**

```ts
const habonimModels = valveSeries
  .filter((item) => item.brand === 'Habonim')
  .map((item) => item.model)

expect(habonimModels).toEqual(expect.arrayContaining([
  'C26 Cryogenic Floating Ball Valve',
  'C28 Cryogenic Floating Ball Valve',
  'C31 Cryogenic Floating Ball Valve',
  'C32 Cryogenic Floating Ball Valve',
  'C47 Cryogenic Floating Ball Valve',
  'C61 Cryogenic Floating Ball Valve',
  'C62 Cryogenic Multiport Ball Valve',
  'C73 Cryogenic Floating Ball Valve',
  'C77 Cryogenic Floating Ball Valve',
  'C78 Cryogenic Floating Ball Valve',
  'C81 Cryogenic Trunnion Mounted Ball Valve',
  'C83 Cryogenic Trunnion Mounted Ball Valve',
  'C91 Cryogenic Trunnion Mounted Ball Valve',
  'C92 Cryogenic Trunnion Mounted Ball Valve',
  'C93 Cryogenic Trunnion Mounted Ball Valve',
  'C94 Cryogenic Trunnion Mounted Ball Valve',
  'C95 Cryogenic Trunnion Mounted Ball Valve',
  'C96 Cryogenic Trunnion Mounted Ball Valve',
]))
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm run test -- --run src/lib/selection.test.ts`

Expected: FAIL because the named official catalog products are absent.

- [ ] **Step 3: Crawl each official Habonim product page and add only disclosed values**

Add a `sources.habonimCxx` direct URL for every model. Add one record per exact page title, use `待厂家确认` where the page omits an item, and preserve any displayed inch/DN conflict in `size` and `notes`.

- [ ] **Step 4: Run focused and complete validation**

Run: `npm run test -- --run && npm run build && git diff --check`

Expected: all tests and production build pass with no whitespace errors.

- [ ] **Step 5: Commit and publish**

```bash
git add src/data/sources.ts src/data/competitors.ts src/lib/selection.test.ts
git commit -m "补全 Habonim 低温阀产品目录"
git -c http.version=HTTP/1.1 push origin main
```

### Task 2: OMB official cryogenic catalog

**Files:**
- Modify: `src/data/sources.ts`
- Modify: `src/data/competitors.ts`
- Modify: `src/lib/selection.test.ts`

**Consumes:** `ValveSeries` and `SourceLink`; official catalog `https://www.ombvalves.com/products/`.

**Produces:** One source-backed record each for C130, C130M, C330, C230, CR-TOP, DuEX C-S, DuEX C-T, CR-BSE, CR-BTE, CR-FC, FT, CR-FT, CR-CM, CR-TA and CR-DPC, alongside existing OMB records.

- [ ] **Step 1: Write a failing OMB product-name coverage test**

```ts
const ombModels = valveSeries.filter((item) => item.brand === 'OMB Valves').map((item) => item.model)
expect(ombModels).toEqual(expect.arrayContaining([
  'OMB C130 Vogt Globe Cryogenic Service',
  'OMB C130M Vogt Actuated Globe Cryogenic Service',
  'OMB C330 Vogt Globe Cryogenic Service Fully Extractable',
  'OMB C230 Vogt Control Globe Cryogenic Service',
  'OMB CR-TOP Triple Offset Butterfly Valve, Top Entry, Cryogenic',
  'OMB CR-DPC Check Valve, Dual Plate, Cryogenic Service',
]))
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm run test -- --run src/lib/selection.test.ts`

Expected: FAIL because the official OMB models are absent.

- [ ] **Step 3: Crawl each official OMB product page and add source-bound records**

For every listed model, add its direct official source, a distinct record, and only page-supported temperature, pressure, size, connection, construction, accessories, standards and certifications. Preserve conflicting official fields verbatim with a note.

- [ ] **Step 4: Run complete validation**

Run: `npm run test -- --run && npm run build && git diff --check`

Expected: all tests and production build pass with no whitespace errors.

- [ ] **Step 5: Commit and publish**

```bash
git add src/data/sources.ts src/data/competitors.ts src/lib/selection.test.ts
git commit -m "补全 OMB 低温阀产品目录"
git -c http.version=HTTP/1.1 push origin main
```

### Task 3: Inventory remaining represented brands

**Files:**
- Create: `docs/superpowers/audits/2026-08-15-remaining-brand-catalog-inventory.md`

**Consumes:** Existing brand profiles and direct manufacturer catalog sources referenced in `src/data/sources.ts`.

**Produces:** An official-link inventory for Neway, Furui, Parker Bestobell, KLINGER Westad, KITZ, Emerson Fisher, Baker Hughes Masoneilan, Flowserve, GWC Italia, Meca-Inox, RAYS, S&S Valve, NAKAKITA, HEROSE, Mt.H, Qublock, Tsunny, Bray and ADAMS, categorised as named-model catalog, generic-series-only, or no accessible official model index.

- [ ] **Step 1: Inspect one official catalog per remaining represented brand**

Record the official catalog URL, every publicly listed cryogenic product name, and whether each name is already present in `valveSeries`.

- [ ] **Step 2: Save the audit inventory**

For every brand, state one of: `complete against accessible official catalog`, `has missing named products`, `officially published as generic series only`, or `no accessible official model index`. Include the direct official URL used for the judgement.

- [ ] **Step 3: Plan independent follow-up batches only for named gaps**

Create a separate plan after each inventory finding that includes exact discovered product names and a concrete failing coverage test. Do not create records for a brand that publishes only a generic series.

### Task 4: Final completeness boundary report

**Files:**
- Modify: `src/lib/selection.test.ts`

**Consumes:** The completed product catalog.

**Produces:** A regression test ensuring every record has a brand, model and official source; a final written audit that distinguishes catalog-complete brands from brands whose official pages publish only generic series or no model list.

- [ ] **Step 1: Write a focused data-integrity test**

```ts
expect(valveSeries.every((item) => (
  item.brand.trim().length > 0 &&
  item.model.trim().length > 0 &&
  item.sources.every((source) => source.url.startsWith('https://'))
))).toBe(true)
```

- [ ] **Step 2: Run complete validation and publish the final change**

Run: `npm run test -- --run && npm run build && git diff --check`

Expected: all checks pass. Commit as `完成现有竞品低温阀目录核验` and push to `main`.
