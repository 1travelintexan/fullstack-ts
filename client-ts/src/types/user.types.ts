export type UserSignUpType = {
  _id?: string;
  username: string;
  email: string;
  password: string;
};
export type UserLoginType = {
  email: string;
  password: string;
};
export type LoginResponse = {
  authToken: string;
};
export type ProviderProps = {
  authenticateUser: () => void;
  user: UserSignUpType | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  handleLogout: () => void;
};
