import { BeamInput, BeamResult } from './types';

function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
}

export async function calculateBeamCapacity(input: BeamInput): Promise<BeamResult> {
  const response = await fetch(`${getApiBaseUrl()}/api/Beam`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Request failed: ${response.status}`);
  }
  return (await response.json()) as BeamResult;
}



