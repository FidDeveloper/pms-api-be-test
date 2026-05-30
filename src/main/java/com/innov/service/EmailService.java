package com.innov.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);	
	@Autowired
	private JavaMailSender mailSender;
	
	public void sendFirstCredentialHtml(String toEmail, String subject, String passsword, String username) {
		
		String body = "<h2 style='color:blue;'>First Time Password</h2>"
				+ "<p>Your First time password is " + passsword + "</p>"
				+ "<p>Please use the password and set your password during first login</p>";
		
		sendSimpleEmailHtml(toEmail, subject, body);
		
	}
	
	public void sendForgotPasswordlHtml(String toEmail, String subject, String username, String link) {
		
		String body = "<h2 style='color:blue;'>Reset your password</h2>"
				+ "<p>Please click below link to setup your new password</p>"
				+ "<a href='" + link + "'>Setup Password</a>";
		
		sendSimpleEmailHtml(toEmail, subject, body);
		
	}
	
    public void sendSimpleEmailHtml(String toEmail, String subject, String body) {
    	try {
	        MimeMessage mimeMessage = mailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
	
	        helper.setFrom("denielmustakim2303@gmail.com");  // Must match the configured sender
	        helper.setTo(toEmail);
	        helper.setSubject(subject);
	        helper.setText(body, true);
	
	        mailSender.send(mimeMessage);
	
	        LOGGER.info("Mail sent successfully to " + toEmail);
    	}catch(MessagingException e) {
    		LOGGER.error("Failed to send HTML email to " + toEmail, e);
    	}
    }
	
    public void sendSimpleEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("denielmustakim2303@gmail.com");  // Must match the configured sender
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

        LOGGER.info("Mail sent successfully to " + toEmail);
    }

}
