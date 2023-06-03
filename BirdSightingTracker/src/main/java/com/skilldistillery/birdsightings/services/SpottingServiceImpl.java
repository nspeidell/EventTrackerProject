package com.skilldistillery.birdsightings.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.birdsightings.entities.Spotting;
import com.skilldistillery.birdsightings.repositories.SpottingRepository;

@Service
public class SpottingServiceImpl implements SpottingService {

	@Autowired
	private SpottingRepository spottingRepo;

	@Override
	public List<Spotting> listAllSpotting() {
		// TODO Auto-generated method stub
		return spottingRepo.findAll();
	}

	@Override
	public Spotting getSpotting(int spottingId) {
		return spottingRepo.findById(spottingId);
	}

	@Override
	public Spotting create(Spotting newSpotting) {
//		Species species = new Species();
//		species.setId(1);
//		newSpotting.setSpecies(species);
		spottingRepo.save(newSpotting);
		return newSpotting;
	}

	@Override
	public Spotting update(int spottingId, Spotting spotting) {
		Spotting managed = spottingRepo.findById(spottingId);
		if (managed != null) {
			managed.setActivity(spotting.getActivity());
			managed.setLocationAddress(spotting.getLocationAddress());
			managed.setNotes(spotting.getNotes());
			managed.setPicture(spotting.getPicture());
			managed.setTimeDate(spotting.getTimeDate());
			return spottingRepo.saveAndFlush(managed);

		}

		return null;
	}

	@Override
	public boolean delete(int spottingId) {
		boolean deleted = false;
		if (spottingRepo.existsById(spottingId)) {
			spottingRepo.deleteById(spottingId);
			deleted = true;
		}
		return false;
	}

}
