export const isBlank = (value)=>{
  return value === undefined || value === null || value.toString().trim() === '';
}
export const isValidEmail = (email)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export const existsInList = (value, list)=>{
  return list.includes(value);
}
export const  validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: "Password is required" };
  }

  if (typeof password !== "string") {
    return { valid: false, message: "Password must be a string" };
  }

  if (password.includes(" ")) {
    return { valid: false, message: "Password must not contain spaces" };
  }

  if (password.length < 5) {
    return { valid: false, message: "Password must be at least 5 characters long" };
  }

  if (password.length > 64) {
    return { valid: false, message: "Password must not exceed 64 characters" };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character" };
  }
  return { valid: true, message: "Password is valid" };
}