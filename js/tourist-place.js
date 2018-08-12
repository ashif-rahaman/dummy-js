/**
 * Tourist places object
 * this object holds a Map of places
 * all functionalities like adding new place, removing a place and sorting the places(asc/desc) are available here
 */
var touristPlaces = {

    placeList: new Map(),
    size: 0,

    //return the current list
    getPlaceList: function () {

        return this.placeList;
    },

    //add a new place to the place list
    addPlace: function (place) {

        let tempPlace = {
            id: this.size++,
            name: place.name,
            address: place.address,
            rating: place.rating,
            picture: place.picture
        };

        if (tempPlace.name != undefined && tempPlace.name != ""
            && tempPlace.address != undefined && tempPlace.address != ""
            && tempPlace.rating != undefined && tempPlace.rating > 0
            && !this.placeList.has(tempPlace.id)) {

            this.placeList.set(tempPlace.id, tempPlace);

            timing.showMessageBox("Place is added successfully", "#41f467");
            return tempPlace;
        }
        timing.showMessageBox("Place cannot be added", "#f46d41");
    },

    //remove a place from the list by its name
    removePlace: function (placeId) {

        if (placeId != undefined && placeId != null && this.placeList.has(placeId)) {

            if (this.placeList.delete(placeId)) {

                timing.showMessageBox("Place is deleted successfully", "#41f467");
            } else {

                timing.showMessageBox("Place cannot be deleted", "#f46d41");
            }
        }
    },

    // Update an existing tourist place
    updatePlace: function (place) {

        if (place != undefined && place != null
            && place.id != undefined && place.id != null
            && this.placeList.has(place.id)) {

            let tempPlace = {
                id: place.id,
                name: place.name,
                address: place.address,
                rating: place.rating
            };

            if (place.picture != undefined && place.picture != null && place.picture != "") {

                tempPlace.picture = place.picture;
            }

            this.placeList.set(tempPlace.id, tempPlace);

            timing.showMessageBox("Place is updated successfully", "#41f467");
        } else {

            timing.showMessageBox("Place is not updated", "#f46d41");
        }
    },

    //sort the place list and return a sorted map of places
    //if type == asc, return place's map sorted in ascending order
    //if type == desc, return places's map sorted in descending order
    //otherwise, return the normal map of places as it was inserted (the original map of places) 
    sortPlaces: function (type) {

        //sorting code for ascending order
        if (type == "asc") {

            let keys = Array.from(this.placeList.keys());

            for (let i = 0; i < keys.length - 1; i++) {

                for (let j = i + 1; j < keys.length; j++) {

                    let place1 = this.placeList.get(keys[i]);
                    let place2 = this.placeList.get(keys[j]);

                    if (place1.rating > place2.rating) {

                        let temp = keys[i];
                        keys[i] = keys[j];
                        keys[j] = temp;
                    }
                }
            }

            //creating a map sorted in ascending order
            let sortedPlacesList = new Map();
            for (let i = 0; i < keys.length; i++) {

                sortedPlacesList.set(keys[i], this.placeList.get(keys[i]));
            }

            return sortedPlacesList;

        }
        //sorting code for descending order 
        else if (type == "desc") {

            let keys = Array.from(this.placeList.keys());
            for (let i = 0; i < keys.length - 1; i++) {

                for (let j = i + 1; j < keys.length; j++) {

                    let place1 = this.placeList.get(keys[i]);
                    let place2 = this.placeList.get(keys[j]);

                    if (place1.rating < place2.rating) {

                        let temp = keys[i];
                        keys[i] = keys[j];
                        keys[j] = temp;
                    }
                }
            }

            //creating a map sorted in descending order
            let sortedPlacesList = new Map();
            for (let i = 0; i < keys.length; i++) {

                sortedPlacesList.set(keys[i], this.placeList.get(keys[i]));
            }

            return sortedPlacesList;
        }
        //return of the original map
        else {

            console.log('No such sorting');
            return this.getPlaceList();
        }
    }
};