package com.takealook.api.service;

import com.takealook.db.entity.AuctionImage;
import com.takealook.db.repository.AuctionImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AuctionImageServiceImpl implements AuctionImageService{

    @Autowired
    AuctionImageRepository auctionImageRepository;

    @Autowired
    S3FileService s3FileService;

    @Override
    public AuctionImage getBaseImage() {
        AuctionImage baseImage = auctionImageRepository.findBySeq(1L);
        return baseImage;
    }

    @Override
    public List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq) {
        List<AuctionImage> auctionImageList = auctionImageRepository.findByAuctionSeq(auctionSeq).orElse(null);
        return auctionImageList;
    }

    @Override
    public void updateAuctionImageList(Long auctionSeq, String hash, List<MultipartFile> multipartFileList) {
        // 이미지 S3에서 전체 삭제
        // TODO: 삭제 해야함
        List<AuctionImage> auctionImageDeleteList = auctionImageRepository.findByAuctionSeq(auctionSeq).get();
        for(AuctionImage auctionImage: auctionImageDeleteList) {
            s3FileService.deleteFile(auctionImage.getImageUrl().substring(1)); // 맨 앞 '/' 제거
        }
        // 이미지 db에서 전체 삭제
        auctionImageRepository.deleteAllByAuctionSeq(auctionSeq);

//      옥션 이미지 없을 시 기본이미지 넣기
        if (multipartFileList.get(0).isEmpty()) {
            auctionImageRepository.save(AuctionImage.builder()
                    .auctionSeq(auctionSeq)
                    .imageUrl("/product/basic1.png")
                    .build());
        } else {
            // S3 버킷에 물품 이미지 저장 후 db에 imageUrl 저장
            try {
                List<String> imageUrlList = s3FileService.uploadProductIamge(multipartFileList, hash);
                for (String imageUrl : imageUrlList) {
                    AuctionImage auctionImage = AuctionImage.builder()
                            .auctionSeq(auctionSeq)
                            .imageUrl(imageUrl)
                            .build();
                    System.out.println("이미지URL" + auctionImage.getAuctionSeq());
                    auctionImageRepository.save(auctionImage);
                }
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }

    @Transactional
    @Override
    public void deleteAuctionImageList(Long auctionSeq) {
        auctionImageRepository.deleteAllByAuctionSeq(auctionSeq);
    }
}
