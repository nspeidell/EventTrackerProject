package com.skilldistillery.birdsightings.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.birdsightings.entities.Species;
import com.skilldistillery.birdsightings.services.SpeciesService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class SpeciesController {
	
@Autowired
	private SpeciesService speciesService;
	
@GetMapping("species")
	public List<Species> listAllSpecies() {
		return speciesService.listAllSpecies();
	}
@GetMapping("species/{speciesId}")
public Species getSpecies(@PathVariable Integer speciesId, HttpServletResponse res) {
		Species species = speciesService.getSpecies(speciesId);
		if (species == null) {
			res.setStatus(404);
		}
	return species;
}
@PostMapping("species")
public Species createSpecies(
		HttpServletResponse res, 
		HttpServletRequest req,
		@RequestBody Species species
) {
	try {
		species = speciesService.create(species);
		res.setStatus(201);
		StringBuffer url = req.getRequestURL();
		url.append("/").append(species.getId());
		res.setHeader("Location", url.toString());
	} catch (Exception e) {
		e.printStackTrace();
		res.setStatus(400);
		species = null;
	}
	return species;
}

@PutMapping("species/{speciesId}")
public Species updateSpecies(
		HttpServletResponse res,
		@PathVariable Integer speciesId,
		@RequestBody Species species
) {
	try {
		species = speciesService.update(speciesId, species);
		if (species == null) {
			res.setStatus(404);
		}
	} catch (Exception e) {
		e.printStackTrace();
		res.setStatus(400);
		species = null;
	}
	return species;
}

@DeleteMapping("species/{speciesId}")

public void deleteSpecies(HttpServletResponse res, @PathVariable Integer speciesId) {
	if ( speciesService.delete(speciesId) ) {
		res.setStatus(204);
	}
	else {
		res.setStatus(404);
	}
}
}
