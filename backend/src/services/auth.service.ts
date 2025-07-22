import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { config } from '../config/env';

export class AuthService {
  private userRepo = new UserRepository();

  async register(username: string, password: string) {
    const existingUser = await this.userRepo.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepo.create({ username, password: hashedPassword, role: 'user' });
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.userRepo.findByUsername(username);
    if (!user) throw new Error('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { token, user: { id: user._id, username: user.username, role: user.role } };
  }
}
