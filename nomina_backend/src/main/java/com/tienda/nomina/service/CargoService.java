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
import com.tienda.nomina.model.Cargo;
import com.tienda.nomina.repository.CargoRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CargoService {

	@Autowired
	CargoRepository repo;

	public List<Cargo> getAll(){
		List<Cargo> cargoList = repo.findAll();
		if(cargoList.size() > 0) {
			return cargoList;
		} else {
			return new ArrayList<Cargo>();
		}
	}
     		
	public Cargo findByIdCargo(String idCargo) throws RecordNotFoundException{
		Optional<Cargo> cargo = repo.findByIdCargo(idCargo);
		if(cargo.isPresent()) {
			return cargo.get();
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public Cargo createCargo(Cargo cargo){
		return repo.save(cargo);
	}

	public Cargo updateCargo(Cargo cargo) throws RecordNotFoundException {
		Optional<Cargo> cargoTemp = repo.findByIdCargo(cargo.getIdCargo());
	
		if(cargoTemp.isPresent()){
			return repo.save(cargo);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public void deleteCargoByIdCargo(String idCargo) throws RecordNotFoundException{
		Optional<Cargo> cargo = repo.findByIdCargo(idCargo);
		if(cargo.isPresent()) {
		repo.deleteByIdCargo(idCargo);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}		

}
