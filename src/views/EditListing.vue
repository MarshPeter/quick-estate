<template>
    <div class="container pt-4" v-if="Object.keys(listing).length !== 0">
        <div class="row text-center">
            <h1>Edit listing form for: {{ listing.title }} </h1>
        </div>
        <div class="row justify-center">
            <div class="col-12">
                <h2>Current Details</h2>
            </div>
            <div class="col-12">
                <ul>
                    <li>Title: {{ listing.title }}</li>
                    <li>Date of Auction: {{ australianDate }}</li>
                    <li>Auction Location: {{ listing.auctionLocation }}</li>
                    <li>Auctioneer Name: {{ listing.auctioneerName }}</li>
                    <li>Location of Property: {{ listing.location }}</li>
                    <li>Description of property: {{ listing.description }}</li>
                    <li>Reserve Price: {{ listing.reservePrice }}</li>
                    <li>URL Image: {{ listing.primaryImageURL }}</li>
                </ul>
                <img :src="listing.primaryImageURL" alt="Current Image of house">
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h2>Edit form</h2>
                <p>NOTE: You only need to fill in fields you wish to change!</p>
            </div>
            <div class="col-12">
                <form @submit="handleSubmit">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <input type="text" class="form-control" id="title" v-model="title">
                    </div>
                    <div class="mb-3">
                        <label for="date-of-auction" class="form-label">Date of Auction</label>
                        <input type="text" class="form-control" id="date-of-auction" v-model="dateOfAuction">
                    </div>
                    <div class="mb-3">
                        <label for="auction-location" class="form-label">Auction Location</label>
                        <input type="text" class="form-control" id="auction-location" v-model="auctionLocation">
                    </div>
                    <div class="mb-3">
                        <label for="auctioneer-name" class="form-label">Auctioneer Name</label>
                        <input type="text" class="form-control" id="auctioneer-name" v-model="auctioneerName">
                    </div>
                    <div class="mb-3">
                        <label for="property-location" class="form-label">Property Location</label>
                        <input type="text" class="form-control" id="property-location" v-model="propertyLocation">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description Of Property</label>
                        <input type="text" class="form-control" id="description" v-model="description">
                    </div>
                    <div class="mb-3">
                        <label for="reservePrice" class="form-label">Reserve Price</label>
                        <input type="text" class="form-control" id="reserverPrice" v-model="reservePrice">
                    </div>
                    <div class="mb-3">
                        <label for="imageURL" class="form-label">Image URL</label>
                        <input type="text" class="form-control" id="imageURL" v-model="imageURL">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Changes</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditLisitngView",
        data() {
            return {
                listing: {},
                title: "",
                dateOfAuction: "",
                auctionLocation: "",
                auctioneerName: "",
                propertyLocation: "",
                description: "",
                reservePrice: "",
                imageURL: "",
                errors: [],
            }
        },
        beforeMount() {
            if (!localStorage.getItem('user_id')) {
                this.$router.push({name: 'homeView'})
             }
            const id = this.$route.params.id;

            const url = `http://localhost:3000/api/single-listing/${id}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data[0].account_id !== Number(localStorage.getItem('user_id'))) {
                        this.$route.push({name: 'homeView'});
                    }
                    this.listing = data[0];
                    console.log(this.listing);
                })
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.errors = [];
                this.validateInputs();

                console.log(this.errors);

                if (!this.title
                    && !this.dateOfAuction 
                    && !this.auctionLocation 
                    && !this.auctioneerName 
                    && !this.propertyLocation 
                    && !this.description 
                    && !this.reservePrice 
                    && !this.imageURL) {
                    this.errors.push("You have entered no changes, please enter values in any box you wish to change");
                }

                if (this.errors.length !== 0) {
                    return;
                }

                const newTitle = this.title ? this.title : this.listing.title;
                let newDateOfAuction = this.dateOfAuction ? this.dateOfAuction : this.currentDateToAustralianDate();
                const newAuctionLocation = this.auctionLocation ? this.auctionLocation : this.listing.auctionLocation;
                const newAuctioneerName = this.auctioneerName ? this.auctioneerName : this.listing.auctioneerName;
                const newPropertyLocation = this.propertyLocation ? this.propertyLocation : this.listing.location;
                const newDescription = this.description ? this.description : this.listing.description;
                const newReservePrice = this.reservePrice ? this.reservePrice : this.listing.reservePrice;
                const newImageURL = this.imageURL ? this.imageURL : this.listing.primaryImageURL;


                const [day, month, year] = newDateOfAuction.split('/');
                newDateOfAuction = `${year}/${month}/${day}`;
                

                const requestOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.listing.id,
                        title: newTitle,
                        location: newPropertyLocation,
                        auctionDate: newDateOfAuction,
                        auctioneerName: newAuctioneerName,
                        auctionLocation: newAuctionLocation,
                        reservePrice: newReservePrice,
                        primaryImageUrl: newImageURL,
                        description: newDescription
                    })
                }

                let status = null;

                fetch(`http://localhost:3000/api/update-listing`, requestOptions)
                    .then(res => {
                        status = res.status;
                        return res.json();
                    })
                    .then(data => {
                        if (status !== 200) {
                            this.errors.push(data.err);
                        } else {
                            this.$router.push({name: "profile"});
                        }
                    });

            },
            validateInputs() {
                this.validateTitle();
                this.validateDateOfAuction();
                this.validateAuctionLocation();
                this.validateAuctioneerName();
                this.validatePropertyLocation();
                this.validateDescription();
                this.valdiateReservePrice();
                this.valdiateImageURL();
            },
            validateTitle() {
                if (this.title === "") return;
                if (this.title.length > 30) {
                    this.errors.push("Title is too long. Must be less than 30 characters")
                }
            },
            validateDateOfAuction() {
                if (this.dateOfAuction === "") return;
                const dateRegex = /^\d\d\/\d\d\/\d\d\d\d$/;

                if (!this.dateOfAuction.match(dateRegex)) {
                    this.errors.push("Dates must be in the format: dd/mm/yyyy");
                }
            },
            validateAuctionLocation() {
                if (this.auctionLocation === "") return;

                if (this.auctionLocation.length > 100) {
                    this.errors.push("The auction location must be less than 100 characters");
                }
            },
            validateAuctioneerName() {
                if (this.auctioneerName === "") return;

                if (this.auctionLocation.length > 50) {
                    this.errors.push("The Auctioneer Name must be less than 50 characters");
                }
            },
            validatePropertyLocation() {
                if (this.propertyLocation === "") return;

                if (this.propertyLocation.length > 100) {
                    this.errors.push("Property location Details must be less than 100 characters");
                }
            },
            validateDescription() {
                if (this.description === "") return;

                if (this.description.length > 150) {
                    this.errors.push("Description must be less than 150 characters");
                }
            },
            valdiateReservePrice() {
                if (this.reservePrice === "") return;

                if (isNaN(this.reservePrice)) {
                    this.errors.push("Reserve Price must be a valid number");
                }
           },
            valdiateImageURL() {
                if (this.imageURL === "") return;

                if (this.imageURL > 150) {
                    this.errors.push("Url must be less than 150 characters");
                }
            },
            currentDateToAustralianDate() {
                if (!this.listing.auctionDate) return "";
                const americanDate = this.listing.auctionDate.split('T')[0];
                const [year, month, day] = americanDate.split('-');

                return `${day}/${month}/${year}`;
            }
        },
        computed: {
            australianDate() {
                if (!this.listing.auctionDate) return "";
                const americanDate = this.listing.auctionDate.split('T')[0];
                const [year, month, day] = americanDate.split('-');

                return `${day}/${month}/${year}`;
            }
        }
    }
</script>