/**
 * 
 */
package org.accesingdata.AccessingDataMongo;

import org.springframework.data.annotation.Id;

/**
 * @author njg5kor
 *
 */
public class Customer {

	@Id
	private int id;

	private String firstName;

	private String lastName;

	/**
	 * 
	 */
	public Customer() {
	}

	public Customer(int id, String firstName, String lastName) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Override
	public String toString() {
		return String.format("Customer [id= %s, firstName='%s', lastName='%s']", id, firstName, lastName);
	}

}
