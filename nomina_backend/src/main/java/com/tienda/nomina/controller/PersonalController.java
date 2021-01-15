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
import com.tienda.nomina.model.Personal;
import com.tienda.nomina.service.PersonalService;

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
public class PersonalController {
	@Autowired
	PersonalService service;
	
	@GetMapping("/personal")
	public ResponseEntity<List<Personal>> getAll() {
		List<Personal> list = service.getAll();
		return new ResponseEntity<List<Personal>>(list, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/personal/{id}")
	public ResponseEntity<Personal> getPersonalByCedulaPersonal(@PathVariable("id") String cedulaPersonal) throws RecordNotFoundException {
		Personal entity = service.findByCedulaPersonal(cedulaPersonal);
		return new ResponseEntity<Personal>(entity, new HttpHeaders(), HttpStatus.OK);
	}



	@PostMapping("/personal")
	public ResponseEntity<Personal> createPersonal(@RequestBody Personal personal){
		service.createPersonal(personal);
		return new ResponseEntity<Personal>(personal, new HttpHeaders(), HttpStatus.OK);
	}

	@PutMapping("/personal")
	public ResponseEntity<Personal> updatePersonal(@RequestBody Personal personal) throws RecordNotFoundException{
		service.updatePersonal(personal);
		return new ResponseEntity<Personal>(personal, new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/personal/{id}")
	public HttpStatus deletePersonalByCedulaPersonal(@PathVariable("id") String cedulaPersonal) throws RecordNotFoundException {
		service.deletePersonalByCedulaPersonal(cedulaPersonal);
		return HttpStatus.OK;
	}
}				
