/**
 * 
 */
package org.accesingdata.async_method;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author njg5kor
 *
 *         Spring uses the Jackson JSON library to convert Facebook’s JSON
 *         response into a Page object. The @JsonIgnoreProperties annotation
 *         signals Spring to ignore any attributes not listed in the class. This
 *         makes it easy to make REST calls and produce domain objects.
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Page {

	private long id;
	private String name;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Page [id=" + id + ", name=" + name + "]";
	}



}
