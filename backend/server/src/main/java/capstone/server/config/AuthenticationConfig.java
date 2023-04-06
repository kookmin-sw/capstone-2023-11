package capstone.server.config;

import capstone.server.domain.login.exception.CustomAuthenticationEntryPoint;
import capstone.server.domain.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthenticationConfig {
  // Login과 Join은 인가 없이도 접근 가능해야함
  @Value("${jwt.secret}")
  private String secretKey;

 private final LoginService loginService;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
	return httpSecurity
			.httpBasic().disable()
			.csrf().disable()
			.cors().and()
			.authorizeRequests()
			.antMatchers("/api/join/**","/api/login/**").permitAll()
			.antMatchers("/api/test/jwt/**").permitAll()
//			.antMatchers("/swagger-ui/index.html","/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger-ui/**").permitAll() // swagger 예외 적용
			.antMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll() // 스웨거 페이지에 대한 접근 권한 설정
			.anyRequest().authenticated()
			.and()
			.exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.addFilterBefore(new JwtFilter(loginService, secretKey), UsernamePasswordAuthenticationFilter.class)// TODO 여기 살펴봐라 다시
			.build();
  }
}
