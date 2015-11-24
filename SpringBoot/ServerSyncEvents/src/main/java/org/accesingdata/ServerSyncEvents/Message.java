package org.accesingdata.ServerSyncEvents;

import org.hibernate.validator.constraints.NotEmpty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author njg5kor
 *
 */
@Getter
@Setter
@NoArgsConstructor
public class Message {

	@NotEmpty
	private String from;

	@NotEmpty
	private String message;

	/**
	 * 
	 */
	public Message(String from, String message) {
		this.from = from;
		this.message = message;
	}

	@Override
	public String toString() {

		return "Message{" + "from='" + from + '\'' + ", message='" + message + '\'' + '}';
	}

}
