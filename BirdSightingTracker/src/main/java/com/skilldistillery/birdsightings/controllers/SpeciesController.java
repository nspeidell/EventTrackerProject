package com.skilldistillery.birdsightings.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.birdsightings.entities.Species;
import com.skilldistillery.birdsightings.services.SpeciesService;

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
}
