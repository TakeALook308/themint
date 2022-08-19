package com.takealook.api.response;

import com.takealook.db.entity.Member;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 목록 검색 API ([GET] /api/member) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("MemberListEntityResponse")
public class MemberListEntityRes {
    Long memberSeq;
    String nickname;
    String profileUrl;
    int score;

    public static MemberListEntityRes of(Member member) {
        MemberListEntityRes res = MemberListEntityRes.builder()
                .memberSeq(member.getSeq())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .score(member.getScore())
                .build();
        return res;
    }
}
