console.log('script.js loaded')



window.addEventListener('load', function(e) {
	console.log('Window loaded');
	init();
});

function init() {
	console.log('init');
	getAllSpottings();

	//TODO add event listners for existing buttons/forms
	document.newSpottingForm.addSpottingButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		let form = document.newSpottingForm;
		let theSpotting = {
			locationAddress: form.address.value,
			activity: form.activity.value,
			species: { id: form.species.value },
			notes: form.notes.value,
			picture: form.picture.value,
			timeDate: form.timeDate.value,
		};
		console.log(theSpotting);
		addNewSpotting(theSpotting);
	});
	document.updateSpottingForm.updateSpottingButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		let form = document.updateSpottingForm;

		let theSpotting = {
			id: form.id.value,
			locationAddress: form.address.value,
			activity: form.activity.value,
			species: { id: form.species.value },
			notes: form.notes.value,
			picture: form.picture.value,
			timeDate: form.timeDate.value,
		};
		console.log("form id" + form.id.value + '' + "spotting info:" + theSpotting);
		updateSpotting(form.id.value, theSpotting);
	});
}

function getAllSpottings() {
	//TODO XHR to get list enpoint of api call displayALlEvents to show on page
	let xhr = new XMLHttpRequest();
	xhr.open("GET", 'api/spotting');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let spottingList = JSON.parse(xhr.responseText);
				displayAllSpottings(spottingList);
			}
			else {
				console.log("No Spottings")
				//TODO function to show error page
			}
		}
	};

	xhr.send();
}


function displayAllSpottings(spottingList) {
	let countOne = 0;
	let tbody = document.getElementById("spottingTableBody")
	tbody.textContent = '';
	if (spottingList && Array.isArray(spottingList)) {
		for (let spotting of spottingList) {
			if (spotting.species.id === 1) {
				countOne++
			}
			let paragraph = document.getElementById("count");
			paragraph.textContent = '';
			let count = document.createElement('h5');
			count.textContent = countOne
			paragraph.appendChild(count);

			let tr = document.createElement('tr');
			tbody.appendChild(tr);
			let td = document.createElement('td');
			tr.appendChild(td)
			td.textContent = spotting.id;
			tr.appendChild(td);
			let logImg = document.createElement('img');
			logImg.src = spotting.picture;
			logImg.classList.add('logoImageThumbnail')
			td.appendChild(logImg);
			td = document.createElement('td');
			td.textContent = spotting.species.type;
			tr.appendChild(td);
			let time = document.createElement('td');
			time.textContent = 'Time: ' + spotting.timeDate;
			td.appendChild(time);
			tr.addEventListener('click', function(evt) {
				let spottingId = spotting.id;
				getSpottingDetails(spottingId);
			});
		}
	}

}
function getSpottingDetails(spottingId) {
	//TODO xhr for single event
	console.log('Getting spotting details for' + spottingId)
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/spotting/${spottingId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let spotting = JSON.parse(xhr.responseText);
				displaySpottingDetails(spotting);

			}
			else {
				console.log('not found');
			}
		}
	};
	xhr.send();
}
function displaySpottingDetails(spotting) {
	//DOm display in details div

	let detailDiv = document.getElementById('SpottingDetailsDiv');
	detailDiv.textContent = '';
	let logImg = document.createElement('img');
	logImg.src = spotting.picture;
	logImg.classList.add('logoImage')
	detailDiv.appendChild(logImg);
	let h2 = document.createElement('h2');
	h2.textContent = 'Sighting Details';
	detailDiv.appendChild(h2);
	let spottingId = document.createElement('h4');
	spottingId.textContent = 'Spotting ID:' + '' + spotting.id;
	detailDiv.appendChild(spottingId);
	let spottingAddress = document.createElement('h4');
	spottingAddress.textContent = 'Address: ' + spotting.locationAddress;
	detailDiv.appendChild(spottingAddress);
	let Activity = document.createElement('h4');
	Activity.textContent = 'Activity: ' + spotting.activity;
	detailDiv.appendChild(Activity);
	let Species = document.createElement('h4');
	Species.textContent = 'Species: ' + spotting.species.type;
	detailDiv.appendChild(Species);
	let science = document.createElement('h4');
	science.textContent = 'Scientific Name: ' + spotting.species.scientificName;
	detailDiv.appendChild(science);
	let notes = document.createElement('h4');
	notes.textContent = 'Notes: ' + spotting.notes;
	detailDiv.appendChild(notes);
	let time = document.createElement('h4');
	time.textContent = 'Time: ' + spotting.timeDate;
	detailDiv.appendChild(time);

	let deleteForm = document.createElement("form");
	deleteForm.name = 'deleteSpottingForm';
	detailDiv.appendChild(deleteForm);
	let spottingIdInput = document.createElement("input");
	spottingIdInput.type = "hidden";
	spottingIdInput.name = "spottingId";
	spottingIdInput.value = spotting.id;
	deleteForm.appendChild(spottingIdInput);
	let delButton = document.createElement("button");
	delButton.textContent = "Delete This Spotting";
	deleteForm.appendChild(delButton);
	delButton.classList.add("btn");
	delButton.classList.add("btn-danger");
	delButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		let spottingId = document.deleteSpottingForm.spottingId.value;
		deleteSpotting(spottingId);
	});
	
	
		let updateForm = document.createElement("form");
	updateForm.name = 'updateSpottingForm';
	detailDiv.appendChild(updateForm);
	let spottingInfo = document.createElement("input");
	spottingInfo.type = "hidden";
	spottingInfo.name = "spottingId";
	spottingInfo.value = spotting.id;
	updateForm.appendChild(spottingInfo);
	let uptButton = document.createElement("button");
	uptButton.textContent = "Update This Spotting";
	updateForm.appendChild(uptButton);
	uptButton.classList.add("btn");
	uptButton.classList.add("btn-danger");
	uptButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		let spottingId = document.updateSpottingForm.spottingId.value;
		updateSpotting(spottingId);
	});
	
	
	
	
	
	
}
function addNewSpotting(newSpotting) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", 'api/spottings');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let createdSpotting = JSON.parse(xhr.responseText);
				displaySpottingDetails(createdSpotting);
				getAllSpottings();
				window.location.reload();

			}
			else {
				//displayError('Error creating spotting, please make sure you have valid values for each property. ' +  xhr.status );
				console.log(xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let newSpottingJson = JSON.stringify(newSpotting);
	xhr.send(newSpottingJson);
}
function deleteSpotting(spottingId) {
	console.log('In Delete Spotting for ' + spottingId);
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/spottings/${spottingId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				//let deletedSpotting = JSON.parse(xhr.responseText);
				console.log("Delete Successfull")
				window.location.reload();
			}
			else {
				console.log('didnt work' + xhr.status)
			}
		}
	};
	xhr.send();
}


function updateSpotting(spottingId, spotting) {
	console.log('this is the updatespotting before');
	console.log(spottingId);
	console.log(spotting.species.id);
	console.log('this is the updatespotting');

	let xhr = new XMLHttpRequest();
	xhr.open("PUT", `api/spottings/${spottingId}`);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let updatedSpotting = JSON.parse(xhr.responseText);
				//displaySpottingDetails(updatedSpotting);
				window.location.reload();
			}
			else {
				//displayError('Error creating spotting, please make sure you have valid values for each property. ' +  xhr.status );
				console.log(xhr.status);
			}
		}
	};
	xhr.setRequestHeader("Content-type", "application/json");
	let updateSpottingJson = JSON.stringify(spotting);
	xhr.send(updateSpottingJson);
}