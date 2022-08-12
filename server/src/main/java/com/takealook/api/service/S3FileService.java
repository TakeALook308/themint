package com.takealook.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.takealook.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class S3FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // Bucket 이름

    @Autowired
    AmazonS3Client amazonS3Client;

    @Autowired
    MemberRepository memberRepository;

    public String uploadProfileImage(MultipartFile multipartFile, Long memberSeq) throws Exception {
        String originalName = createFileName(multipartFile.getOriginalFilename()); // 파일 이름
        long size = multipartFile.getSize(); // 파일 크기
        System.out.println(originalName);
        String extension = originalName.substring(originalName.lastIndexOf("."));
        System.out.println(extension);
        if (!(extension.equals(".jpeg") || extension.equals(".JPEG") || extension.equals(".jpg")|| extension.equals(".JPG") || extension.equals(".png") || extension.equals(".PNG"))) {
            return "fail";
        }

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(multipartFile.getContentType());
        objectMetaData.setContentLength(size);

        // S3에 업로드
        amazonS3Client.putObject(
                new PutObjectRequest(bucket + "/member", originalName, multipartFile.getInputStream(), objectMetaData)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );
        String imagePath = amazonS3Client.getUrl(bucket + "/member", originalName).toString().substring(50); // 접근가능한 URL 가져오기, 버킷 URL 제거
        memberRepository.updateMemberProfileImage(memberSeq, imagePath);
        return imagePath;
    }

    public List<String> uploadProductIamge(List<MultipartFile> multipartFileList, String hash) throws Exception {
        List<String> imagePathList = new ArrayList<>();

        for(MultipartFile multipartFile: multipartFileList) {
            String originalName = createFileName(multipartFile.getOriginalFilename()); // 파일 이름
            long size = multipartFile.getSize(); // 파일 크기

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            // S3에 업로드
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket + "/product/" + hash, originalName, multipartFile.getInputStream(), objectMetaData)
                            .withCannedAcl(CannedAccessControlList.PublicRead)
            );

            String imagePath = amazonS3Client.getUrl(bucket + "/product/" + hash, originalName).toString().substring(50); // 접근가능한 URL 가져오기, 버킷 url 제거
            imagePathList.add(imagePath);
        }

        return imagePathList;
    }

    public void deleteFile(String fileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) { // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였습니다.
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}
