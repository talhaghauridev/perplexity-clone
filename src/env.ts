import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().nonempty(),
    GOOGLE_CLIENT_SECRET: z.string().nonempty(),
    AUTH_SECRET: z.string().nonempty(),
  },

  client: {
    NEXT_PUBLIC_API_URL: z.string().nonempty(),
    NEXT_PUBLIC_SITE_URL: z.string().nonempty().url(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
