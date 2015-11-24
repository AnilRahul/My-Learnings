package org.accesingdata.async_method;

import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * AsyncQueriesToFacebookGraphApi
 * 
 * 
 * @SpringBootApplication is a convenience annotation that adds all of the
 *                        following:
 * 
 * @Configuration tags the class as a source of bean definitions for the
 *                application context.
 * 
 * @EnableAutoConfiguration tells Spring Boot to start adding beans based on
 *                          classpath settings, other beans, and various
 *                          property settings. Normally you would
 *                          add @EnableWebMvc for a Spring MVC app, but Spring
 *                          Boot adds it automatically when it sees
 *                          spring-webmvc on the classpath. This flags the
 *                          application as a web application and activates key
 *                          behaviors such as setting up a DispatcherServlet.
 * 
 * @ComponentScan tells Spring to look for other components, configurations, and
 *                services in the the hello package, allowing it to find the
 *                HelloController. The main() method uses Spring Boot’s
 *                SpringApplication.run() method to launch an application.
 * 
 *                Did you notice that there wasn’t a single line of XML? No
 *                web.xml file either. This web application is 100% pure Java
 *                and you didn’t have to deal with configuring any plumbing or
 *                infrastructure.
 * 
 *                The @EnableAsync annotation switches on Spring’s ability to
 *                run @Async methods in a background thread pool.
 * 
 *
 */
@SpringBootApplication
@EnableAsync
public class AsyncQueriesToFacebook implements CommandLineRunner {

	@Autowired
	FacebookLookupService facebookLookupService;

	@Override
	public void run(String... args) throws Exception {
		// Start the clock
		long start = System.currentTimeMillis();

		// Kick of multiple, asynchronous lookups
		Future<Page> page1 = facebookLookupService.findPage("v2.4/me?fields=id,name&access_token=CAACEdEose0cBAPfvyLwmgA4zanOUYLg10jiFiJsI7O4eoclsnIillDbGwad2nu5Aom1yzFKtjviM8iIgx12P92RJjKQbIbZCZBJ9uDE9BhldNG3w0daYPMHwPgpmZBgMVRXthKTsy2BNudscKQMgC8oISYn3ft09jIBIHpL4miZBI7uxohbCVnKOEJ8AOCYKpodjwQb6reRFeg9PQhv6");
		/*Future<Page> page2 = facebookLookupService.findPage("Google");
		Future<Page> page3 = facebookLookupService.findPage("SpringFramework");*/
		// Wait until they are all done
		while (!(page1.isDone() 
				/*&& page2.isDone() && page3.isDone()*/
				
				)) {
			Thread.sleep(10); // 10-millisecond pause between each check
		}

		System.out.println("Elapsed Time :" + (System.currentTimeMillis() - start));
		System.out.println(page1.get());
		/*System.out.println(page2.get());
		System.out.println(page3.get());*/

	}

	public static void main(String[] args) {
		SpringApplication.run(AsyncQueriesToFacebook.class, args);
	}
}
