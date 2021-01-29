																/*
 -------------------------------------------------------------------
|
| CRUDyLeaf	- A Domain Specific Language for generating Spring Boot 
|			REST resources from entity CRUD operations.
| Author: Omar S. G�mez (2020)
| File Date: Fri Jan 22 00:02:00 ECT 2021
| 
 -------------------------------------------------------------------
																*/
package com.tienda.nomina.pagar;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document (collection = "Calculo")
public class TotalPago {
	@Id
	private String cedulaPersonal;
	
	@Field
	private Integer diasLaborados;
	
	@Field
	private Double horasExtras50;
	
	@Field
	private Double horasExtras100;
	
	@Field
	private Double bono;
	
	@Field
	private Double descuento;
	
	@Field
	private Double multas;
	
	@Field
	private Double prestamo;
	
}
