$(document).ready(function () {

    $.validator.addMethod("ratingBoundery", function (value, element) {

        let number = parseInt(value);
        let result = (number >= 1 && number <= 5);
        return this.optional(element) || result;
    });

    $("#input-Form").validate({
        rules: {
            name: {
                required: true
            },
            address: {
                required: true
            },
            rating: {
                required: true,
                ratingBoundery: true
            }
        },
        messages: {
            name: {
                required: 'Please enter place name'
            },
            address: {
                required: 'Please enter address'
            },
            rating: {
                required: 'Please enter a rating value',
                ratingBoundery: 'Please enter a number between 1 and 5'
            }
        }
    });

    $("#cancel-Btn").click(function () {

        console.log("Hello");

        let name = $("#input-Form .input[name=name]").val();
        let address = $("#input-Form .input[name=address]").val();
        let rating = $("#input-Form .input[name=rating]").val();

        // console.log(formPlace);
        // console.log(name, address, rating);

        if (formPlace != undefined && formPlace.picture != "") {

            // console.log("picture");
            confirm("You have some unsaved changes") ? $("#formModal").modal("hide") : $("#formModal").modal("show");
        } else if (updateOrAdd == "add" && (name != "" || address != "" || rating != "")) {

            // console.log("add")
            confirm("You have some unsaved changes") ? $("#formModal").modal("hide") : $("#formModal").modal("show")
        } else if (name != formPlace.name || address != formPlace.address || rating != formPlace.rating) {

            // console.log("update");
            confirm("You have some unsaved changes") ? $("#formModal").modal("hide") : $("#formModal").modal("show")
        } else {

            $("#formModal").modal("hide");
        }
    });
});