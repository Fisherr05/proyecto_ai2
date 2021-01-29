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
import com.tienda.nomina.model.Anticipo;
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
	AnticipoService Ant;

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
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public RolDePago createRolDePago(RolDePago rolDePago) throws RecordNotFoundException{
		//List<Anticipo> Anticipo = Ant.findByCedulaPersonal(cedulaPersonal);
		
		return repo.save(rolDePago);
	}

	public RolDePago updateRolDePago(RolDePago rolDePago) throws RecordNotFoundException {
		Optional<RolDePago> rolDePagoTemp = repo.findByIdPago(rolDePago.getIdPago());
	
		if(rolDePagoTemp.isPresent()){
			return repo.save(rolDePago);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}
	
	
	public List <RolDePago> findByCedulaPersonal(String cedulaPersonal) throws RecordNotFoundException{
		List<RolDePago> rol = repo.findByCedulaPersonal(cedulaPersonal);
		if(rol.size() > 0) {
			return rol;
		} else {
			return new ArrayList<RolDePago>();
		}
	}
	

	
	
	/*public Double calcularRolPago(String cedula) throws RecordNotFoundException  {
		
		List<RolDePago> rol = repo.findByCedulaPersonal(cedula);
		
		Double sueldo=0.0;
		Double bono=0.0;
		Double decimo=0.0;
		Double horasExtras=0.0;
		
		for (int i=0; i<rol.size(); i++) {

			sueldo = rol.get(i).getSueldo();
			bono = 120.0;
			decimo = sueldo;
			horasExtras = rol.get(i).getHorasExtras()* 5.0;
			
		}
		
		return sueldo+bono+decimo+horasExtras;
		
	}*/

	public void deleteRolDePagoByIdPago(String idPago) throws RecordNotFoundException{
		Optional<RolDePago> rolDePago = repo.findByIdPago(idPago);
		if(rolDePago.isPresent()) {
		repo.deleteByIdPago(idPago);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}		

}
