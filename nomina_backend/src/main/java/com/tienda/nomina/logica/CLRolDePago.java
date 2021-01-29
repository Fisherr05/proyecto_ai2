package com.tienda.nomina.logica;

public class CLRolDePago {
	private Integer diasLaborados;
	private Double decimo;
	private Integer horasExtras50;
	private Integer horasExtras100; 
	private Double bono;
	private Double anticipo;
	private Double descuento;
	private Double salario;
	private Double comision;
	
	public CLRolDePago(Double decimo, Integer horasExtras50 ,Integer horasExtras100, Double bono, Double anticipo, Double descuento, Double salario, Double comision) {
		super();
		this.decimo = decimo;
		this.horasExtras50 = horasExtras50;
		this.horasExtras100 = horasExtras100;
		this.bono = bono;
		this.anticipo = anticipo;
		this.descuento = descuento;
		this.salario = salario;
	}
	public Double SueldoGanado() {
		Double totalSueldoGanado=0.0;
		if((this.diasLaborados>0)&&(this.salario>0)) {
			totalSueldoGanado=(this.salario/30)*this.diasLaborados;
		}
		return totalSueldoGanado;
	}
	public Double TotalHorasExtras() {
		Double totalHorasExtra=0.0;
		if((this.horasExtras50>=0)&&(this.horasExtras100>=0)) {
			totalHorasExtra=(this.horasExtras50*1.5)+(this.horasExtras100*2);
		}
		return totalHorasExtra;
	}
	
	public Double ValorHorasExtras() {
		Double valorHorasExtra=0.0;
		valorHorasExtra=((this.salario/30)/8)*TotalHorasExtras();
		return valorHorasExtra;
	}
	
	public Double TotalIngresos() {
		Double totalIngresos=0.0;
		totalIngresos=SueldoGanado()+ValorHorasExtras()+comision;
		return totalIngresos;
	}
	
	public Double TotalDescuentos() {
		Double totalDescuentos=0.0;
		if((this.anticipo<this.salario)&&(this.descuento<this.salario)) {
			totalDescuentos=this.anticipo+this.descuento;
		}
		return totalDescuentos;
	}
	public Double TotalDelMes() {
		Double respuesta = 0.0;
		if(this.descuento<=this.salario) {
			respuesta=TotalIngresos()-TotalDescuentos();
		}	
		return respuesta;
	}
	
	
}
