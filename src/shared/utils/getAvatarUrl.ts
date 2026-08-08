export function getAvatarUrl(value?: string | null): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return undefined;
  }

  const baseUrl = supabaseUrl.replace(/\/$/, "");
  const normalized = trimmed.replace(/^\/+/, "");

  if (normalized.startsWith("storage/v1/object/public/")) {
    return `${baseUrl}/${normalized}`;
  }

  const cleanPath = normalized.replace(/^avatars\//, "").replace(/^public\/avatars\//, "");
  return `${baseUrl}/storage/v1/object/public/avatars/${cleanPath}`;
}
