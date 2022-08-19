package com.takealook.api.response;

import com.takealook.db.entity.Member;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 정보 조회 API ([GET] /api/member) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("MemberResponse")
public class MemberViewRes {
	@ApiModelProperty(name="Member nickname")
	String nickname;
	String profileUrl;
	int score;

	public static MemberViewRes of(Member member) {
		MemberViewRes res = MemberViewRes.builder()
				.nickname(member.getNickname())
				.score(member.getScore())
				.profileUrl(member.getProfileUrl())
				.build();
		return res;
	}
}
