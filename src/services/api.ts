const API_BASE = (import.meta as any).env?.VITE_API_URL || "http://localhost:5000/api";

export interface MongoAdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface MongoImageUploadResult {
  success: boolean;
  id?: string;
  url: string;
  filename?: string;
  size?: number;
}

export const MongoApi = {
  // Check if backend MongoDB server is alive
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2500) });
      const data = await res.json();
      return data.status === "ok";
    } catch {
      return false;
    }
  },

  // Authenticate Admin with MongoDB
  async login(emailOrUsername: string, password: string): Promise<{
    success: boolean;
    token?: string;
    admin?: MongoAdminUser;
    message?: string;
  }> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrUsername, password }),
        signal: AbortSignal.timeout(6000),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("chalcedony_jwt_token", data.token);
        localStorage.setItem("chalcedony_admin_user", JSON.stringify(data.admin));
        localStorage.setItem("chalcedony_admin_auth", "true");
        window.dispatchEvent(new Event("chalcedony_data_change"));
        return { success: true, token: data.token, admin: data.admin };
      }

      return {
        success: false,
        message: data.message || "Invalid credentials",
      };
    } catch (err: any) {
      // If server is not yet running, fall back gracefully to local credentials
      console.warn("MongoDB backend server not reachable, checking local authentication fallback.");
      const isDefault =
        (emailOrUsername === "admin" || emailOrUsername === "admin@chalcedony.com") &&
        password === "chalcedony2026";

      if (isDefault) {
        localStorage.setItem("chalcedony_admin_auth", "true");
        window.dispatchEvent(new Event("chalcedony_data_change"));
        return {
          success: true,
          admin: { id: "local-admin", email: "admin@chalcedony.com", name: "Administrator (Local Mode)", role: "superadmin" },
        };
      }

      return {
        success: false,
        message: "Could not connect to MongoDB server and credentials do not match default fallback.",
      };
    }
  },

  // Upload image to MongoDB binary storage
  async uploadImage(
    file: File,
    category: string = "general",
    caption: string = ""
  ): Promise<MongoImageUploadResult> {
    const token = localStorage.getItem("chalcedony_jwt_token");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);
    formData.append("caption", caption);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
        signal: AbortSignal.timeout(15000),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        return {
          success: true,
          id: data.id,
          url: data.url,
          filename: data.filename,
          size: data.size,
        };
      }

      throw new Error(data.message || "Upload failed");
    } catch (err: any) {
      console.warn("MongoDB upload server unavailable. Converting to Base64 image URL as local fallback.", err);
      // Fallback: convert file to Base64 Data URL so the user is never blocked
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            success: true,
            url: reader.result as string,
            filename: file.name,
            size: file.size,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  },

  // Get current logged in admin
  getStoredAdmin(): MongoAdminUser | null {
    try {
      const data = localStorage.getItem("chalcedony_admin_user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  // Logout
  logout() {
    localStorage.removeItem("chalcedony_jwt_token");
    localStorage.removeItem("chalcedony_admin_user");
    localStorage.removeItem("chalcedony_admin_auth");
    window.dispatchEvent(new Event("chalcedony_data_change"));
  },
};
