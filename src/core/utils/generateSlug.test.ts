import { describe, expect, it, vi, beforeEach } from "vitest";
import { generateSlug } from "./generateSlug";
import authClient from "../config/auth-client";

vi.mock("../config/auth-client", () => ({
  default: {
    organization: {
      checkSlug: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("generateSlug", () => {
  it("converts ASCII names to kebab-case", async () => {
    vi.mocked(authClient.organization.checkSlug).mockResolvedValue({
      data: { status: false },
    });

    const result = await generateSlug("My Store");

    expect(result.slug).toBe("my-store");
    expect(result.usedFallback).toBe(false);
  });

  it("removes diacritics from accented Latin", async () => {
    vi.mocked(authClient.organization.checkSlug).mockResolvedValue({
      data: { status: false },
    });

    const result = await generateSlug("Café du Monde");

    expect(result.slug).toBe("cafe-du-monde");
  });

  it("returns non-empty slug for Arabic names", async () => {
    vi.mocked(authClient.organization.checkSlug).mockResolvedValue({
      data: { status: false },
    });

    const result = await generateSlug("متجر");

    expect(result.slug.length).toBeGreaterThan(0);
    expect(result.slug).toBe("متجر");
  });

  it("returns non-empty slug for Chinese names", async () => {
    vi.mocked(authClient.organization.checkSlug).mockResolvedValue({
      data: { status: false },
    });

    const result = await generateSlug("测试");

    expect(result.slug.length).toBeGreaterThan(0);
    expect(result.slug).toBe("测试");
  });

  it("uses org- fallback for empty input", async () => {
    vi.mocked(authClient.organization.checkSlug).mockResolvedValue({
      data: { status: false },
    });

    const result = await generateSlug("");

    expect(result.slug).toMatch(/^org$/);
  });

  it("adds suffix when slug already exists", async () => {
    vi.mocked(authClient.organization.checkSlug)
      .mockResolvedValueOnce({
        data: { status: true },
      })
      .mockResolvedValueOnce({
        data: { status: false },
      });

    const result = await generateSlug("My Store");

    expect(result.slug).toMatch(/^my-store-[a-z0-9_-]{4}$/);
    expect(result.usedFallback).toBe(true);
  });

  it("uses org fallback for punctuation-only names", async () => {
    vi.mocked(authClient.organization.checkSlug).mockResolvedValue({
      data: { status: false },
    });

    const result = await generateSlug("!!!");

    expect(result.slug).toBe("org");
  });
});
