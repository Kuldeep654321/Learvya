import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  it('delegates profile reads to the repository with authenticated identity', async () => {
    const repository = {
      findByUserId: jest.fn().mockResolvedValue({ userId: 'user-1', profile: null }),
      update: jest.fn(),
    };

    const service = new ProfileService(repository as any);

    await expect(service.getProfile('user-1', 'token-1')).resolves.toEqual({
      userId: 'user-1',
      profile: null,
    });

    expect(repository.findByUserId).toHaveBeenCalledWith('user-1', 'token-1');
  });

  it('delegates updates without allowing controller-level identity substitution', async () => {
    const repository = {
      findByUserId: jest.fn(),
      update: jest.fn().mockResolvedValue({ userId: 'user-1', profile: {} }),
    };

    const service = new ProfileService(repository as any);
    const payload = { display_name: 'Kd' };

    await service.updateProfile('user-1', 'token-1', payload);

    expect(repository.update).toHaveBeenCalledWith('user-1', 'token-1', payload);
  });
});
