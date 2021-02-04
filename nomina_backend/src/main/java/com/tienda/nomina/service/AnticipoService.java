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
import com.tienda.nomina.repository.AnticipoRepository;
import com.tienda.nomina.repository.RolDePagoRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AnticipoService {

	@Autowired
	AnticipoRepository repo;
	
	@Autowired
	RolDePagoRepository rol;

	public List<Anticipo> getAll(){
		List<Anticipo> anticipoList = repo.findAll();
		if(anticipoList.size() > 0) {
			return anticipoList;
		} else {
			return new ArrayList<Anticipo>();
		}
	}
     		
	public Anticipo findByIdAnticipo(String idAnticipo) throws RecordNotFoundException{
		Optional<Anticipo> anticipo = repo.findByIdAnticipo(idAnticipo);
		if(anticipo.isPresent()) {
			return anticipo.get();
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public Anticipo createAnticipo(Anticipo anticipo){
		return repo.save(anticipo);
	}

	public Anticipo updateAnticipo(Anticipo anticipo) throws RecordNotFoundException {
		Optional<Anticipo> anticipoTemp = repo.findByIdAnticipo(anticipo.getIdAnticipo());
	
		if(anticipoTemp.isPresent()){
			return repo.save(anticipo);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public void deleteAnticipoByIdAnticipo(String idAnticipo) throws RecordNotFoundException{
		Optional<Anticipo> anticipo = repo.findByIdAnticipo(idAnticipo);
		if(anticipo.isPresent()) {
		repo.deleteByIdAnticipo(idAnticipo);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}	
	
	public Double total(String idAnticipo, String idPersonal) {
		
		Optional<RolDePago> rolpago = rol.findByIdPago(idPersonal);
		Optional<Anticipo> anticipo = repo.findByIdAnticipo(idAnticipo);
		
		return anticipo.get().ValorTotal(rolpago.get().getSueldo());
	}
	
	
	
}
