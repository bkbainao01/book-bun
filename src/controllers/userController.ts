import { UserService } from "@/services/userService";

export class UserController {
  private userService = new UserService();

  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (error) {
        console.error("❌ getAll error:", error);
        return { status: "error" };
    };
    }

  getById = ({ params }: any) => {
    const user = this.userService.getById(Number(params.id));
    return user ?? { error: "User not found" };
  };

  createUser = ({ body }: any) => {
    const user = {
        firstname: body.name,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
    }
    return this.userService.create(user);
  };
  updateUser = ({ params, body }: any) => {
    const user = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
    }
    return this.userService.update(Number(params.id), user);
  }
  deleteUser = ({ params }: any) => {
    return this.userService.delete(Number(params.id));
  };
  login = async ({ jwt, body, set }: any) => {
    try {
        const user = {
            email: body.email,
            password: body.password,
        }
        return this.userService.authenticate(jwt,user, set);
    } catch (error:any) {
        return { status: "error", message: error.message };
    }
    
  }
    // logout = async ({ body }: any) => {
    //     const user = {
    //     email: body.email,
    //     password: body.password,
    //     }
    //     return this.userService.logout(user);
    // }
}
