import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { BeamInput, BeamResult } from '../types';

function getApiBaseUrl(): string {
  const extra = (Constants.expoConfig as any)?.extra || (Constants.manifest as any)?.extra || {};
  let configured = extra.apiBaseUrl || 'http://localhost:5233';
  
  // Eğer http:// veya https:// yoksa ekle
  if (configured && !configured.startsWith('http://') && !configured.startsWith('https://')) {
    configured = `http://${configured}`;
  }
  
  console.log('🌐 Platform:', Platform.OS);
  console.log('⚙️ Expo Config extra:', extra);
  console.log('🔗 Configured API URL:', configured);
  
  // Android emulator için özel dönüşüm
  let finalUrl = configured;
  if (Platform.OS === 'android' && configured.includes('localhost')) {
    finalUrl = configured.replace('localhost', '10.0.2.2');
    console.log('🤖 Android detected, converting to:', finalUrl);
  }
  
  console.log('✅ Final API URL:', finalUrl);
  return finalUrl;
}

export async function calculateBeamCapacity(input: BeamInput): Promise<BeamResult> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/Beam`;
  
  console.log(' API Request:', {
    url,
    method: 'POST',
    payload: input
  });
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    
    console.log('📡 Response status:', response.status, response.statusText);

    if (!response.ok) {
      let errorMsg = `Request failed: ${response.status}`;
      try {
        const text = await response.text();
        if (text) {
          const parsed = JSON.parse(text);
          errorMsg = parsed.error || parsed.message || text;
        }
      } catch {
        // JSON parse başarısız olursa text'i kullan
      }
      throw new Error(errorMsg);
    }

    const result = (await response.json()) as BeamResult;
    console.log('✅ API Success:', result);
    return result;
  } catch (error: any) {
    console.error('❌ API Error:', error);
    if (error.message?.includes('Network request failed') || error.message?.includes('Failed to connect')) {
      throw new Error(`Cannot connect to API at ${baseUrl}. Make sure the server is running and accessible.`);
    }
    throw error;
  }
}


