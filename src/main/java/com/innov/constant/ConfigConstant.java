package com.innov.constant;

public class ConfigConstant {
	
	private ConfigConstant() {
		throw new IllegalStateException(ConfigConstant.class.getName());
	}

	public static final String BASE_PACKAGE = "com.innov";
	
	public static final String BASE_PACKAGE_REPO = BASE_PACKAGE + ".repository";
	
	public static final String BASE_PACKAGE_MODEL = BASE_PACKAGE + ".model";
	
	public static final String BASE_PACKAGE_DTO = BASE_PACKAGE + ".dto";
	
	public static final String BASE_PACKAGE_SERVICE = BASE_PACKAGE + ".service";
	
	public static final String BASE_PACKAGE_CONTROLLER = BASE_PACKAGE + ".controller";
	
	public static final String TYPE_APPLICATION_JSON = "application/json";
	
	public static final String FILE_PFX = "file:";
}
