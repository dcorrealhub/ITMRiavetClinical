package com.riavet.dianservice.domain.repository;

import com.riavet.dianservice.domain.model.DianInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface DianInvoiceRepository extends JpaRepository<DianInvoice, UUID> {
    
    Optional<DianInvoice> findByInvoiceId(UUID invoiceId);
    
    boolean existsByInvoiceId(UUID invoiceId);
}
