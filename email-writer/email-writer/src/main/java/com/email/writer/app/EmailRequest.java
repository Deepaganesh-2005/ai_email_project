package com.email.writer.app;

import lombok.Data;

import java.util.Map;

@Data
public class EmailRequest {

    private String emailContent;
    private String tone;

    public String getTone() {
        return tone;
    }

    public String getEmailContent() {
        return emailContent;
    }
}
