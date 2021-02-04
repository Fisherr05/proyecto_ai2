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
import org.springframework.data.mongodb.core.mapping.Field;




import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document (collection = "personal")
public class Personal {
	
	@Id
	private String cedulaPersonal;
	
	@Field
	private String nombrePersonal;
	@Field
	private String apellidoPersonal;
	@Field
	private String fechaIngreso;
	@Field
	private String fechaSalida;
	@Field
	private String direccion;
	@Field
	private String telefono;
	
}
