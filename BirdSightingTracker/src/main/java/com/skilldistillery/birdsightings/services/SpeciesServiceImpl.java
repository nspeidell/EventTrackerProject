package com.skilldistillery.birdsightings.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.birdsightings.entities.Species;
import com.skilldistillery.birdsightings.repositories.SpeciesRepository;

@Service
public class SpeciesServiceImpl implements SpeciesService {

	@Autowired
	private SpeciesRepository speciesRepo;

	@Override
	public List<Species> listAllSpecies() {
		// TODO Auto-generated method stub
		return speciesRepo.findAll();
	}

	@Override
	public Species getSpecies(int speciesId) {
		return speciesRepo.findById(speciesId);
	}

	@Override
	public Species create(Species newSpecies) {
		speciesRepo.save(newSpecies);
		return newSpecies;
	}

	@Override
	public Species update(int speciesId, Species species) {
		Species managed = speciesRepo.findById(speciesId);
		if (managed != null) {
			managed.setDescription(species.getDescription());
			managed.setIdInfo(species.getIdInfo());
			managed.setPicture(species.getPicture());
			managed.setScientificName(species.getScientificName());
			managed.setType(species.getType());
			return speciesRepo.saveAndFlush(managed);
		}
		return null;
	}

	@Override
	public boolean delete(int speciesId) {
		boolean deleted = false;
		if (speciesRepo.existsById(speciesId)) {
			speciesRepo.deleteById(speciesId);
			deleted = true;
		}
		return false;
	}

}
