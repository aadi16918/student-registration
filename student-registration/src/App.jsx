import { useState } from "react";
import "./App.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  course: "",
  gender: "",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    setErrors((previous) => ({ ...previous, [name]: "" }));
    setSuccess("");
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(form.name.trim())) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.course) {
      newErrors.course = "Please select a course.";
    }

    if (!form.gender) {
      newErrors.gender = "Please select your gender.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccess("");

    if (Object.keys(validationErrors).length > 0) return;

    const existingStudents = JSON.parse(
      localStorage.getItem("registeredStudents") || "[]"
    );

    const emailExists = existingStudents.some(
      (student) =>
        student.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (emailExists) {
      setErrors({
        email: "This email is already registered.",
      });
      return;
    }

    const newStudent = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      id: Date.now(),
      registeredAt: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "registeredStudents",
      JSON.stringify([...existingStudents, newStudent])
    );

    setForm(initialForm);
    setErrors({});
    setSuccess("Registration completed successfully!");
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSuccess("");
  };

  return (
    <main className="page-wrapper">
      <section className="registration-card">
        <div className="form-header">
          <div className="brand-mark">SR</div>
          <p className="eyebrow">STUDENT PORTAL</p>
          <h1>Student Registration</h1>
          <p className="subtitle">
            Fill in your details to begin your academic journey.
          </p>
        </div>

        {success && (
          <div className="success-message" role="status">
            <span className="success-icon">✓</span>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Mobile Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="course">Select Course</label>
            <select
              id="course"
              name="course"
              value={form.course}
              onChange={handleChange}
              aria-invalid={Boolean(errors.course)}
            >
              <option value="">Choose your course</option>
              <option value="B.Tech Software Engineering">
                B.Tech Software Engineering
              </option>
              <option value="B.Tech Computer Engineering">
                B.Tech Computer Engineering
              </option>
              <option value="B.Tech Information Technology">
                B.Tech Information Technology
              </option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BBA">BBA</option>
            </select>
            {errors.course && (
              <span className="error-message">{errors.course}</span>
            )}
          </div>

          <fieldset className="form-group gender-group">
            <legend>Gender</legend>
            <div className="gender-options">
              {["Female", "Male", "Other"].map((gender) => (
                <label className="gender-option" key={gender}>
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={form.gender === gender}
                    onChange={handleChange}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </fieldset>

          <div className="button-group">
            <button className="submit-button" type="submit">
              Register Now <span aria-hidden="true">→</span>
            </button>
            <button
              className="reset-button"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        <p className="form-footer">
          Please ensure all information is correct before submitting.
        </p>
      </section>
    </main>
  );
}

export default App;