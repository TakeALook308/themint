package com.takealook.api.response;

import com.takealook.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class MemberLoginPostRes {
    String accessToken;
    String refreshToken;
    Long memberSeq;
    String memberId;
    String nickname;

    public static MemberLoginPostRes of (Map<String, String> tokens, Long memberSeq, String memberId, String nickname) {
        MemberLoginPostRes res = new MemberLoginPostRes();
        res.setAccessToken(tokens.get("accessToken"));
        res.setRefreshToken(tokens.get("refreshToken"));
        res.setMemberSeq(memberSeq);
        res.setMemberId(memberId);
        res.setNickname(nickname);
        return res;
    }
}
