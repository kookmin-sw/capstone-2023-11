package capstone.server.config;

import capstone.server.domain.login.dto.KaKaoAccountIdAndUserType;
import capstone.server.domain.login.service.LoginService;
import capstone.server.utils.JwtUtil;
import io.jsonwebtoken.MalformedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter { // JWT를 계속해서 확인하기

  private final LoginService loginService;
  private final String secretKey;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
	// 여기가 문이다, 인증하기전에 여기서 권한을 준다는 느낌

	// 토큰이 존재 하지 않으면 인가 Block
	final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
	log.info("authorization : ", authorization);
	if (authorization == null || authorization.isBlank() || !authorization.startsWith("Bearer ")) {
	  log.error("authentication 정보가 잘못 됨");
	  filterChain.doFilter(request, response);
	  return;
	}


	// 토큰 만료일 검증
	String token = authorization.split(" ")[1]; // Bearer 다음 값인 토큰 값 파싱
	log.info("token : " + token);
	// Token Expired(만료) 여부 확인
	if (JwtUtil.isExpired(token.toString(), secretKey)) {
	  log.error("token이 만료 됨");
	  filterChain.doFilter(request, response);
	  return;
	}

	Long kakaoAccountId = JwtUtil.getKakaoAccountId(token, secretKey);
	String userType = JwtUtil.getUserType(token, secretKey);
	log.info("kakaoAccountId : " + kakaoAccountId);
	log.info("userType : " + userType);

	KaKaoAccountIdAndUserType kaKaoAccountIdAndUserType = KaKaoAccountIdAndUserType.builder()
			.kakaoAccountId(kakaoAccountId)
			.userType(userType)
			.build();


	// 권한 부여
	UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(kaKaoAccountIdAndUserType, null, List.of(new SimpleGrantedAuthority("USER")));

	// 디테일을 넣어준다
	authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	filterChain.doFilter(request, response);


  }
}
