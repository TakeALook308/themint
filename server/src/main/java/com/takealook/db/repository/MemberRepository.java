package com.takealook.db.repository;

import com.takealook.db.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findBySeq(Long memberSeq);
    Member findByMemberId(String memberId);
    Member findByNickname(String nickname);
    Member findByEmail(String email);
    Member findByPhone(String phone);
    Member findByMemberIdAndEmail(String memberId, String email);

    List<Member> findAllByNicknameContainsAndNicknameIsNot(String word, String memberNick, Pageable pageable);
    List<Member> findAllByNicknameContains(String word, Pageable pageable);
    List<Member> findAll();
//    @Transactional
//    void deleteMemberBySeq(Long memberSeq);

    Member findByMemberNameAndPhone(String memberName, String Phone);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET score = score + :score WHERE seq = :seq")
    int updateMemberScore(Long seq, int score);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET pwd = :pwd WHERE seq = :seq")
    int updateMemberPassword(Long seq, String pwd);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET profileUrl = :profileUrl WHERE seq = :seq")
    int updateMemberProfileImage(Long seq, String profileUrl);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET phone = :phone WHERE seq = :seq")
    int updateMemberPhone(Long seq, String phone);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    @Query("UPDATE Member SET status = 0 WHERE seq = :seq")
    int updateMemberStatus(Long seq);

}
