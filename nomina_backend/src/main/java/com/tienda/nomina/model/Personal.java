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

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Document (collection = "personal")
public class Personal {
	
	@Id
	private String cedulaPersonal;
	
	@Field
	private String nombrePersonal;
	
	@Field
	private String apellidoPersonal;
	
	@Field
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private Date fechaIngreso = new Date();
	
	@Field
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private Date fechaSalida = new Date();
	
	@Field
	private String direccion;
	
	@Field
	private String telefono;
	
}
