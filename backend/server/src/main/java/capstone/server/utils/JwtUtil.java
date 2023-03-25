package capstone.server.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {
  public static Long getKakaoAccountId(String token, String secretKey) {
	return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("kakaoAccountId",Long.class);
  }

  public static String getUserType(String token, String secretKey){
	return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().get("userType",String.class);
  }

  public static boolean isExpired(String token, String secretKey){
	return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration().before(new Date());
  }

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
