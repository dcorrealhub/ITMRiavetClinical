package com.riavet.patientservice.infrastructure.exception;

/**
 * Exception thrown when an owner is not found.
 */
public class OwnerNotFoundException extends RuntimeException {

    public OwnerNotFoundException(String message) {
        super(message);
    }

    public OwnerNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
