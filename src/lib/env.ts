// Validates required environment variables at startup
// Server-side only — never import in client components

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}\n` +
      `Add it to your .env.local file.`
    );
  }
  return value;
}

export const env = {
  GITHUB_TOKEN: requireEnv('GITHUB_TOKEN'),
  GITHUB_OWNER: requireEnv('GITHUB_OWNER'),
  GITHUB_REPO: requireEnv('GITHUB_REPO'),
  JUDGE0_API_KEY: requireEnv('JUDGE0_API_KEY'),
  JUDGE0_API_URL: requireEnv('JUDGE0_API_URL'),
} as const;
