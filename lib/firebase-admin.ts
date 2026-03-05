import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

/**
 * Handles private key safely for different env formats:
 * - JSON key has real newlines
 * - .env.local often stores as \n
 * - sometimes people paste with surrounding quotes
 */
function normalizePrivateKey(raw: string) {
  let key = raw.trim();

  // Remove wrapping quotes if user put quotes in .env.local
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Convert escaped newlines into real newlines
  key = key.replace(/\\n/g, "\n");

  return key;
}

export function adminDb() {
  const projectId = requireEnv("FIREBASE_PROJECT_ID");
  const clientEmail = requireEnv("FIREBASE_CLIENT_EMAIL");
  const privateKey = normalizePrivateKey(requireEnv("FIREBASE_PRIVATE_KEY"));

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  return getFirestore();
}