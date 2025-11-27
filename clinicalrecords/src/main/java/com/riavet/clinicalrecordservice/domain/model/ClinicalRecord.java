package com.riavet.clinicalrecordservice.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "clinical_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalRecord {

    @Id
    private String id;

    @Field("patient_id")
    private String patientId;

    @Field("veterinarian_id")
    private String veterinarianId;

    @Field("diagnosis")
    private String diagnosis;

    @Field("procedures")
    private String procedures;

    @Field("attachments")
    private String attachments;

    @CreatedDate
    @Field("created_at")
    private LocalDateTime createdAt;

    // Nuevos campos específicos para órdenes médicas
    @Field("medical_orders")
    private String medicalOrders;

    @Field("prescription")
    private String prescription;

    @Field("follow_up_date")
    private LocalDateTime followUpDate;

    @Field("status")
    @Builder.Default
    private String status = "ACTIVE";
}
