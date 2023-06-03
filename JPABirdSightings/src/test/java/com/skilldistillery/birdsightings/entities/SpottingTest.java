package com.skilldistillery.birdsightings.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SpottingTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Spotting spotting;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPABirdSightings");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		spotting = em.find(Spotting.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		spotting = null;
	}

	@Test
	void test() {
		assertNotNull(spotting);
		assertEquals("hunting", spotting.getActivity());
	}
	@Test
	void test_species() {
		assertNotNull(spotting);
		assertNotNull(spotting.getSpecies());
		assertEquals(1, spotting.getSpecies().getId());
	}

}
