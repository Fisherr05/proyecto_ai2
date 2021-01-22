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
