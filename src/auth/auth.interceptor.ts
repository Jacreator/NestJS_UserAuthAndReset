import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userJWT = request.cookies['userJWT'];

    if (!this.jwtService.verify(userJWT)) {
      throw new UnauthorizedException();
    }
    return next.handle();
  }
}
