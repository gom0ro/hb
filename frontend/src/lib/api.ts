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

export async function submitLead(data: LeadPayload): Promise<LeadResponse> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Something went wrong' }))
    throw new Error(error.detail || 'Failed to submit')
  }

  return response.json()
}
