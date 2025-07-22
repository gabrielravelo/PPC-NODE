import { User, IUser } from '../models/user.model';

export class UserRepository {
  async findByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username });
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
  }
}
