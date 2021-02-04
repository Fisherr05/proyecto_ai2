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
import com.tienda.nomina.service.AnticipoService;

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
public class AnticipoController {
	@Autowired
	AnticipoService service;
	
	@GetMapping("/anticipo")
	public ResponseEntity<List<Anticipo>> getAll() {
		List<Anticipo> list = service.getAll();
		return new ResponseEntity<List<Anticipo>>(list, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/anticipo/{id}")
	public ResponseEntity<Anticipo> getAnticipoByIdAnticipo(@PathVariable("id") String idAnticipo) throws RecordNotFoundException {
		Anticipo entity = service.findByIdAnticipo(idAnticipo);
		return new ResponseEntity<Anticipo>(entity, new HttpHeaders(), HttpStatus.OK);
	}



	@PostMapping("/anticipo")
	public ResponseEntity<Anticipo> createAnticipo(@RequestBody Anticipo anticipo){
		service.createAnticipo(anticipo);
		return new ResponseEntity<Anticipo>(anticipo, new HttpHeaders(), HttpStatus.OK);
	}

	@PutMapping("/anticipo")
	public ResponseEntity<Anticipo> updateAnticipo(@RequestBody Anticipo anticipo) throws RecordNotFoundException{
		service.updateAnticipo(anticipo);
		return new ResponseEntity<Anticipo>(anticipo, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/anticipo/{id}")
	public HttpStatus deleteAnticipoByIdAnticipo(@PathVariable("id") String idAnticipo) throws RecordNotFoundException {
		service.deleteAnticipoByIdAnticipo(idAnticipo);
		return HttpStatus.OK;
	}
	
	@GetMapping("/anticipo/total/{id}/cedula/{idPersonal}")
	public Double getTotalByIdAnticipo(@PathVariable("id") String idAnticipo, @PathVariable("idPersonal") String idPersonal) throws RecordNotFoundException {
		return service.total(idAnticipo,idPersonal);
	}
	
}				
