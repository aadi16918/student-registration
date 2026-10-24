
import { useState } from "react";
import "./App.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setSuccess("");
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your full name.";
    } else if (form.name.trim().length < 2) {
      nextErrors.name = "Name must contain at least 2 characters.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.password) {
      nextErrors.password = "Please create a password.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Your passwords do not match.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setSuccess("");

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = Object.keys(nextErrors)[0];
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    setSuccess(
      `You're all set, ${form.name.trim()}! Your form passed validation.`
    );
  }

  function handleReset() {
    setForm(initialForm);
    setErrors({});
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function renderError(field) {
    return errors[field] ? (
      <p className="field-error" id={`${field}-error`} role="alert">
        <span aria-hidden="true">!</span> {errors[field]}
      </p>
    ) : null;
  }

  return (
    <main className="page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="registration-card" aria-labelledby="page-title">
        <header className="card-header">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M2.5 9.2 12 4l9.5 5.2L12 14.4 2.5 9.2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 11.5v4.2c3.5 2.7 7.5 2.7 11 0v-4.2M21.5 9.5v6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h1 id="page-title">Student Registration</h1>
          <p className="subtitle">
            Create your account and get ready to learn.
          </p>
        </header>

        {success && (
          <div className="success-message" role="status" aria-live="polite">
            <span className="success-icon" aria-hidden="true">✓</span>
            <div>
              <strong>Registration form completed!</strong>
              <p>{success}</p>
              <small>
                Demo only — your information has not been saved to a server.
              </small>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Aditi Sharma"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {renderError("name")}
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {renderError("email")}
          </div>

          <div className="field">
            <label htmlFor="phone">Mobile number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(event) =>
                handleChange({
                  ...event,
                  target: {
                    ...event.target,
                    name: "phone",
                    value: event.target.value.replace(/\D/g, "").slice(0, 10),
                  },
                })
              }
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {renderError("phone")}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : "password-hint"
                }
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {renderError("password")}
            {!errors.password && (
              <p className="field-hint" id="password-hint">
                Use at least 8 characters.
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <div className="password-wrap">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={form.confirmPassword}
                onChange={handleChange}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? "confirmPassword-error"
                    : undefined
                }
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {renderError("confirmPassword")}
          </div>

          <button className="submit-button" type="submit">
            <span>Create account</span>
            <span className="button-arrow" aria-hidden="true">→</span>
          </button>

          <button
            className="reset-button"
            type="button"
            onClick={handleReset}
          >
            Reset form
          </button>
        </form>

        <footer className="card-footer">
          <span className="footer-dot" aria-hidden="true" />
          ReactJS <span aria-hidden="true">·</span> Client-side validation
        </footer>
      </section>
    </main>
  );
}

export default App;
