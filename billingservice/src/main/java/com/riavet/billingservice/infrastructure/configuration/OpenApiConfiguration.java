package com.riavet.billingservice.infrastructure.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Billing Service API")
                        .version("1.0.0")
                        .description("Microservicio de facturación para el sistema RIAVET")
                        .contact(new Contact()
                                .name("RIAVET Team")
                                .email("support@riavet.com")));
    }
}
