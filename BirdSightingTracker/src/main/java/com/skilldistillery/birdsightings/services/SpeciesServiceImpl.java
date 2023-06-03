package com.skilldistillery.birdsightings.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.birdsightings.entities.Species;
import com.skilldistillery.birdsightings.repositories.SpeciesRepository;

@Service
public class SpeciesServiceImpl implements SpeciesService{

	@Autowired
	private SpeciesRepository speciesRepo;
	
	@Override
	public List<Species> listAllSpecies() {
		// TODO Auto-generated method stub
		return speciesRepo.findAll();
	}

	@Override
	public Species getSpecies(int speciesId) {
		Species species = null;
		Optional<Species> speciesOpt = speciesRepo.findById(speciesId);
		if (speciesOpt.isPresent()) {
			species = speciesOpt.get();
		}
		return species;
	}

	@Override
	public Species create(Species newSpecies) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Species update(int speciesId, Species species) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int speciesId) {
		// TODO Auto-generated method stub
		return false;
	}

}
