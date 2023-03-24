import { useState } from "react";
import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  //first constant gets us the search params that were passed to the page and second one sets the said params if needed

  //  const [searchParams, setSearchParams] = useSearchParams();

  //-----------using search parameters to change the mode of authentication------------------
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  //-----------using states to change the mode of authentication------------------
  // const [isLogin, setIsLogin] = useState(true);
  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          {/* <button onClick={switchAuthHandler} type="button">
            {isLogin ? "Create new user" : "Login"}
          </button> */}
          <button disabled={isSubmitting}>{isSubmitting?"Submitting":"Save"}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
