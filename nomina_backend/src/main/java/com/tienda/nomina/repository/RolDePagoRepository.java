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

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tienda.nomina.model.RolDePago;

import java.util.Optional;

@Repository
public interface RolDePagoRepository extends MongoRepository<RolDePago, String> {

	Optional <RolDePago> findByIdPago(String idPago);
	
	void deleteByIdPago(String idPago);
	
}
