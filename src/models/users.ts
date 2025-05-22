import { prisma } from '@/config/db';
import Bun, { password } from 'bun';
export class User {

  authenticate(user: { email: string; password: string }) {
    try {

      const foundUser = prisma.user.findUnique({ where: { user.email } });

      if (!foundUser) {
        throw new Error("User not found");
      }

      console.log("✅ Login success");
      return {
        loggedIn: true,
        user: foundUser,
      };
    } catch (error) {
      console.error("❌ Login fail:", error);
      return {
        loggedIn: false,
        error,
      };
    }
  }

  getUsers() {
    try {
      const query = this.db.query("SELECT * FROM users;");
      console.log("✅ getUsers success");
      return query.all();
    } catch (error) {
      console.error("❌ getUsers error:", error);
      return { status: "error" };
    }
  }

  getUser(id: number) {
    try {
      const query = this.db.query("SELECT * FROM users WHERE id=$id;");
      console.log("✅ getUser success");
      return query.get({ $id: id });
    } catch (error) {
      console.error("❌ getUser error:", error);
      return { status: "error" };
    }
  }

  async getUserByEmail(user: any) {
    try {
      const query = this.db.query("SELECT * FROM users WHERE email=$email;");
      console.log("✅ getUserByEmail success");
      const userData:any = query.get({ $email: user.email });
      if(!userData) {
        throw new Error('User not found');
      }
      const isMatch : any = await Bun.password.verify(user.password, userData.password);
      if(!isMatch) {
        throw new Error('Email or Password is invalid');
      }
      return {
        data: {
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          isLoggedIn: true
        },
        status: 'ok'
      }
    } catch (error:any) {
      console.error("❌ getUserByEmail error:");
      return {
        data: {
          isLoggedIn: false
        },
        status: "error",
        error: error.message
      };
    }
  }

  createUser(user: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) {
    try {
      const query = this.db.query(`
        INSERT INTO users (email, password, first_name, last_name)
        VALUES ($email, $password, $first_name, $last_name);
      `);

      query.run({
        $email: user.email,
        $password: user.password,
        $first_name: user.first_name,
        $last_name: user.last_name,
      });

      console.log("✅ createUser success");
      return {
        data: user,
        status: "ok",
      };
    } catch (error) {
      console.error("❌ createUser error:", error);
      return { status: "error", error };
    }
  }

  updateUser(
    id: number,
    user: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
    }
  ) {
    try {
      const query = this.db.query(`
        UPDATE users
        SET email=$email, password=$password, first_name=$first_name, last_name=$last_name
        WHERE id=$id;
      `);

      query.run({
        $id: id,
        $email: user.email,
        $password: user.password,
        $first_name: user.first_name,
        $last_name: user.last_name,
      });

      console.log("✅ updateUser success");
      return {
        data: { id, ...user },
        status: "ok",
      };
    } catch (error) {
      console.error("❌ updateUser error:", error);
      return { status: "error", error };
    }
  }

  deleteUser(id: number) {
    try {
      const query = this.db.query("DELETE FROM users WHERE id=$id;");
      query.run({ $id: id });
      console.log("✅ deleteUser success");
      return { status: "ok" };
    } catch (error) {
      console.error("❌ deleteUser error:", error);
      return { status: "error", error };
    }
  }
}
