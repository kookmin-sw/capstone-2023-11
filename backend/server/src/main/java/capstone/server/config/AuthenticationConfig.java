package capstone.server.config;

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
			.antMatchers(HttpMethod.POST,"/api/**").authenticated() // 접근 막기
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
			.addFilterBefore(new JwtFilter(loginService, secretKey), UsernamePasswordAuthenticationFilter.class)
			.build();
  }
}
