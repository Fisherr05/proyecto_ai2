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

import lombok.Data;
@Data
@Document (collection = "anticipo")
public class Anticipo {
	
	@Id
	private String idAnticipo;
	
	@Field
	private String fechaAnticipo;
	
	@Field
	private Double valorAnticipo;

	
}
