package com.skilldistillery.birdsightings.services;

import java.util.List;

import com.skilldistillery.birdsightings.entities.Spotting;

public interface SpottingService {
	List<Spotting> listAllSpotting();
	Spotting getSpotting(int spottingId);
	Spotting create(Spotting newSpotting);
	Spotting update(int spottingId, Spotting spotting);
	boolean delete(int spottingId);
	
}
