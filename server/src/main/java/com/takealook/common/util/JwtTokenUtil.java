package com.takealook.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.RefreshToken;
import com.takealook.db.repository.RefreshTokenRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
public class JwtTokenUtil {
    private static String secretKey;
    private static Integer expirationTime;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "ssafy.com";

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration}") Integer expirationTime) {
        this.secretKey = secretKey;
        this.expirationTime = expirationTime;
    }

    public void setExpirationTime() {
        //JwtTokenUtil.expirationTime = Integer.parseInt(expirationTime);
        JwtTokenUtil.expirationTime = expirationTime;
    }

    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static String getToken(String userId) {
        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        return JWT.create()
                .withSubject(userId)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static String getToken(Instant expires, String userId) {
        return JWT.create()
                .withSubject(userId)
                .withExpiresAt(Date.from(expires))
                .withIssuer(ISSUER)
                .withClaim("userId", userId)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static String getRefreshToken(String userId) {
        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime * 6); // 7일
        return JWT.create()
                .withSubject(userId)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withClaim("userId", userId)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static Map<String, String> generateTokenSet(String userId) {
        Map<String, String> tokens = new HashMap<>();

        Date expiresAccess = JwtTokenUtil.getTokenExpiration(expirationTime);
        Date expiresRefresh = JwtTokenUtil.getTokenExpiration(expirationTime * 6);//8 * 7

        String accessToken = JWT.create()
                .withSubject(userId)
                .withExpiresAt(expiresAccess)
                .withIssuer(ISSUER)
                .withClaim("userId", userId)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));

        String refreshToken = JWT.create()
                .withSubject(userId)
                .withExpiresAt(expiresRefresh)
                .withIssuer(ISSUER)
                .withClaim("userId", userId)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));

        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);
        return tokens;
    }

    public Boolean reGenerateRefreshToken(Member member) throws Exception {
        RefreshToken refreshToken = refreshTokenRepository.findByMemberSeq(member.getSeq()).orElse(null);
        if (refreshToken == null) {
            log.info("[reGenerateRefreshToken] refreshToken 정보가 존재하지 않습니다.");
            return false;
        }

        try {
            JWT
                    .require(Algorithm.HMAC512(secretKey.getBytes()))
                    .withIssuer(ISSUER)
                    .build().verify(refreshToken.getRefreshToken().replace(TOKEN_PREFIX, ""));
            log.info("[reGenerateRefreshToken] refreshToken이 만료되지 않았습니다.");
            return true;
        }
        // refreshToken이 만료된 경우 재발급
        catch (TokenExpiredException e) {
            refreshToken.setRefreshToken("Bearer " + getRefreshToken(member.getMemberId()));
            refreshTokenRepository.save(refreshToken);
            log.info("[reGenerateRefreshToken] refreshToken 재발급 완료 : {}", refreshToken.getRefreshToken());
            return true;
        }
        // 그 외 예외처리
        catch (Exception e) {
            log.error("[reGenerateRefreshToken] refreshToken 재발급 중 문제 발생 : {}", e.getMessage());
            return false;
        }
    }

    public static Date getTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
