package spring.emp.main.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import spring.emp.main.service.EmailService;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailController {

	private final EmailService service;
	
	@GetMapping("/test")
	public String testMail() {
		service.sendEmail("perfect.idiot1021@gmail.com", "EMS TESTING", "IF U SEEING THIS, MAIL WORKS DO NOT REPLY");
		return "mail sent";
	}
	
}
