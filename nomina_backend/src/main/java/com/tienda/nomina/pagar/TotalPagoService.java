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

import org.springframework.stereotype.Service;

import com.tienda.nomina.logica.CLRolDePago;
import com.tienda.nomina.pagar.RecordNotFoundException;
import com.tienda.nomina.pagar.TotalPago;
import com.tienda.nomina.pagar.TotalPagoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TotalPagoService {

	@Autowired
	TotalPagoRepository repo;

	public List<TotalPago> getAll(){
		List<TotalPago> totalPagoList = repo.findAll();
		if(totalPagoList.size() > 0) {
			return totalPagoList;
		} else {
			return new ArrayList<TotalPago>();
		}
	}
     		
	public TotalPago findByCedulaPersonal(String cedulaPersonal) throws RecordNotFoundException{
		Optional<TotalPago> totalPago = repo.findByCedulaPersonal(cedulaPersonal);
		if(totalPago.isPresent()) {
			return totalPago.get();
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public TotalPago createTotalPago(TotalPago totalPago){
		
		/*Aquí quiero intereactuar con dos tablas, con la de personal para verificar que existe alguién con esa cédula
		  y tomar su fecha ingreso para compararla con la actual y verificar si recibe el decimo cuarto sueldo.
		  También se traen los datos de anticipos de una persona según su número de cédula, verificar los anticipos hechos en el mes que se va a realizar el
		  Rol de pago.
		  Los datos que se obtienen este servicio se los ingresa en el contructor de la clase que tiene las funciones con los cálculos
		  A través de los métodos de esta clase que retornan valores, éstos valores se guardaran en la tabla Rol de Pagos
		 */
		/*
		CLRolDePago rolDePago;
		if(meses>=12) {
			CLRolDePago rolDePago= new CLRolDePago(totalPago.getDiasLaborados(),totalPago.getHorasExtras50(),totalPago.getHorasExtras100(),
					totalPago.getBono(),(----Anticipo----), totalPago.getDescuento(),totalPago.getMultas(),(----Salario----),(----comision----), (----totalAnual----) );
		}else {
			CLRolDePago rolDePago= new CLRolDePago(totalPago.getDiasLaborados(),totalPago.getHorasExtras50(),totalPago.getHorasExtras100(),
					totalPago.getBono(),(----Anticipo----), totalPago.getDescuento(),totalPago.getMultas(),(----Salario----),(----comision----) );
		}
		rolDePago.TotalDelMes();
		*/
		return repo.save(totalPago);
	}

	public TotalPago updateTotalPago(TotalPago totalPago) throws RecordNotFoundException {
		Optional<TotalPago> totalPagoTemp = repo.findByCedulaPersonal(totalPago.getCedulaPersonal());
	
		if(totalPagoTemp.isPresent()){
			return repo.save(totalPago);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public void deleteTotalPagoByCedulaPersonal(String cedulaPersonal) throws RecordNotFoundException{
		Optional<TotalPago> totalPago = repo.findByCedulaPersonal(cedulaPersonal);
		if(totalPago.isPresent()) {
		repo.deleteByCedulaPersonal(cedulaPersonal);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}		

}
