var updateOrAdd = "add";
var updateClickedId = "";
var sortingType = "none";
var touristPlacesDataTable;
var dataTableClickedRow;
var dataTableClickedRowData;

var flags = {
    name: false,
    address: false,
    rating: false
};

var formPlace =
{
    name: "",
    address: "",
    rating: "",
    picture: ""
};

$(document).ready(function () {

    //Initialize the tourist places
    var places =
        [
            {
                name: "lalbagh fort",
                address: "Lalbagh Road, Azimpur, Dhaka 1211",
                rating: 5.0,
                picture: ""
            },
            {
                name: "sajek valley",
                address: "Kasalong, Sajek, Baghaichhari, Rangamati",
                rating: 4,
                picture: ""
            },
            {
                name: "Mangrove Forest",
                address: "Sundarban",
                rating: 4.7,
                picture: ""
            },
            {
                name: "Mohasthangar",
                address: "Noagaon, Rajshahi",
                rating: 4.5,
                picture: ""
            },
        ];


    /**
     * APPLYING jQuery-DATATABLE PLUGIN
     */
    touristPlacesDataTable = $('#tourist-Places-Table').DataTable({
        searching: false,
        paging: false,
        sorting: [],
        columns: [
            { "name": "Name", "orderable": false },
            { "name": "Address", "orderable": false },
            { "name": "Rating", "orderable": true },
            { "name": "Picture", "orderable": false },
            { "name": "Actions", "orderable": false },
        ]
    });

    for (let i = 0; i < places.length; i++) {

        addNewRowDataTable(touristPlaces.addPlace(places[i]));
    }

    // console.log(touristPlaces.getPlaceList().size);

    // placeTableData(touristPlaces.getPlaceList()); // drawing the table for the created rows

    /**
     * Click events on rating
     */
    // $('#rating').click(function () {

    //     switch (sortingType) {

    //         case "none":
    //             sortingType = "asc";
    //             $('#rating > span').html("&#x25BE;");
    //             $('#rating > span').css("visibility", "visible");
    //             break;

    //         case "asc":
    //             sortingType = "desc";
    //             $('#rating > span').html("&#x25B4;");
    //             break;

    //         case "desc":
    //             sortingType = "none";
    //             $('#rating > span').css("visibility", "hidden");
    //             break;

    //         default:
    //             break;
    //     }

    //     placeTableData(touristPlaces.sortPlaces(sortingType));
    // });

    /**
     * Manipulation of input field of form
     */

    //
    // TODO (jQuery validation)
    // 
    $("#input-Form .input:not([type=file])").keyup(function (e) {

        let $element = $(e.target);

        switch ($element.attr('name')) {

            case "name":
                if ($("#input-Form .input[name=name]").val() == "") { flags.name = false; }
                else { flags.name = true; }
                break;

            case "address":
                if ($("#input-Form .input[name=address]").val() == "") { flags.address = false; }
                else { flags.address = true; }
                break;

            case "rating":
                if ($("#input-Form .input[name=rating]").val() == "") { flags.rating = false; }
                else { flags.rating = true; }
                break;

            default:
                break;
        }

        // disabled/enable the final add/update button basis on input fields
        $("#add-Or-Update-Btn").prop("disabled", !(flags.name && flags.address && flags.rating));

        if (!flags.name && !flags.address && !flags.rating) {

            updateOrAdd = "add";
        }
    });

    /**
     * Action from form
     * Add new tourist place / update the existing tourist places 
     */
    $("#add-Or-Update-Btn").click(function (e) {


        formPlace.name = $("#input-Form .input[name=name]").val();
        formPlace.address = $("#input-Form .input[name=address]").val();
        formPlace.rating = $("#input-Form .input[name=rating]").val();

        // console.log(formPlace);
        // console.log(updateOrAdd);

        $("#formModal").modal("hide");

        if (formPlace.name != "" && formPlace.address != "" && formPlace.rating > 0 && formPlace.rating <= 5) {

            if ($(e.target).text() == "Add") {

                addNewRowDataTable(touristPlaces.addPlace(formPlace));
                // touristPlacesDataTable.ajax.reload(); // refresh the datatable
            } else {

                formPlace.id = updateClickedId;
                touristPlaces.updatePlace(formPlace);

                dataTableClickedRowData[0] = formPlace.name;
                dataTableClickedRowData[1] = formPlace.address;
                dataTableClickedRowData[2] = formPlace.rating;

                if (formPlace.picture != undefined && formPlace.picture != "") {

                    dataTableClickedRowData[3] = "<img src=\"" + formPlace.picture +"\" alt=\"\" height='100px'>"
                }

                touristPlacesDataTable.row(dataTableClickedRow).data(dataTableClickedRowData).draw();
            }

            formPlace = {};

            $("#input-Form .input[name=name]").val("");
            $("#input-Form .input[name=address]").val("");
            $("#input-Form .input[name=rating]").val("");
            $("#input-Form .input[name=picture]").val("");
        } else if (updateOrAdd == "add") {

            timing.showMessageBox("Place cannot be added", "#f46d41");
        } else {

            timing.showMessageBox("Place cannot be updated", "#f46d41");
        }

        updateOrAdd = "add";
        $("#add-Or-Update-Btn").prop("disabled", true);

        //
        // Chnage code here
        //
        // placeTableData(touristPlaces.getPlaceList());
    });

    // add image data on upload the image file
    $("#input-Form .input[name=picture]").change(function () {

        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                formPlace.picture = reader.result;// assign image data to formPlace.picture variable
            }

            reader.readAsDataURL(this.files[0]);
        } else {

            formPlace.picture = "";// formPlace.picture is cleared if no image selected
        }
    });


    /**
     * Action from table
     * Delete or Update the existing tuorist place
     */
    $("#tourist-Places-Table tbody").on('click', 'button', {}, function (e) {

        dataTableClickedRow = touristPlacesDataTable.row($(e.target).closest('tr'));
        dataTableClickedRowData = dataTableClickedRow.data();
        // console.log(dataTableClickedRow);

        let id = parseInt($(e.target).closest('tr').attr('id'));
        updateClickedId = id;
        let type = $(e.target).text();

        console.log(id, type);

        if (type == "Update") {

            updateOrAdd = "update";

            // modal label on update action
            $("#exampleModalLabel").text("Update Place");

            // final add/update button text & enable
            $("#add-Or-Update-Btn").text("Update");
            $("#add-Or-Update-Btn").prop("disabled", false);

            formPlace = touristPlaces.getPlaceList().get(id);
            $("#input-Form .input[name=name]").val(formPlace.name);
            $("#input-Form .input[name=address]").val(formPlace.address);
            $("#input-Form .input[name=rating]").val(formPlace.rating);

            flags.name = true;
            flags.address = true;
            flags.rating = true;
        } else {

            updateOrAdd = "add";
            $("#add-Or-Update-Btn").prop("disabled", true);

            $("#input-Form .input[name=name]").val("");
            $("#input-Form .input[name=address]").val("");
            $("#input-Form .input[name=rating]").val("");
            touristPlaces.removePlace(id);

            //
            // Place code for row deletion from data table 
            //
            touristPlacesDataTable.row(dataTableClickedRow).remove().draw();
            // placeTableData(touristPlaces.getPlaceList());
        }
    });

    /**
     * When "Add new place" button is clicked, changes on modal
     */
    $(".button[data-target='#formModal']").click(function () {

        updateOrAdd = "add";

        // modal label on add action
        $("#exampleModalLabel").text("Add new Place");

        // empty input fields on add action
        $("#input-Form .input[name='name']").val("");
        $("#input-Form .input[name='address']").val("");
        $("#input-Form .input[name='rating']").val("");
        $("#input-Form .input[name='picture']").val("");


        $("#add-Or-Update-Btn").text("Add"); // Naming the final Add button
        $("#add-Or-Update-Btn").prop("disabled", true); // disable the final add button
    });
});

/**
 * This placeTableData function places rows
 * with currentPlaceList Map data
 * @param {*} currentPlaceList 
 */
var placeTableData = function (currentPlaceList) {

    $("#tourist-Places-Table tbody").empty();
    var rows = "";

    // console.log(currentPlaceList);
    // console.log("Tables is placing");

    for (var place of currentPlaceList.values()) {

        rows += "<tr id='" + place.id + "'>" +
            "<td>" + place.name + "</td>" +
            "<td>" + place.address + "</td>" +
            "<td>" + place.rating + "</td>" +
            "<td><img src=\"" + place.picture + "\" alt=\"\" height='100px'></td>" +
            "<td><button class='button' data-toggle='modal' data-target='#formModal'>Update</button>" +
            "<button class='button'>Delete</button></td>" +
            "</tr>";
    }

    $("#tourist-Places-Table tbody").append(rows);
}

/**
 * This method adds new row to datatable
 * 
 * @param {tourist place information(i.e., object) to draw new row} placeToRow 
 */
var addNewRowDataTable = function (placeToRow) {

    console.log(placeToRow);

    touristPlacesDataTable.row.add([
        placeToRow.name,
        placeToRow.address,
        placeToRow.rating,
        "<img src=\"" + placeToRow.picture + "\" alt=\"\" height='100px'>",
        "<td><button class='button' data-toggle='modal' data-target='#formModal'>Update</button>" + "<button class='button'>Delete</button></td>"
    ]).draw().node().id = placeToRow.id;

    // touristPlacesDataTable.draw();
}