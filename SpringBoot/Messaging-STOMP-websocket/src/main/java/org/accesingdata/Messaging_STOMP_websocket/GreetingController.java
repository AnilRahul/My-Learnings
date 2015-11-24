/**
 * 
 */
package org.accesingdata.Messaging_STOMP_websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * @author njg5kor
 *
 *         The @MessageMapping annotation ensures that if a message is sent to
 *         destination "/hello", then the greeting() method is called.
 *
 *         The payload of the message is bound to a HelloMessage object which is
 *         passed into greeting().
 *
 *         Internally, the implementation of the method simulates a processing
 *         delay by causing the thread to sleep for 3 seconds. This is to
 *         demonstrate that after the client sends a message, the server can
 *         take as long as it needs to process the message asynchronously. The
 *         client may continue with whatever work it needs to do without waiting
 *         on the response.
 * 
 *         After the 3 second delay, the greeting() method creates a Greeting
 *         object and returns it. The return value is broadcast to all
 *         subscribers to "/topic/greetings" as specified in the @SendTo
 *         annotation.
 *
 */
@Controller
public class GreetingController {

	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) throws InterruptedException {
		Thread.sleep(3000); // simulated delay
		return new Greeting("Hello," + message.getName() + "!");
	}

}
