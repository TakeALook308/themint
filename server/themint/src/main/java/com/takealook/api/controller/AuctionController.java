package com.takealook.api.controller;

import com.takealook.api.service.AuctionService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "경매 API", tags = {"Auction"})
@RestController
@RequestMapping("/api/auction")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

//    @PostMapping
//    public ResponseEntity<?> registerAuction()

}
