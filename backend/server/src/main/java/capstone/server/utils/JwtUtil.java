package capstone.server.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

  public static String createJwt(String userType, Long kakaoAccountId, String secretKey, Long expiredMs) {
	Claims claims = Jwts.claims();
	claims.put("kakaoAccountId", kakaoAccountId);
	claims.put("userType",userType);

	return Jwts.builder()
			.setClaims(claims)
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis()+expiredMs))
			.signWith(SignatureAlgorithm.HS256, secretKey)
			.compact();
  }
}
