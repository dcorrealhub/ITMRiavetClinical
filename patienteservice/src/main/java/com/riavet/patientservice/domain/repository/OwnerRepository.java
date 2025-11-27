package com.riavet.patientservice.domain.repository;

import com.riavet.patientservice.domain.model.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Repository interface for Owner entity operations.
 */
@Repository
public interface OwnerRepository extends JpaRepository<Owner, UUID> {

    /**
     * Search owners by name or email.
     * 
     * @param search Search term
     * @return List of matching owners
     */
    @Query("SELECT o FROM Owner o WHERE " +
           "LOWER(o.fullName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(o.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Owner> searchOwners(@Param("search") String search);

    /**
     * Check if an owner exists with the given email.
     * 
     * @param email Email address
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
}
