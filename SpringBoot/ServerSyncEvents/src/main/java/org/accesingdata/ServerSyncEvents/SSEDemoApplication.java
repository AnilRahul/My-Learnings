package org.accesingdata.ServerSyncEvents;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.accesingdata.ServerSyncEvents.Message;

/**
 * Hello world!
 *
 */
@Controller
@SpringBootApplication
public class SSEDemoApplication {

	private static final Logger log = Logger.getLogger(SSEDemoApplication.class);

	private final List<SseEmitter> emitters = new ArrayList<>();

	public static void main(String[] args) {
		SpringApplication.run(SSEDemoApplication.class, args);
	}

	@RequestMapping(path = "/stream", method = RequestMethod.GET)
	public SseEmitter StreamEmitter() {

		SseEmitter emitter = new SseEmitter();
		emitters.add(emitter);
		emitter.onCompletion(() -> emitters.remove(emitter));
		return emitter;
	}

	@ResponseBody
	@RequestMapping(path = "/chat", method = RequestMethod.POST)
	public Message sendMessage(@Valid Message message) {

		log.info("Got Message :" + message);

		emitters.forEach((SseEmitter emitter) -> {

			try {
				emitter.send(message, MediaType.APPLICATION_JSON);
			} catch (IOException ioE) {
				emitter.complete();
				emitters.remove(emitter);
				ioE.printStackTrace();
			}

		});

		return message;

	}

}
