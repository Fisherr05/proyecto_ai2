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

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@Document (collection = "anticipo")
public class Anticipo {
	
	@Id
	private String idAnticipo;
	
	private String fechaAnticipo;
	private Double valorAnticipo;
	private Double total;

	public Double getTotal(){
		return total*100; 
	}
	
	public Double ValorTotal(Double valor) {
		return valor*100; 
	}
	
}
