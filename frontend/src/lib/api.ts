export interface LeadPayload {
  name: string
  contact: string
  contact_method?: string
  description: string
  honeypot?: string
}

export interface LeadResponse {
  id: number
  message: string
}

const API_BASE = import.meta.env.VITE_API_URL || 'https://ithub-api-lwms.onrender.com'

export const NETWORK_ERROR_MESSAGE = 'Network request failed'

const REQUEST_TIMEOUT_MS = 45000

export async function submitLead(data: LeadPayload): Promise<LeadResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(`${API_BASE}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE)
  } finally {
    clearTimeout(timeout)
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Something went wrong' }))
    throw new Error(error.detail || 'Failed to submit')
  }

  return response.json()
}
