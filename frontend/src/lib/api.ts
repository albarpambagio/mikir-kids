import { AuthResponse, User } from "@/types/user"

// Support both VITE_API_BASE_URL and VITE_API_URL for compatibility
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Log API URL in development for debugging
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE_URL);
}

// Helper function to handle fetch errors with better messages
async function handleFetchError(response: Response, defaultMessage: string): Promise<never> {
  if (!response.ok) {
    try {
      const error = await response.json();
      throw new Error(error.detail || error.message || defaultMessage);
    } catch (jsonError) {
      // If response is not JSON, check if it's a network error
      if (response.status === 0 || response.type === 'opaque') {
        throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:8000');
      }
      throw new Error(defaultMessage);
    }
  }
  throw new Error('Unexpected response');
}

export async function createUser(): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // Send empty JSON object as expected by FastAPI
    });
    
    if (!response.ok) {
      await handleFetchError(response, 'Gagal membuat User ID. Silakan coba lagi.');
    }
    
    const data = await response.json();
    return { userId: data.user_id, isNew: true };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:8000');
    }
    throw error;
  }
}

export async function validateUser(userId: string): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User ID tidak ditemukan. Coba lagi atau buat baru.');
      }
      await handleFetchError(response, 'Koneksi bermasalah. Silakan coba lagi.');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:8000');
    }
    throw error;
  }
}

export async function updateUser(
  userId: string, 
  gradeLevel: "SMP" | "SMA", 
  classLevel: 7 | 8 | 9 | 10 | 11 | 12
): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grade_level: gradeLevel,
        class_level: classLevel
      })
    });
    
    if (!response.ok) {
      await handleFetchError(response, 'Gagal menyimpan data. Silakan coba lagi.');
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:8000');
    }
    throw error;
  }
}

