package com.innov.dto;

public class GeneralResponse {
	
	public boolean success;
	public String message;
	public Object data;

	public GeneralResponse(boolean success, String message, Object data) {
		this.success = success;
		this.message = message;
		this.data = data;
	}
	
	public GeneralResponse(boolean success, String message) {
		this.success = success;
		this.message = message;
	}
	
    public boolean isSuccess() {return success;}
    public void setSuccess(boolean success) {this.success = success;}

    public String getMessage() {return message;}
    public void setMessage(String message) {this.message = message;}

    public Object getData() {return data;}
    public void setData(Object data) {this.data = data;}
}
