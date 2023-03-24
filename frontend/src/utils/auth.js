import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  //changing string to date format
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  //checking the difference between current time and stored expiration time
  const duration = expirationDate.getTime() - now.getTime();
  console.log("duration",duration);
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  //if there is no token return null
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  //return 'EXPIRED' if the duration is over
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
}
