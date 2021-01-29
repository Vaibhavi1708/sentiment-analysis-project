import axios from "@/plugins/axios.js";
import store from "@/store";
import router from "@/router";

export async function userLogin(formData) {
  const response = axios.post("/api/auth/login", formData);
  return await response;
}

export async function userSignup(formData) {
  const response = axios.post("/api/auth/signup", formData);
  return await response;
}
export async function userLogout() {
  try {
    const response = await axios.get("/api/auth/logout");

    router.push("/login");
    window.location.reload();

    return await response;
  } catch (err) {}
}

export async function isLoggedIn() {
  try {
    return await axios.get("/api/auth/isloggedin");
  } catch (err) {
    return false;
  }
}
