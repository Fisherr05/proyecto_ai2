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

import org.springframework.web.bind.annotation.RestController;

import com.tienda.nomina.pagar.RecordNotFoundException;
import com.tienda.nomina.pagar.TotalPago;
import com.tienda.nomina.pagar.TotalPagoService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;	
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
@RestController
@RequestMapping("/api/calculo")
public class TotalPagoController {
	@Autowired
	TotalPagoService service;
	
	@GetMapping("/totalPago")
	public ResponseEntity<List<TotalPago>> getAll() {
		List<TotalPago> list = service.getAll();
		return new ResponseEntity<List<TotalPago>>(list, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/totalPago/{id}")
	public ResponseEntity<TotalPago> getTotalPagoByCedulaPersonal(@PathVariable("id") String cedulaPersonal) throws RecordNotFoundException {
		TotalPago entity = service.findByCedulaPersonal(cedulaPersonal);
		return new ResponseEntity<TotalPago>(entity, new HttpHeaders(), HttpStatus.OK);
	}



	@PostMapping("/totalPago")
	public ResponseEntity<TotalPago> createTotalPago(@RequestBody TotalPago totalPago){
		service.createTotalPago(totalPago);
		return new ResponseEntity<TotalPago>(totalPago, new HttpHeaders(), HttpStatus.OK);
	}
/*
	@PutMapping("/totalPago")
	public ResponseEntity<TotalPago> updateTotalPago(@RequestBody TotalPago totalPago) throws RecordNotFoundException{
		service.updateTotalPago(totalPago);
		return new ResponseEntity<TotalPago>(totalPago, new HttpHeaders(), HttpStatus.OK);
	}
*/
	/*
	@DeleteMapping("/totalPago/{id}")
	public HttpStatus deleteTotalPagoByCedulaPersonal(@PathVariable("id") String cedulaPersonal) throws RecordNotFoundException {
		service.deleteTotalPagoByCedulaPersonal(cedulaPersonal);
		return HttpStatus.OK;
	}*/
}				
