import { jwtDecode } from "jwt-decode";

export function getUsuarioActual() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.usuario;
  } catch {
    return null;
  }
}

