import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN=process.env.ACCESS_TOKEN || 'default-access-token-for-build-compatibility';
const REFRESH_TOKEN=process.env.REFRESH_TOKEN || 'default-refresh-token-for-build-compatibility';

// Note: These API routes are deprecated. JWT operations are now handled by Spring Boot backend.
// This file is kept for build compatibility only.

export const generateAccessToken=(payload)=>{
    return jwt.sign(payload,ACCESS_TOKEN,{expiresIn:'5m'});
}

export const generateRefreshToken=(payload)=>{
    return jwt.sign(payload,REFRESH_TOKEN,{expiresIn:'15m'});
}

export const generateAuthTokens=(payload)=>{
    const accessToken=generateAccessToken(payload);
    const refreshToken=generateRefreshToken(payload);
    return {accessToken,refreshToken};
}

export const verifyAccessToken=(token)=>{
    return jwt.verify(token,ACCESS_TOKEN);
}

export const verifyRefreshToken=(token)=>{
    return jwt.verify(token,REFRESH_TOKEN);
}