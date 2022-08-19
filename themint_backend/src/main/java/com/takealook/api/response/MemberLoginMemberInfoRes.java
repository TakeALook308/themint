package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberLoginMemberInfoRes {
    Long memberSeq;
    String memberId;
    String nickname;

    public static MemberLoginMemberInfoRes of (Long memberSeq, String memberId, String nickname) {
        MemberLoginMemberInfoRes res = MemberLoginMemberInfoRes.builder()
                .memberSeq(memberSeq)
                .memberId(memberId)
                .nickname(nickname)
                .build();
        return res;
    }
}
