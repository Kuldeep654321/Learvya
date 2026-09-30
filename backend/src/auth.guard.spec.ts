import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_ANON_KEY;

  beforeEach(() => {
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_ANON_KEY = 'anon-key';
  });

  afterAll(() => {
    process.env.SUPABASE_URL = originalUrl;
    process.env.SUPABASE_ANON_KEY = originalKey;
  });

  it('rejects requests without a bearer token', async () => {
    const guard = new AuthGuard();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as any;

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('attaches validated user and token to the request', async () => {
    const guard = new AuthGuard();
    (guard as any).supabase = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: { id: 'user-1' } },
          error: null,
        }),
      },
    };

    const request = {
      headers: { authorization: 'Bearer token-1' },
    };
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as any;

    await expect(guard.canActivate(context)).resolves.toBe(true);
    expect(request.user.id).toBe('user-1');
    expect(request.accessToken).toBe('token-1');
  });
});
