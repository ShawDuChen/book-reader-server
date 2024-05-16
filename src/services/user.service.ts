import db from "../data-source";
import { User } from "../entities/user.entity";
import { createHash } from "../utils/hash";


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
    const password = createHash(credentials.password);
    const user = await userRepository.findOneBy({
      username: credentials.username,
      password,
    });
    return user;
  }

  async register(user: User) {
    const password = createHash(user.password);
    return userRepository.save({ ...user, password });
  }
}
