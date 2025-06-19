export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

class UserService {
  private readonly apiUrl = "https://jsonplaceholder.typicode.com/users";

  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  // Generate avatar URL based on user ID
  generateAvatarUrl(userId: number): string {
    return `https://i.pravatar.cc/150?img=${userId}`;
  }
}

export default new UserService();
