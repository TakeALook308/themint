package com.takealook.api.controller;

import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.service.AuctionService;
import com.takealook.api.service.MemberService;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.common.util.JwtAuthenticationUtil;
import com.takealook.db.entity.Auction;
import com.takealook.db.entity.Member;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Api(value = "경매 API", tags = {"Auction"})
@RestController
@RequestMapping("/api/auction")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    @Autowired
    MemberService memberService;

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

    @PostMapping
    public ResponseEntity<BaseResponseBody> registerAuction(@RequestBody AuctionRegisterPostReq auctionRegisterPostReq, HttpServletRequest request){
        String memberId = jwtAuthenticationUtil.GetMemberIdByJwt(request);
        if (memberId != null) {
            // jwt 토큰에 포함된 계정 정보(memberId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            Member member = memberService.getMemberByMemberId(memberId);
            if (member != null) {
                Auction auction = auctionService.createAuction(member.getSeq(), auctionRegisterPostReq);
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
            }
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
    }

}
