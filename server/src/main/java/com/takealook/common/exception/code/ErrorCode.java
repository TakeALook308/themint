package com.takealook.common.exception.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND(404, "COMMON_ERR_404", "PAGE NOT FOUND"),
    INTER_SERVER_ERROR(500, "COMMON_ERR_500", "INTER SERVER ERROR"),
    // 관심 경매/카테고리/키워드
    INTEREST_DUPLICATION(409, "INTEREST_ERR_409", "이미 등록된 관심 항목입니다."),
    // 경매
    AUCTION_NOT_FOUND(404, "AUCTION_ERR_404", "AUCTION NOT FOUND"),
    AUCTION_TIME_DUPLICATION(409, "AUCTION_ERR_409", "다른 경매의 시작시간의 전후 30분 이내로는 경매를 예약할 수 없습니다."),
    AUCTION_DELETE_FAIL(409, "AUCTION_ERR_409", "이미 시작시간이 지난 경매는 삭제할 수 없습니다."),
    // 물품
    PRODUCT_NOT_FOUND(404, "PRODUCT_ERR_404", "PRODUCT NOT FOUND"),
    // 구매내역
    // 판매내역
    HISTORY_NOT_FOUND(404, "HISTORY_ERR_404", "HISTORY NOT FOUND"),
    // 멤버
    MEMBER_NOT_FOUND(404, "MEMBER_ERR_404", "MEMBER NOT FOUND"),
    MEMBERID_DUPLICATION(409, "MEMBER_ERR_409", "이미 존재하는 아이디입니다."),
    NICKNAME_DUPLICATION(409, "MEMBER_ERR_409", "이미 존재하는 닉네임입니다."),
    EMAIL_DUPLICATION(409, "MEMBER_ERR_409", "이미 존재하는 이메일입니다."),
    PHONE_DUPLICATION(409, "MEMBER_ERR_409", "이미 존재하는 휴대폰 번호입니다."),
    ;

    private int status;
    private String errorCode;
    private String message;
}
