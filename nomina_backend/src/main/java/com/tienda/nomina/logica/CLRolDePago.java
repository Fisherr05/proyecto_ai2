package com.tienda.nomina.logica;

public class CLRolDePago {
	private Integer diasLaborados;
	private Integer horasExtras50;
	private Integer horasExtras100; 
	private Double bono;
	private Double anticipo;
	private Double descuento;
	private Double multa;
	private Double salario;
	private Double comision;
	private Double totalAnual=0.0;
	
	
	public CLRolDePago(Integer diasLaborados, Integer horasExtras50, Integer horasExtras100, Double bono,
			Double anticipo, Double descuento, Double multa, Double salario, Double comision) {
		super();
		this.diasLaborados = diasLaborados;
		this.horasExtras50 = horasExtras50;
		this.horasExtras100 = horasExtras100;
		this.bono = bono;
		this.anticipo = anticipo;
		this.descuento = descuento;
		this.multa = multa;
		this.salario = salario;
		this.comision = comision;
	}
	public CLRolDePago(Integer diasLaborados, Integer horasExtras50, Integer horasExtras100, Double bono,
			Double anticipo, Double descuento, Double multa, Double salario, Double comision, Double totalAnual) {
		super();
		this.diasLaborados = diasLaborados;
		this.horasExtras50 = horasExtras50;
		this.horasExtras100 = horasExtras100;
		this.bono = bono;
		this.anticipo = anticipo;
		this.descuento = descuento;
		this.multa = multa;
		this.salario = salario;
		this.comision = comision;
		this.totalAnual = totalAnual;
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
	
	public Double DecimoTercero() {
		Double respuesta = 0.0;
		respuesta = (double) (400/12);
		return respuesta;		
	}
	
	
	public Double ValorHorasExtras() {
		Double valorHorasExtra=0.0;
		if(this.salario>=0) {
			valorHorasExtra=((this.salario/30)/8)*TotalHorasExtras();
		}
		return valorHorasExtra;
	}
	
	public Double TotalIngresos() {
		Double totalIngresos=0.0;
		if((this.comision>=0)&&(this.bono>=0)) {
			totalIngresos=SueldoGanado()+ValorHorasExtras()+this.comision+DecimoTercero()+this.bono;
		}
		
		return totalIngresos;
	}
	
	public Double TotalDescuentos() {
		Double totalDescuentos=0.0;
		if((this.anticipo>=0)&&(this.descuento>=0)&&(this.multa>=0)&&(this.anticipo<this.salario)&&(this.descuento<this.salario)&&(this.multa<this.salario)) {
			totalDescuentos=this.anticipo+this.descuento+this.multa;
		}
		return totalDescuentos;
	}
	public Double TotalDelMes() {
		Double respuesta = 0.0;
		respuesta=TotalIngresos()-TotalDescuentos();
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
