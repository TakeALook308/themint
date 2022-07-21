package com.takealook.api.response;

import com.takealook.db.entity.Member;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("MemberResponse")
public class MemberRes {
	@ApiModelProperty(name="Member ID")
	String memberId;
	
	public static MemberRes of(Member member) {
		MemberRes res = new MemberRes();
		res.setMemberId(member.getMemberId());
		return res;
	}
}
