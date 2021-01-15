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
package com.tienda.nomina.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tienda.nomina.model.Anticipo;


@Repository
public interface AnticipoRepository extends MongoRepository<Anticipo, String> {

	Optional <Anticipo> findByIdAnticipo(String idAnticipo);
	
	void deleteByIdAnticipo(String idAnticipo);
	
}
