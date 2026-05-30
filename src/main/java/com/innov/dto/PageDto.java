package com.innov.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class PageDto {
	
	@JsonProperty("page")
	public int page;
	
	@JsonProperty("rows")
	public int rows;

	void setPage(int page) {
		this.page = page;
	}
	
	void setRows(int rows) {
		this.rows = rows;
	}
	
	public int getPage() {
		return page;
	}
	
	public int getRows() {
		return rows;
	}
}
