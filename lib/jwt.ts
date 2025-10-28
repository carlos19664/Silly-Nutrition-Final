import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface DraftTokenPayload {
  draftId: string
  email?: string
  exp?: number
}

export async function createDraftToken(payload: DraftTokenPayload): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET)

  return token
}

export async function verifyDraftToken(token: string): Promise<DraftTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as DraftTokenPayload
  } catch (error) {
    console.error("[v0] JWT verification failed:", error)
    return null
  }
}
