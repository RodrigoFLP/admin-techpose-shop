export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  id?: number | null;
  firstName: string;
  email: string;
  role: string;
  isEmailConfirmed?: boolean | null;
}
