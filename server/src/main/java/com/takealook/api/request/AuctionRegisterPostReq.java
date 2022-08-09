package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 *  경매 생성 API ([POST] /api/auction) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
@ApiModel("AuctionRegisterPostRequest")
public class AuctionRegisterPostReq {
    @ApiModelProperty(name = "경매글 제목", example = "여름옷 판매합니다.")
    String title;
    @ApiModelProperty(name = "경매글 내용", example = "유행 지나서 안 입는 옷들 싸게 내놓습니다.")
    String content;
    @ApiModelProperty(name = "카테고리 번호", example = "2")
    Long categorySeq;
    @ApiModelProperty(name = "경매 시작 시간", example = "2022:08:10 15:00:00")
    String startTime;
    @ApiModelProperty(name = "", example = "")
    List<ProductRegisterPostReq> productList;
    @ApiModelProperty(name = "", example = "")
    MultipartFile[] auctionImageList;
}
