import { FormEvent, useState, useEffect } from "react";
import { MongoApi } from "../../services/api";
import { Icon, Logo } from "../ui/Icon";

export function AdminLogin({
  onLoginSuccess,
  onBackToSite,
}: {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}) {
  const [email, setEmail] = useState("admin@chalcedony.com");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mongoOnline, setMongoOnline] = useState<boolean | null>(null);

  useEffect(() => {
    MongoApi.checkHealth().then((online) => setMongoOnline(online));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const result = await MongoApi.login(email, password);

    setLoading(false);

    if (result.success) {
      onLoginSuccess();
    } else {
      setErrorMsg(result.message || "Invalid credentials");
    }
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <Logo onClick={onBackToSite} />
          <h2>Staff & Admin Portal</h2>
          <p>
            Secure MongoDB-authenticated dashboard to manage packages, vehicle fleet, hotel stays,
            gallery uploads, and booking leads.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: 600,
              marginTop: "12px",
              background: mongoOnline ? "#dcfce7" : "#fef3c7",
              color: mongoOnline ? "#15803d" : "#92400e",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: mongoOnline ? "#22c55e" : "#f59e0b",
              }}
            />
            <span>
              {mongoOnline === null
                ? "Checking MongoDB..."
                : mongoOnline
                ? "MongoDB Server: Connected"
                : "MongoDB Server: Offline (Using Local Fallback)"}
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="admin-error-box">
            <Icon name="close" size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <label>
            Admin Email or Username
            <div className="input-with-icon">
              <Icon name="mail" size={18} />
              <input
                type="text"
                required
                placeholder="admin@chalcedony.com or admin"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg(null);
                }}
              />
            </div>
          </label>

          <label style={{ marginTop: "14px" }}>
            Password
            <div className="input-with-icon">
              <Icon name="lock" size={18} />
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
              />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gold w-full btn-lg"
            style={{ marginTop: "20px" }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Admin Dashboard</span>
                <Icon name="arrow" size={18} />
              </>
            )}
          </button>
        </form>

        <div className="admin-login-hint">
          <small>
            Default Credentials: <code>admin@chalcedony.com</code> / <code>chalcedony2026</code>
          </small>
        </div>

        <div className="admin-login-footer">
          <button onClick={onBackToSite} type="button" className="btn-text">
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
