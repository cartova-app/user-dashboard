## Goal

Ensure organization slugs are generated correctly for Arabic and other non‑Latin names. Prevent empty slugs and provide deterministic, SEO‑friendly fallbacks while preserving uniqueness and server expectations.

## Beginner summary

Currently the client-side slug generator strips characters using a regex that only preserves ASCII word characters. For names in Arabic, Cyrillic, Chinese, etc., the resulting slug becomes empty which causes server errors or unexpected behaviour. We need to update the slug generation to support Unicode letters, optionally transliterate to Latin characters, and provide a safe fallback (e.g., `org-xxxxx`) when a readable slug cannot be derived.

## Exact files to inspect (usage & implementation)

- `src/core/hooks/useGenerateSlug.tsx` — current slug generator implementation (root cause)
- `src/feature/organization/components/CreateOrganizationModal.tsx` — creates organizations using `generateSlug`
- `src/feature/profile/components/CompeleteProfileDialog.tsx` — onboarding uses `generateSlug` during store creation
- `src/core/config/auth-client.ts` — auth client / organization create endpoint (server behavior)
- Any server contracts or docs (backend) for slug format / uniqueness (if available)

## Why this task matters

- Empty or invalid slugs break organization creation flow for non‑Latin users.
- Slugs are part of public URLs and should be readable/consistent when possible.
- Fix improves internationalization, accessibility and user experience for non‑ASCII names.

## Out of scope

- Backend slug uniqueness enforcement beyond calling existing API.
- Global migration of old invalid slugs already stored in backend (separate ops/ticket).

## Acceptance criteria

- `generateSlug(name)` returns a non‑empty string for typical non‑Latin names (Arabic, Cyrillic, Devanagari, etc.)
- Resulting slug contains readable characters when transliteration is possible, otherwise a deterministic fallback is used (e.g., `org-<6chars>`)
- `CreateOrganizationModal` and onboarding flow (`CompeleteProfileDialog`) do not send empty slugs to the API
- UX: If a generated slug differs from a simple ASCII transliteration, the UI shows a preview or indicates fallback was used
- Unit tests cover ASCII, accented Latin, Arabic, and empty-input cases

Technical details & implementation hints

## Root cause

- `useGenerateSlug.tsx` currently uses `return name.toLowerCase().trim().replace(/[^^\w\s-]/g, '')...`.
- `\w` is ASCII-only; non-Latin letters are removed by the regex, producing an empty string.

## Recommended fix options (pick one or combine):

Option A — Unicode-safe regex (minimal change)

- Use Unicode property escapes to keep letters & numbers from any script, then replace spaces with dashes.
- Example implementation:

  ```ts
  const generateSlug = (name: string): string => {
    const slug = name
      .toLowerCase()
      .trim()
      .normalize("NFD") // split diacritics
      .replace(/\p{M}/gu, "") // remove diacritic marks
      .replace(/[^\p{L}\p{N}\s-]+/gu, "") // keep letters & numbers (all scripts), spaces and hyphens
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return slug || `org-${Date.now().toString(36).slice(-6)}`;
  };
  ```

- Notes: requires modern JS runtime (Unicode property escapes supported in Node >= 10-ish / browsers modern). Works well when leaving non-Latin characters in the slug is acceptable (URLs will contain Unicode codepoints; that's valid in browsers as percent-encoded sequences).

Option B — Transliterate to Latin (preferred for pretty URLs)

- Add a small dependency to transliterate/slugify, e.g., `slugify` (npm) or `transliteration` or `@sindresorhus/transliterate`.
- Example using `slugify` (supports locales and removes/replace characters):

  ```ts
  import slugify from "slugify";

  const generateSlug = (name: string) => {
    const slug = slugify(name, {
      lower: true,
      locale: "en",
      remove: /[*+~.()"!'?:@]/g,
    });
    return slug || `org-${nanoid(6)}`; // use nanoid if you add it
  };
  ```

- Pros: prettier slugs for non-Latin names (transliterated), consistent ASCII-only slugs, good SEO.
- Cons: dependency added; transliteration quality depends on chosen library.

Option C — Hybrid approach

- Try transliteration first (library). If output is empty or very short, fall back to Unicode-safe slug from Option A, and finally to a deterministic `org-xxxxx` fallback.

UI & validation changes

- In `CreateOrganizationModal.tsx` and the onboarding flow (`CompeleteProfileDialog.tsx`):
  - Show a small `slug preview` under the `name` input so users can see the generated slug before creation.
  - Validate the slug on the client: if it is empty, prevent submission and show an inline error suggesting the fallback will be used; optionally allow user to edit the slug field.

- The `CreateOrganizationModal` currently calls `generateSlug` and sends it straight to the API; change to compute slug, show preview, and only generate fallback server-side if needed.

## Server-side considerations

- Check backend contract: what characters are allowed for `slug` and whether server enforces uniqueness or returns an error for empty/duplicate slugs.
- If backend rejects Unicode slugs, prefer transliteration (Option B) to produce ASCII-only slugs.
- If backend can accept Unicode, Option A is acceptable.
- If server enforces uniqueness, consider a client-side loop to append a short suffix when API returns a duplicate error (e.g., `-1`, `-a1`), or let server handle uniqueness and return the final slug.

## Testing & QA

- Unit tests for `useGenerateSlug` covering:
  - ASCII names: `My Store` -> `my-store`
  - Accented Latin: `Café du Monde` -> `cafe-du-monde` (after diacritic removal)
  - Arabic: `متجر` -> non-empty slug (transliterated or unicode-preserved)
  - Chinese: `测试` -> transliteration or fallback
  - Empty string -> `org-xxxxx`

- Integration tests / manual QA:
  - Create organization in the UI with Arabic name via `CreateOrganizationModal` and via onboarding flow; confirm no error and expected slug behavior.
  - Verify server handles returned slug format.

## Mini tasks

1. Update `useGenerateSlug.tsx` to use the chosen strategy (Unicode regex, transliteration, or hybrid)

- Priority: P0
- Work: Implement the new slug generation logic and unit tests
- AC: `generateSlug` returns non-empty values for the test cases above

2. Surface slug preview & validation in UIs

- Priority: P1
- Work: Add a small preview text under the organization `name` input in `CreateOrganizationModal.tsx` and in onboarding `OrganizationForm` (if applicable). Disable the submit if slug would be empty and show a clear message.
- AC: Users can see the slug and correct it before creation

3. Backend compatibility check

- Priority: P1
- Work: Confirm slug format accepted by backend. If backend rejects Unicode, prefer transliteration. Add logic to retry with unique suffix when API returns a conflict.
- AC: No server errors for duplicate/invalid slugs during creation flows

4. Add tests & QA

- Priority: P1
- Work: Add unit tests for the `useGenerateSlug` hook and test the CreateOrganization flow manually on staging/dev
- AC: Tests pass; manual QA confirms fix

## Estimated effort

- 1–3 hours to implement the slug function change and unit tests (Option A)
- 2–4 hours if adding a transliteration dependency and UI preview + integration checks

## Notes / Risks

- Adding a dependency increases bundle size slightly; transliteration libraries vary in quality. Use a minimal, focused library if choosing Option B.
- Changing slug format may affect existing URLs/SEO; this task only affects new organizations. Consider a migration plan for existing invalid slugs if needed.
