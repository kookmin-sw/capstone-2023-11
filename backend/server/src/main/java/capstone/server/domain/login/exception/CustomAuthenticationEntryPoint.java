package capstone.server.domain.login.exception;

import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.aspectj.apache.bcel.classfile.CodeException;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.codec.CodecException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
  @SneakyThrows
  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
	String exception = (String)request.getAttribute("exception");

	if(exception == null) {
	  setResponse(response, ExceptionCode.UNKNOWN_ERROR);
	}
	//잘못된 타입의 토큰인 경우
	else if(exception.equals(ExceptionCode.WRONG_TYPE_TOKEN.toString())) {
	  setResponse(response, ExceptionCode.WRONG_TYPE_TOKEN);
	}
	//토큰 만료된 경우
	else if(exception.equals(ExceptionCode.EXPIRED_TOKEN.toString())) {
	  setResponse(response, ExceptionCode.EXPIRED_TOKEN);
	}
	//지원되지 않는 토큰인 경우
	else if(exception.equals(ExceptionCode.UNSUPPORTED_TOKEN.toString())) {
	  setResponse(response, ExceptionCode.UNSUPPORTED_TOKEN);
	}
	else {
	  setResponse(response, ExceptionCode.ACCESS_DENIED);
	}
  }

  private void setResponse(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException, JSONException {
	response.setContentType("application/json;charset=UTF-8");
	response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

	JSONObject responseJson = new JSONObject();
	responseJson.put("message", exceptionCode.getMessage());
	responseJson.put("code", exceptionCode.getStatus());

	response.getWriter().print(responseJson);

  }
}
