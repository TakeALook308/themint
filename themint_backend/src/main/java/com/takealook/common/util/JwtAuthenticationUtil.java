package com.takealook.common.util;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
public class JwtAuthenticationUtil {

    public String GetMemberIdByJwt(HttpServletRequest request) {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        if (token != null) {
            JWTVerifier verifier = JwtTokenUtil.getVerifier();
            JwtTokenUtil.handleError(token);
            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
            String memberId = decodedJWT.getSubject();
            return memberId;
        }
        return null;
    }
}
