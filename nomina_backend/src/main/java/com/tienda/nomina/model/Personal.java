																/*
 -------------------------------------------------------------------
|
| CRUDyLeaf	- A Domain Specific Language for generating Spring Boot 
|			REST resources from entity CRUD operations.
| Author: Omar S. Gómez (2020)
| File Date: Thu Jan 14 19:34:36 ECT 2021
| 
 -------------------------------------------------------------------
																*/
package com.tienda.nomina.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document (collection = "personal")
public class Personal {
	
	@Id
	private String cedulaPersonal;
	
	private String nombrePersonal;
	private String apellidoPersonal;
	private String fechaIngreso;
	private String fechaSalida;
	private String direccion;
	private String telefono;
	
}
