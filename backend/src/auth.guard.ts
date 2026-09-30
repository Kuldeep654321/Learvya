import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthGuard implements CanActivate {
  // Uses the public Supabase client configuration only.
  // Never use the Supabase service-role key in the API auth guard.
  private readonly supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
  );

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    // Clients must send: Authorization: Bearer <Supabase access token>.
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');

    if (!token) throw new UnauthorizedException();

    // Ask Supabase Auth to validate the token instead of trusting
    // user-provided IDs or decoded client-side claims.
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data.user) throw new UnauthorizedException();

    // Controllers can use req.user.id for ownership checks.
    // Database RLS remains the final protection for user-owned data.
    req.user = data.user;
    return true;
  }
}