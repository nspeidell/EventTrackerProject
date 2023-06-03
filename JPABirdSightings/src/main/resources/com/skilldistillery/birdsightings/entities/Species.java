package com.skilldistillery.birdsightings.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Species {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String type;
	@JsonIgnore
	@OneToMany(mappedBy = "species")
	private List<Spotting> spottings;
	@Column(name = "scientific_name")
	private String scientificName;
	private String description;
	@Column(name = "picture_url")
	private String picture;
	@Column(name = "id_info")
	private String idInfo;

	public Species() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Spotting> getSpottings() {
		return spottings;
	}

	public void setSpottings(List<Spotting> spottings) {
		this.spottings = spottings;
	}

	public String getScientificName() {
		return scientificName;
	}

	public void setScientificName(String scientificName) {
		this.scientificName = scientificName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}



	public String getIdInfo() {
		return idInfo;
	}

	public void setIdInfo(String idInfo) {
		this.idInfo = idInfo;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Species other = (Species) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Species [id=" + id + ", type=" + type + ", scientificName="
				+ scientificName + ", description=" + description + ", picture=" + picture + ", idInfo=" + idInfo + "]";
	}


}
