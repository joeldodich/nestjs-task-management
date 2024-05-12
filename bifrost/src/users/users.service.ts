import { User } from './user.model';

export abstract class UsersService {
  abstract getUserById(id: User['id']): Promise<User>;
  abstract findUsersByIds(ids: User['id'][]): Promise<User[]>;
}
