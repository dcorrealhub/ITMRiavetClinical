package com.riavet.patientservice.application.mapper;

import com.riavet.patientservice.application.dto.PatientCreateRequest;
import com.riavet.patientservice.domain.model.Patient;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-19T19:42:36-0500",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.4.jar, environment: Java 17.0.16 (Homebrew)"
)
@Component
public class PatientMapperImpl implements PatientMapper {

    @Override
    public Patient toEntity(PatientCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Patient.PatientBuilder patient = Patient.builder();

        patient.name( request.getName() );
        patient.species( request.getSpecies() );
        patient.breed( request.getBreed() );
        patient.birthDate( request.getBirthDate() );
        patient.ownerId( request.getOwnerId() );

        return patient.build();
    }
}
