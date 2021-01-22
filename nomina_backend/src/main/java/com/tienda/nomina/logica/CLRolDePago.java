package com.tienda.nomina.logica;

public class CLRolDePago {
	
	private String cedulaPersonal;
	private Double decimo;
	private Double horasExtras;
	private Double bono;
	private Double anticipo;
	
	public CLRolDePago(Double decimo, Double horasExtras, Double bono) {
		super();
		this.decimo = decimo;
		this.horasExtras = horasExtras;
		this.bono = bono;
	}
	
	public Double CalculoRoldePago() {
		Double respuesta = 0.0;
		respuesta=this.decimo+this.horasExtras+this.bono-this.anticipo;
		return respuesta;
	}
}
