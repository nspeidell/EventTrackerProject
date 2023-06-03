package com.skilldistillery.birdsightings.services;

import java.util.List;

import com.skilldistillery.birdsightings.entities.Species;


public interface SpeciesService {

	List<Species> listAllSpecies();
	Species getSpecies(int speciesId);
	Species create(Species newSpecies);
	Species update(int speciesId, Species species);
	boolean delete(int speciesId);
	
}
