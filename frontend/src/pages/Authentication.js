import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  //getting current search parameter----
  const searchParams = new URL(request.url).searchParams;
  //setting a constant mode to current mode or login mode(as default)
  const mode = searchParams.get("mode") || "login";

  //if user types wrong search parameter in url
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }
  const data = await request.formData();
  const authData = { email: data.get("email"), password: data.get("password") };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }
  //simply redirecting once data is posted
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  //setting the expiration value to 1 hour post storing the token
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
  
  return redirect("/");
}
