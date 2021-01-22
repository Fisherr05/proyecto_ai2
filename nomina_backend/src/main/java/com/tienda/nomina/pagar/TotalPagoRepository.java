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

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tienda.nomina.pagar.TotalPago;

import java.util.Optional;

@Repository
public interface TotalPagoRepository extends MongoRepository<TotalPago, String> {

	Optional <TotalPago> findByCedulaPersonal(String cedulaPersonal);
	
	void deleteByCedulaPersonal(String cedulaPersonal);
	
}
