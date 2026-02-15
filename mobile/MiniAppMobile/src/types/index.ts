export interface User {
  id: number;
  fullName: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  fullName: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  register: (userData: RegisterData) => Promise<{success: boolean; error?: string}>;
  logout: () => void;
  isAuthenticated: () => boolean;
  loading: boolean;
}
