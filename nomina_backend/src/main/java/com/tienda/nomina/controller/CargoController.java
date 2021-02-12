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
import com.tienda.nomina.model.Cargo;
import com.tienda.nomina.service.CargoService;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

@CrossOrigin(origins= {"*"})
@RestController
@RequestMapping("/nomina")
public class CargoController {
	@Autowired
	CargoService service;
	
	@GetMapping("/cargo")
	public ResponseEntity<List<Cargo>> getAll() {
		List<Cargo> list = service.getAll();
		return new ResponseEntity<List<Cargo>>(list, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/cargo/{id}")
	public ResponseEntity<Cargo> getCargoByIdCargo(@PathVariable("id") String idCargo) throws RecordNotFoundException {
		Cargo entity = service.findByIdCargo(idCargo);
		return new ResponseEntity<Cargo>(entity, new HttpHeaders(), HttpStatus.OK);
	}



	@PostMapping("/cargo")
	public ResponseEntity<Cargo> createCargo(@RequestBody Cargo cargo){
		service.createCargo(cargo);
		return new ResponseEntity<Cargo>(cargo, new HttpHeaders(), HttpStatus.OK);
	}

	@PutMapping("/cargo")
	public ResponseEntity<Cargo> updateCargo(@RequestBody Cargo cargo) throws RecordNotFoundException{
		service.updateCargo(cargo);
		return new ResponseEntity<Cargo>(cargo, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/cargo/{id}")
	public HttpStatus deleteCargoByIdCargo(@PathVariable("id") String idCargo) throws RecordNotFoundException {
		service.deleteCargoByIdCargo(idCargo);
		return HttpStatus.OK;
	}
}				
