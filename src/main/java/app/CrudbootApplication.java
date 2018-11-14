package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"app"})
public class CrudbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudbootApplication.class, args);

    }
}
