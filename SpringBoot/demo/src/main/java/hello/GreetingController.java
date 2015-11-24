/**
 *
 */
package hello;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author njg5kor
 *
 */
@RestController
public class GreetingController {

   private static final String template = "Hello, %s!";

   private static AtomicLong counter = new AtomicLong();

   @RequestMapping( "/greeting" )
   public Greeting GreetingController( @RequestParam( value = "name", defaultValue = "World" ) String name) {
      return new Greeting( counter.incrementAndGet(), String.format( template, name ) );
   }

}
