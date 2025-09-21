import { STORAGE_KEYS } from '@/constants/storage-keys';
import { User } from '@/types/users';
import { cookies } from 'next/headers';

function parseJson<T>(value: string | undefined): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const user = parseJson<User>(cookieStore.get(STORAGE_KEYS.AUTH.USER_DATA)?.value);
  const accessToken = cookieStore.get(STORAGE_KEYS.AUTH.ACCESS_TOKEN)?.value ?? null;
  return { user, accessToken };
}
