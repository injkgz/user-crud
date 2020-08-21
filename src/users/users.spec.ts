import { Users } from './entity/users.entity';

describe('Users', () => {
  it('should be defined', () => {
    expect(new Users()).toBeDefined();
  });
});
