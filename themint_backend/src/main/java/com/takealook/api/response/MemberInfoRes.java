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
public class MemberInfoRes {
	Long memberSeq;
	String memberId;
	String memberName;
	String nickname;
	String email;
	String address;
	String addressDetail;
	String zipCode;
	String phone;
	String profileUrl;
	int bankCode;
	String accountNo;
	int score;
	int noticeKakao;
	int noticeEmail;

	public static MemberInfoRes of(Member member) {
		MemberInfoRes res = MemberInfoRes.builder()
				.memberSeq(member.getSeq())
				.memberId(member.getMemberId())
				.memberName(member.getMemberName())
				.nickname(member.getNickname())
				.email(member.getEmail())
				.address(member.getAddress())
				.addressDetail(member.getAddressDetail())
				.zipCode(member.getZipCode())
				.phone(member.getPhone())
				.profileUrl(member.getProfileUrl())
				.bankCode(member.getBankCode())
				.accountNo(member.getAccountNo())
				.score(member.getScore())
				.noticeKakao(member.getNoticeKakao())
				.noticeEmail(member.getNoticeEmail())
				.build();
		return res;
	}
}
