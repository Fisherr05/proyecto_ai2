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
import com.tienda.nomina.model.Personal;
import com.tienda.nomina.repository.PersonalRepository;


import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonalService {

	@Autowired
	PersonalRepository repo;

	public List<Personal> getAll(){
		List<Personal> personalList = repo.findAll();
		if(personalList.size() > 0) {
			return personalList;
		} else {
			return new ArrayList<Personal>();
		}
	}
     		
	public Personal findByCedulaPersonal(String cedulaPersonal) throws RecordNotFoundException{
		Optional<Personal> personal = repo.findByCedulaPersonal(cedulaPersonal);
		if(personal.isPresent()) {
			return personal.get();
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public Personal createPersonal(Personal personal){
		return repo.save(personal);
	}

	public Personal updatePersonal(Personal personal) throws RecordNotFoundException {
		Optional<Personal> personalTemp = repo.findByCedulaPersonal(personal.getCedulaPersonal());
	
		if(personalTemp.isPresent()){
			return repo.save(personal);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}

	public void deletePersonalByCedulaPersonal(String cedulaPersonal) throws RecordNotFoundException{
		Optional<Personal> personal = repo.findByCedulaPersonal(cedulaPersonal);
		if(personal.isPresent()) {
		repo.deleteByCedulaPersonal(cedulaPersonal);
		} else {
			throw new RecordNotFoundException("Record does not exist for the given Id");
		}
	}		

}
