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
@Document (collection = "rolDePago")
public class RolDePago {
	
	@Id
	private String idPago;
	//private String cedula; 
	@Field 
	private String fechaRolDePago;
	
	@Field 
	private Double sueldo;
	@Field 
	private int horasExtras50;
	@Field 
	private Integer diasLaborados;
	@Field 
	private Integer horasExtras100; 
	@Field 
	private Double bono;
	@Field 
	private Double anticipo;
	@Field 
	private Double descuento;
	@Field 
	private Double multa;
	@Field 
	private Double comision;
	@Field 
	private Double totalAnual=0.0;
	
	public Double SueldoGanado(Double sueldo, Integer diasLaborados) {
		Double totalSueldoGanado=0.0;
		if((diasLaborados>0)&&(sueldo>0)) {
			totalSueldoGanado=(sueldo/30)*diasLaborados;
		}
		return totalSueldoGanado;
	}
	
	
	public Double TotalHorasExtras(Integer horasExtras50, Integer horasExtras100) {
		Double totalHorasExtra=0.0;
		if((horasExtras50>=0)&&(horasExtras100>=0)) {
			totalHorasExtra=(horasExtras50*1.5)+(horasExtras100*2);
		}
		return totalHorasExtra;
	}
	
	public Double DecimoTercero() {
		Double respuesta = 0.0;
		respuesta = (double) (400/12);
		return respuesta;		
	}
	
	
	public Double ValorHorasExtras(Double sueldo, Integer horasExtras50, Integer horasExtras100) {
		Double valorHorasExtra=0.0;
		if(sueldo>=0) {
			valorHorasExtra=((sueldo/30)/8)*TotalHorasExtras(horasExtras50, horasExtras100);
		}
		return valorHorasExtra;
	}
	
	public Double TotalIngresos(Double sueldo, Integer diasLaborados, Integer horasExtras50, 
								Integer horasExtras100, Double comision, Double bono) {
		Double totalIngresos=0.0;
		if((comision>=0)&&(bono>=0)) {
			totalIngresos=SueldoGanado(sueldo,diasLaborados)+ValorHorasExtras(sueldo,horasExtras50, horasExtras100)+comision+DecimoTercero()+bono;
		}
		
		return totalIngresos;
	}
	
	public Double TotalDescuentos(Double anticipo, Double multa, Double sueldo, Double descuento){
		Double totalDescuentos=0.0;
		if((anticipo>=0)&&(descuento>=0)&&(multa>=0)&&(anticipo<sueldo)&&(descuento<sueldo)&&(multa<sueldo)) {
			totalDescuentos=anticipo+descuento+multa;
		}
		return totalDescuentos;
	}
	
	
	public Double TotalDelMes(Double sueldo, Integer diasLaborados, Integer horasExtras50, 
							  Double anticipo, Double multa, Integer horasExtras100, 
							  Double comision, Double bono, Double descuento) {
		Double respuesta = 0.0;
		respuesta=TotalIngresos(sueldo,diasLaborados,horasExtras50, horasExtras100, comision, bono)-TotalDescuentos(anticipo, multa, sueldo, descuento);
		return respuesta;
	}
	
	public Double DecimoCuarto(){
		Double respuesta = 0.0;
		if(this.totalAnual>0) {
			respuesta = (this.totalAnual/12);
		}	
		return respuesta;
	}
	
	
	
}
