export interface User {
  id: string
  username: string
  role: "admin"
}

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "aimim2024", // In production, use hashed passwords
}

export const auth = {
  login: async (username: string, password: string): Promise<User | null> => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      return {
        id: "1",
        username: "admin",
        role: "admin",
      }
    }
    return null
  },

  verifyToken: (token: string): User | null => {
    try {
      // Simple token verification - use JWT in production
      const decoded = JSON.parse(atob(token))
      if (decoded.username === "admin") {
        return decoded
      }
    } catch (error) {
      return null
    }
    return null
  },

  generateToken: (user: User): string => {
    // Simple token generation - use JWT in production
    return btoa(JSON.stringify(user))
  },
}
