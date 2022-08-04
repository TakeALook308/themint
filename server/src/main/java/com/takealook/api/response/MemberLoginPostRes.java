package com.takealook.api.response;

import com.takealook.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginPostRes {
    String accessToken;
    Long memberSeq;
    String memberId;
    String nickname;

    public static MemberLoginPostRes of (String accessToken, Long memberSeq, String memberId, String nickname) {
        MemberLoginPostRes res = new MemberLoginPostRes();
        res.setAccessToken(accessToken);
        res.setMemberSeq(memberSeq);
        res.setMemberId(memberId);
        res.setNickname(nickname);
        return res;
    }
}
