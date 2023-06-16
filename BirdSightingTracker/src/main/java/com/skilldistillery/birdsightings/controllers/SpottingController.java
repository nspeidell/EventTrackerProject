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

import com.skilldistillery.birdsightings.entities.Spotting;
import com.skilldistillery.birdsightings.services.SpottingService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class SpottingController {
	@Autowired
	private SpottingService spottingService;

	@GetMapping("spotting")
	public List<Spotting> listAllSpotting() {
		return spottingService.listAllSpotting();
	}

	@GetMapping("spotting/{spottingId}")
	public Spotting getSpotting(@PathVariable Integer spottingId, HttpServletResponse res) {
		Spotting spotting = spottingService.getSpotting(spottingId);
		if (spotting == null) {
			res.setStatus(404);
		}
		return spotting;
	}

	@PostMapping("spottings")
	public Spotting createSpotting(HttpServletResponse res, HttpServletRequest req, @RequestBody Spotting spotting) {
		try {
			spotting = spottingService.create(spotting);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(spotting.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			spotting = null;
		}
		return spotting;
	}

	@PutMapping("spottings/{spottingId}")
	public Spotting updateSpotting(HttpServletResponse res, @PathVariable Integer spottingId,
			@RequestBody Spotting spotting) {
		System.out.println("hitting the update controller");
		try {
			spotting = spottingService.update(spottingId, spotting);
			if (spotting == null) {
				res.setStatus(404);
				System.out.println("hitting the update if");
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			spotting = null;
		}
		return spotting;
	}

	@DeleteMapping("spottings/{spottingId}")

	public void deleteSpotting(HttpServletResponse res, @PathVariable Integer spottingId) {
		boolean result = spottingService.delete(spottingId);
		System.out.println(result);
		if (result == true) {
			res.setStatus(200);
		} else {
			res.setStatus(400);
		}
	}
}
