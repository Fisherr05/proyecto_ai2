package com.tienda.nomina;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NominaApplication {

	public static void main(String[] args) {
		SpringApplication.run(NominaApplication.class, args);
		System.out.println("Active resources for Anticipo entity");
		System.out.println("GET");
		System.out.println("/nomina/anticipo");
		System.out.println("/nomina/anticipo/{id}");
		System.out.println("POST");
		System.out.println("/nomina/anticipo");
		System.out.println("PUT");
		System.out.println("/nomina/anticipo");
		System.out.println("DELETE");
		System.out.println("/nomina/anticipo/{id}");
		System.out.println("Active resources for RolDePago entity");
		System.out.println("GET");
		System.out.println("/nomina/rolDePago");
		System.out.println("/nomina/rolDePago/{id}");
		System.out.println("POST");
		System.out.println("/nomina/rolDePago");
		System.out.println("PUT");
		System.out.println("/nomina/rolDePago");
		System.out.println("DELETE");
		System.out.println("/nomina/rolDePago/{id}");
		System.out.println("Active resources for Personal entity");
		System.out.println("GET");
		System.out.println("/nomina/personal");
		System.out.println("/nomina/personal/{id}");
		System.out.println("POST");
		System.out.println("/nomina/personal");
		System.out.println("PUT");
		System.out.println("/nomina/personal");
		System.out.println("DELETE");
		System.out.println("/nomina/personal/{id}");
		System.out.println("Active resources for Cargo entity");
		System.out.println("GET");
		System.out.println("/nomina/cargo");
		System.out.println("/nomina/cargo/{id}");
		System.out.println("POST");
		System.out.println("/nomina/cargo");
		System.out.println("PUT");
		System.out.println("/nomina/cargo");
		System.out.println("DELETE");
		System.out.println("/nomina/cargo/{id}");
	}
	
	@PostConstruct
	public void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("America/Guayaquil"));
	}	

}
