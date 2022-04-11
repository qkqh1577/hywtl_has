package com.howoocast.hywtl_has.common.service;

import java.io.UnsupportedEncodingException;
import java.util.Objects;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MailService {

    @Value("${application.mail.username}")
    private String username;

    @Value("${application.mail.name}")
    private String name;

    @Value("${application.mail.password}")
    private String password;

    @Value("${application.mail.host}")
    private String host;

    @Value("${application.mail.port}")
    private String port;

    @Value("${application.mail.auth}")
    private String auth;

    @Value("${application.mail.starttls}")
    private String starttls;

    @Value("${application.mail.dev-receiver}")
    private String devReceiver;

    private static final String UTF8 = "UTF-8";

    public void send(
        @NotBlank String toEmail,
        @NotBlank String toName,
        @NotBlank String title,
        @NotBlank String message
    ) throws MessagingException, UnsupportedEncodingException {
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);
        props.put("mail.smtp.auth", auth);
        props.put("mail.smtp.starttls.enable", starttls);
        Session mailSession = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        MimeMessage mimeMessage = new MimeMessage(mailSession);
        mimeMessage.setHeader("Content-Type", "text/html; charset=" + UTF8);
        mimeMessage.setFrom(new InternetAddress(username, name, UTF8));
        mimeMessage.setSubject(title, UTF8);
        mimeMessage.setText(message, UTF8);

        if (Objects.isNull(devReceiver) || devReceiver.isEmpty()) {
            mimeMessage.setRecipient(RecipientType.TO, new InternetAddress(toEmail, toName, UTF8));
        } else {
            mimeMessage.setRecipient(RecipientType.TO, new InternetAddress(devReceiver, "개발자", UTF8));
        }

        Transport.send(mimeMessage);

    }
}
