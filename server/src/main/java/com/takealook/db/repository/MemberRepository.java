package com.takealook.db.repository;

import com.takealook.api.request.MemberUpdatePostReq;
import com.takealook.db.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findBySeq(Long memberSeq);
    Member findByMemberId(String memberId);
    Member findByNickname(String nickname);
    Member findByEmail(String email);
    Member findByPhone(String phone);
    List<Member> findAllByNicknameContains(String word, Pageable pageable);
    @Transactional
    void deleteMemberBySeq(Long memberSeq);
    Member findByMemberNameAndPhone(String memberName, String Phone);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET score = :score WHERE seq = :seq")
    int updateMemberScore(Long seq, int score);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET pwd = :pwd WHERE seq = :seq")
    int updateMemberPassword(Long seq, String pwd);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET profileUrl = :profileUrl WHERE seq = :seq")
    int updateMemberProfileImage(Long seq, String profileUrl);

}
