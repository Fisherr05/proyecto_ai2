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
package com.tienda.nomina.controller;

import com.tienda.nomina.exception.RecordNotFoundException;
import com.tienda.nomina.model.Anticipo;
import com.tienda.nomina.model.RolDePago;
import com.tienda.nomina.service.RolDePagoService;

import org.springframework.web.bind.annotation.RestController;
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
@RequestMapping("/nomina")
public class RolDePagoController {
	@Autowired
	RolDePagoService service;
	
	@GetMapping("/rolDePago")
	public ResponseEntity<List<RolDePago>> getAll() {
		List<RolDePago> list = service.getAll();
		return new ResponseEntity<List<RolDePago>>(list, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/rolDePago/{id}")
	public ResponseEntity<RolDePago> getRolDePagoByIdPago(@PathVariable("id") String idPago) throws RecordNotFoundException {
		RolDePago entity = service.findByIdPago(idPago);
		return new ResponseEntity<RolDePago>(entity, new HttpHeaders(), HttpStatus.OK);
	}
	
	/*@GetMapping("/rolDePago/{cedula}")
	public ResponseEntity<List<RolD9ePago>> getRolDePagoByCedulaPersonal(@PathVariable("cedula") String cedulaPersonal) throws RecordNotFoundException {
		List<RolDePago> entity = service.findByCedulaPersonal(cedulaPersonal);
		return new ResponseEntity<List<RolDePago>>(entity, new HttpHeaders(), HttpStatus.OK);
	}

*/

	@PostMapping("/rolDePago")
	public ResponseEntity<RolDePago> createRolDePago(@RequestBody RolDePago rolDePago) throws RecordNotFoundException{
		service.createRolDePago(rolDePago);
		return new ResponseEntity<RolDePago>(rolDePago, new HttpHeaders(), HttpStatus.OK);
	}
	
	/*@GetMapping("/rolDePagoTotal/{id}")
	public Double calcularRolPago(@PathVariable("id") String cedulaPersonal) throws RecordNotFoundException {
		Double pagoTotal = service.calcularRolPago(cedulaPersonal);
		return (pagoTotal);
	}*/

	@PutMapping("/rolDePago")
	public ResponseEntity<RolDePago> updateRolDePago(@RequestBody RolDePago rolDePago) throws RecordNotFoundException{
		service.updateRolDePago(rolDePago);
		return new ResponseEntity<RolDePago>(rolDePago, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/rolDePago/{id}")
	public HttpStatus deleteRolDePagoByIdPago(@PathVariable("id") String idPago) throws RecordNotFoundException {
		service.deleteRolDePagoByIdPago(idPago);
		return HttpStatus.OK;
	}
}				
