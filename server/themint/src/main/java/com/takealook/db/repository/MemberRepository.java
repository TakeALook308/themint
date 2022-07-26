package com.takealook.db.repository;

import com.takealook.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findBySeq(Long seq);
    Member findByMemberId(String memberId);
    Member findByNickname(String nickname);
    Member findByEmail(String email);
    void deleteByMemberId(String memberId);
    Member findByMemberNameAndPhone(String memberName, String Phone);

//    @Transactional // update, delete 필수
//    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
//    @Query("UPDATE Member SET score = :score WHERE seq = :seq")
//    int updateMemberScore(Long seq, int score);
}
