package com.skilldistillery.birdsightings.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.birdsightings.entities.Spotting;

public interface SpottingRepository extends JpaRepository<Spotting, Integer>{
Spotting findById(int id);
}
