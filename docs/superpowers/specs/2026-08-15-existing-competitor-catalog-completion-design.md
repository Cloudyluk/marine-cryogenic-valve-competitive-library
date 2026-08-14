# Existing Competitor Catalog Completion Design

## Goal

Complete the product-name coverage for existing competitors, beginning with Habonim and OMB, so every publicly listed cryogenic valve family is represented by an independent selection-library record.

## Scope and order

1. Habonim official cryogenic-valve catalog: add all public product families not already present.
2. OMB official product catalog: add all public cryogenic valve product families not already present.
3. Audit every remaining existing brand's official catalog and add any missing public cryogenic valve products in subsequent, independently publishable batches.

## Data rules

- A product record requires a direct manufacturer product page or official manufacturer datasheet in `sources.ts`.
- The record uses the official model/series name exactly enough to be recognisable in ordering and comparison.
- Populate temperature, pressure, size, connection, construction, accessories, standards and class societies only when the official source explicitly states them.
- Use `待厂家确认` for undisclosed values. Do not convert, infer or merge inconsistent values.
- Product series and solution records remain clearly marked as non-orderable where no individual order code is public.
- Every added product must retain brand and model in comparison outputs via the existing `ValveSeries` schema.

## Data model and UI

No schema or UI redesign is needed. Each competitor product is an entry in `src/data/competitors.ts`, with its manufacturer URL represented by `src/data/sources.ts`. Existing filters, detail view and comparison table render the added entries automatically.

## Validation

- Add model-name coverage tests before each catalog batch is added.
- Run the focused test in a failing state, then populate only the entries required to make it pass.
- Run the complete Vitest suite, TypeScript/Vite production build and `git diff --check` before each batch is committed and pushed.

## Publication

Commit each manufacturer batch separately to `main` and push it to GitHub. GitHub Pages publishes the resulting static site automatically.
