import CrudService from "./base/crud.service";
import db from "@/data-source";
import { User } from "@/export";

const userRepository = db.getRepository(User);

export default class UserService extends CrudService<User> {
  constructor() {
    super(userRepository);
  }

  async login(credentials: { username: string; password: string }) {
    const user = await this.repository.findOneBy(credentials);
    return user;
  }

  async register(user: User) {
    return this.create(user);
  }
}
