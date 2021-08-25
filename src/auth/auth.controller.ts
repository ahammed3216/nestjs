import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @Post('/signup')
    SignUp(@Body() authcredentialsdto:AuthCredentialsDto):Promise<void>{
        return this.authservice.SignUp(authcredentialsdto);
    }

    @Post('/signin')
    SignIn(@Body() authcredentialsdto:AuthCredentialsDto):Promise<{acess_token:string}>{
        return this.authservice.SignIn(authcredentialsdto);
    }
}
