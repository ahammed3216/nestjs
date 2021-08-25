import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './users.entity';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userrepository:UserRepository,
    private jwtservice:JwtService){}


    async SignUp(authcredentialdto:AuthCredentialsDto):Promise<void>{
        const {username,password}=authcredentialdto;
        const salt=await bcrypt.genSalt();
        const hashpassword=await bcrypt.hash(password,salt);
        const user=this.userrepository.create({username,password:hashpassword});
        try{
        await this.userrepository.save(user);
        }catch(error){
          if(error.code === '23505'){
            throw new ConflictException('username is also exists')
          }
          else{
            throw new InternalServerErrorException();
          }
        }
        

        
    }

    async SignIn(authcredentialsdto:AuthCredentialsDto):Promise<{acess_token}>{
      const{username,password}=authcredentialsdto;
      const user=await this.userrepository.findOne({username});
      if(user && (await bcrypt.compare(password,user.password))){
        const payload:JwtPayload={username};
        const acess_token=await this.jwtservice.sign(payload);
        return {acess_token};

      }else{
        throw new UnauthorizedException('please check your credentials')
      }
    }

    


    
}
