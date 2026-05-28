import { nanoid } from "nanoid";
import authClient from "../config/auth-client";

function buildSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function slugExists(slug: string) {
  const { data } = await authClient.organization.checkSlug({
    slug,
  });

  return data?.status === true;
}

export async function generateSlug(name: string) {
  const baseSlug = buildSlug(name) || "org";

  if (!(await slugExists(baseSlug))) {
    return {
      slug: baseSlug,
      usedFallback: false,
    };
  }

  let slug: string;

  do {
    slug = `${baseSlug}-${nanoid(4).toLowerCase()}`;
  } while (await slugExists(slug));

  return {
    slug,
    usedFallback: true,
  };
}
