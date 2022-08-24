package com.takealook.db.repository;

import com.takealook.db.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByMemberSeq(Long memberSeq);
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
