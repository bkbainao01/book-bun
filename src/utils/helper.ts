import Bun from "bun";

export const hashPassword = async (password: string = "1234") => {
  return Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 4,
  });
}