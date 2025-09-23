import { cookies } from "next/headers";

export async function authMiddleware(request){
    try{
        const cookieStore=cookies();
        const accessToken=cookieStore.get('accessToken');
        if(!accessToken){
            return Response.json({error:'No access token provided'},{status:401});
        }

        // Frontend-only: backend validates JWT. Here we only check presence.
        return null;
    }catch(error){
        console.log('Auth middleware error:', error);
        return Response.json({error:'Internal Server Error'},{status:500});
    }
}