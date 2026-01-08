import crypto from "crypto";
export const generateOrderNumber = () => {
  const timePart = Date.now().toString(36).toUpperCase();
  const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `ORD-${timePart}-${randomPart}`;
};