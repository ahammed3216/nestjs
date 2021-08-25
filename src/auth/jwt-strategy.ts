import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./jwt-payload-interface";
import { User } from "./users.entity";
import { UserRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userrepository:UserRepository,
        

    ){
        super({
            secretOrKey:'topSecret51',
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:JwtPayload):Promise<User>{
        const {username }=payload;
        const user:User=await this.userrepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }
        else{
            return user;
        }
    }
}