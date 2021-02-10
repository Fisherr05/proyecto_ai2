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
package com.tienda.nomina.service;

import com.tienda.nomina.exception.RecordNotFoundException;
//import com.tienda.nomina.model.Anticipo;
import com.tienda.nomina.model.RolDePago;
import com.tienda.nomina.repository.RolDePagoRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RolDePagoService {

	@Autowired
	RolDePagoRepository repo;

	public List<RolDePago> getAll(){
		List<RolDePago> rolDePagoList = repo.findAll();
		if(rolDePagoList.size() > 0) {
			return rolDePagoList;
		} else {
			return new ArrayList<RolDePago>();
		}
	}
     		
	public RolDePago findByIdPago(String idPago) throws RecordNotFoundException{
		Optional<RolDePago> rolDePago = repo.findByIdPago(idPago);
		if(rolDePago.isPresent()) {
			return rolDePago.get();
		} else {
			throw new RecordNotFoundException(" does not exist for the given Id");
		}
	}

	public RolDePago createRolDePago(RolDePago rolDePago){
		return repo.save(rolDePago);
	}

	public RolDePago updateRolDePago(RolDePago rolDePago) throws RecordNotFoundException {
		Optional<RolDePago> rolDePagoTemp = repo.findByIdPago(rolDePago.getIdPago());
	
		if(rolDePagoTemp.isPresent()){
			return repo.save(rolDePago);
		} else {
			throw new RecordNotFoundException(" does not exist for the given Id");
		}
	}

	public void deleteRolDePagoByIdPago(String idPago) throws RecordNotFoundException{
		Optional<RolDePago> rolDePago = repo.findByIdPago(idPago);
		if(rolDePago.isPresent()) {
		repo.deleteByIdPago(idPago);
		} else {
			throw new RecordNotFoundException(" does not exist for the given Id");
		}
	}	
	
	
    public Double sueldo(String idPago) throws RecordNotFoundException {
		
		Optional<RolDePago> rolpago = repo.findByIdPago(idPago);
		if(rolpago.isPresent()) {
			return rolpago.get().SueldoGanado(rolpago.get().getSueldo(), rolpago.get().getDiasLaborados());
		} else {
			throw new RecordNotFoundException(" does not exist for the given Id");
		}
	}
	
    
    public Double horasExtras50(String idPago) throws RecordNotFoundException {
		
		Optional<RolDePago> rolpago = repo.findByIdPago(idPago);
		if (rolpago.isPresent()) {
			return rolpago.get().TotalHorasExtras(rolpago.get().getHorasExtras50(),rolpago.get().getHorasExtras100());
		}else {
			throw new RecordNotFoundException(" does not exist for the given Id");
		}
	}
    
    public Double totalAnual(String idPago) throws RecordNotFoundException {
		
		Optional<RolDePago> rolpago = repo.findByIdPago(idPago);
		
		if (rolpago.isPresent()) {
			Double sueldo=rolpago.get().getSueldo();
			Integer diasLaborados=rolpago.get().getDiasLaborados();
			Integer horasExtras50=rolpago.get().getHorasExtras50();
			Integer horasExtras100=rolpago.get().getHorasExtras100();
			Double comision = rolpago.get().getComision();
			Double bono = rolpago.get().getBono();
			
			return rolpago.get().TotalIngresos(sueldo,diasLaborados , horasExtras50, horasExtras100,comision,bono );
		}else {
			throw new RecordNotFoundException(" does not exist for the given Id");
		}
		
		
	}
    
    
    public Double multa(String idPago) {
		
  		Optional<RolDePago> rolpago = repo.findByIdPago(idPago);
  		
  		Double anticipo=rolpago.get().getAnticipo();
  		Double multa = rolpago.get().getMulta();
  		Double descuento = rolpago.get().getDescuento();
  		Double sueldo = rolpago.get().getSueldo();
  		
  		return rolpago.get().TotalDescuentos(anticipo, multa, sueldo, descuento);
  	}
    
    public Double bono(String idPago) {
		
		Optional<RolDePago> rolpago = repo.findByIdPago(idPago);
		
		Double sueldo=rolpago.get().getSueldo();
		Integer diasLaborados=rolpago.get().getDiasLaborados();
		Integer horasExtras50=rolpago.get().getHorasExtras50();
		Double anticipo=rolpago.get().getAnticipo();
		Double multa = rolpago.get().getMulta();
		Integer horasExtras100=rolpago.get().getHorasExtras100();
		Double comision = rolpago.get().getComision();
		Double bono = rolpago.get().getBono();
		Double descuento = rolpago.get().getDescuento();
		
		return rolpago.get().TotalDelMes(sueldo,diasLaborados , horasExtras50,anticipo,multa, horasExtras100,comision,bono,descuento);
	}
    
}
