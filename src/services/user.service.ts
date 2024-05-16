import db from "../data-source";
import { User } from "../entities/user.entity";

const userRepository = db.getRepository(User);

export class UserService {
  async queryList() {
    const users = await userRepository.find();
    return users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async login(credentials: { username: string; password: string }) {
    const user = await userRepository.findOneBy({
      username: credentials.username,
      password: credentials.password,
    });
    return user;
  }

  async register(user: User) {
    return userRepository.save(user);
  }
}
