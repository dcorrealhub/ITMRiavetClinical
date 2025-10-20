package com.riavet.telemedicinaservice.infrastructure.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Telemedicina Service API")
                        .version("1.0.0")
                        .description("API REST para gestión de sesiones de telemedicina del sistema RIAVET")
                        .contact(new Contact()
                                .name("RIAVET Development Team")
                                .email("dev@riavet.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8086")
                                .description("Servidor de desarrollo local"),
                        new Server()
                                .url("https://api.riavet.com")
                                .description("Servidor de producción")
                ));
    }
}
