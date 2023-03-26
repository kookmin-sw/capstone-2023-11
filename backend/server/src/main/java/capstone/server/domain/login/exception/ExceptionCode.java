package capstone.server.domain.login.exception;

public enum ExceptionCode {
  NOT_FOUND(404, "Not Found"),
  BAD_REQUEST(400, "Bad Request"),
  INTERNAL_SERVER_ERROR(500, "Internal Server Error"),
  UNKNOWN_ERROR(500, "Unknown Error"),
  WRONG_TYPE_TOKEN(400, "Wrong Type Token"),
  EXPIRED_TOKEN(401, "Expired Token"),
  UNSUPPORTED_TOKEN(401, "Unsupported Token"),
  ACCESS_DENIED(403, "Access Denied");

  private final int status;
  private final String message;

  ExceptionCode(int status, String message) {
	this.status = status;
	this.message = message;
  }

  public int getStatus() {
	return status;
  }

  public String getMessage() {
	return message;
  }

}
