const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

const fields = {
  fullName: {
    el: document.getElementById("fullName"),
    validate: (value) => value.trim().length > 0 || "Full name is required."
  },
  email: {
    el: document.getElementById("email"),
    validate: (value) => {
      if (!value.trim()) return "Email is required.";
      // Simple email pattern (good enough for client-side validation)
      const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      return emailOK || "Please enter a valid email address.";
    }
  },
  subject: {
    el: document.getElementById("subject"),
    validate: (value) =>
      value.trim().length >= 3 || "Subject must be at least 3 characters."
  },
  message: {
    el: document.getElementById("message"),
    validate: (value) =>
      value.trim().length >= 10 || "Message must be at least 10 characters."
  }
};

function showError(inputEl, message) {
  const wrapper = inputEl.closest(".field");
  const errorEl = wrapper.querySelector(".error");
  errorEl.textContent = typeof message === "string" ? message : "";
  inputEl.classList.toggle("error-border", Boolean(message));
}

function clearStatus() {
  statusEl.textContent = "";
}

function validateField(key) {
  const { el, validate } = fields[key];
  const result = validate(el.value);
  const message = result === true ? "" : result;
  showError(el, message);
  return result === true;
}

// Validate on input blur for instant feedback
Object.keys(fields).forEach((key) => {
  fields[key].el.addEventListener("blur", () => {
    validateField(key);
    clearStatus();
  });
  fields[key].el.addEventListener("input", () => {
    // live clear error when fixed
    if (fields[key].el.classList.contains("error-border")) {
      validateField(key);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearStatus();

  // Validate all
  const keys = Object.keys(fields);
  const results = keys.map((k) => validateField(k));
  const allValid = results.every(Boolean);

  if (!allValid) {
    // Focus first invalid field
    const firstInvalidKey = keys[results.indexOf(false)];
    fields[firstInvalidKey].el.focus();
    return;
  }

  // Simulate successful submission (since there is no backend here)
  statusEl.textContent = "Thanks! Your message has been sent successfully.";
  form.reset();

  // Clear visual errors after reset
  keys.forEach((k) => showError(fields[k].el, ""));
});
