import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { describe } from 'node:test';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('returns a user by id', async () => {
      const user = { id: '1', name: 'Juan', email: 'test@email.com' };
      mockUsersService.findOne.mockResolvedValue(user);

      const result = await usersController.findOne(user.id);

      expect(result).toEqual(user);
      expect(usersService.findOne).toHaveBeenCalledWith(user.id);
    });
    it('returns null if the user is not found', async () => {
      const nonExistingId = 'non_existing_id';
      mockUsersService.findOne.mockResolvedValue(null);

      const result = await usersController.findOne('non_existing_id');
      expect(result).toBeNull();
      expect(usersService.findOne).toHaveBeenCalledWith(nonExistingId);
    });
  });
});
