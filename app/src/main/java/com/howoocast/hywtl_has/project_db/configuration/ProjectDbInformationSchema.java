package com.howoocast.hywtl_has.project_db.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import java.util.Map;

@Data
@Configuration
@PropertySource(value = "classpath:project-db-information-schema.yml", factory = YamlPropertySourceFactory.class)
@ConfigurationProperties(prefix = "project-db")
public class ProjectDbInformationSchema {
    private Map<String, InformationSchema> entities;

    @Data
    public static class InformationSchema {
        private String type;
        private String description;
        private Map<String /* attr. name */, Map<String, Object>> attributes;
    }

}
