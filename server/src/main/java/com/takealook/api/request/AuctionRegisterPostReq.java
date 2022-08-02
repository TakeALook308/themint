package com.takealook.api.request;

import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Product;
import io.swagger.annotations.ApiModelProperty;

import java.time.LocalDateTime;
import java.util.List;

public class AuctionRegisterPostReq {
    @ApiModelProperty(name = "경매글 제목", example = "여름옷 판매합니다.")
    String title;
    @ApiModelProperty(name = "경매글 내용", example = "유행 지나서 안 입는 옷들 싸게 내놓습니다.")
    String content;
    @ApiModelProperty(name = "카테고리 번호", example = "2")
    Long categorySeq;
    @ApiModelProperty(name = "경매 시작 시간", example = "")
    LocalDateTime startTime;
    @ApiModelProperty(name = "", example = "")
    List<Product> productList;
    @ApiModelProperty(name = "", example = "")
    List<AuctionImage> auctionImageList;

}
