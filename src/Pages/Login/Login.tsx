import axios from "axios";
import { useForm } from "react-hook-form";
export default function Login() {
  const { register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const handleLogin = async (values: { email: string; password: string }) => {
    const response = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      values,
    );
    return response.data;
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
