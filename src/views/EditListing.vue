<template>
    <div class="container">
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
    </div>
</template>

<script>
    export default {
        name: "EditLisitngView",
        data() {
            return {
                listing: {},
            }
        },
        mounted() {
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