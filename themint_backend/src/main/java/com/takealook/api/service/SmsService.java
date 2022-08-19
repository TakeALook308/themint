package com.takealook.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.takealook.api.request.MessagesReq;
import com.takealook.api.request.SmsReq;
import com.takealook.api.response.SendSmsRes;
import lombok.*;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Service("smsService")
public class SmsService {

    @Value("${sms.access-key}")
    private String accessAPIKey;
    @Value("${sms.service-key}")
    private String serviceAPIKey;
    @Value("${sms.secret-key}")
    private String secretAPIKey;
    @Value("${sms.from-num}")
    private String fromNum;


    public SendSmsRes sendSms(String recipientPhoneNumber, String certNum) throws JsonProcessingException, UnsupportedEncodingException, InvalidKeyException, NoSuchAlgorithmException, URISyntaxException {
        Date currentDate = new Date();
        Long time = currentDate.getTime();
        List<MessagesReq> messages = new ArrayList<>();

        String content = "[themint] 인증번호 ["+certNum+"]를 입력해주세요.";

        // 보내는 사람에게 내용을 보냄.
        messages.add(new MessagesReq(recipientPhoneNumber,content)); // content부분이 내용임

        // 전체 json에 대해 메시지를 만든다.
        SmsReq smsRequestDto = new SmsReq("SMS", "COMM", "82",fromNum, "MangoLtd", messages);

        // 쌓아온 바디를 json 형태로 변환시켜준다.
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonBody = objectMapper.writeValueAsString(smsRequestDto);

        // 헤더에서 여러 설정값들을 잡아준다.
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type","application/json; charset=utf-8");
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key",accessAPIKey );

        // 제일 중요한 signature 서명하기.
        String sig = makeSignature(time);
        headers.set("x-ncp-apigw-signature-v2", sig);

        // 위에서 조립한 jsonBody와 헤더를 조립한다.
        HttpEntity<String> body = new HttpEntity<>(jsonBody, headers);

        // restTemplate로 post 요청을 보낸다. 별 일 없으면 202 코드 반환된다.
        RestTemplate restTemplate = new RestTemplate();
        SendSmsRes sendSmsResponseDto = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+serviceAPIKey+"/messages"), body, SendSmsRes.class);
        return sendSmsResponseDto;
    }

    public String makeSignature(Long time) throws UnsupportedEncodingException, InvalidKeyException, NoSuchAlgorithmException {
        String space = " "; // one space
        String newLine = "\n"; // new line
        String method = "POST"; // method
        String url = "/sms/v2/services/"+serviceAPIKey+"/messages"; // url (include query string)
        String timestamp = time.toString(); // current timestamp (epoch)
        String accessKey = accessAPIKey; // access key id (from portal or Sub Account)
        String secretKey = secretAPIKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");

        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }


}