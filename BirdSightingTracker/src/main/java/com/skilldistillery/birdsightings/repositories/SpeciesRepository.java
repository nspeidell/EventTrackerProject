package com.skilldistillery.birdsightings.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skilldistillery.birdsightings.entities.Species;

public interface SpeciesRepository extends JpaRepository<Species, Integer>{

}
