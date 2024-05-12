<template>
    <div class="container mt-4 border border-black">
        <h1>{{ displayName }} Profile</h1>
        <div class="row">
            <div class="col-sm-12">
                <p>Name: {{ firstName + lastName }}</p>
            </div>
            <div class="col-sm-12">
                <p>Display Name: {{ displayName }}</p>
            </div>
        </div>
        <div class="row justify-content-center align-content-center">
            <div class="col-sm-12">
                <h2>Listings</h2>
            </div>
            <div class="col-sm-12">
                <RouterLink class="btn btn-primary" to="/create-listing">Create Listing</RouterLink>
            </div>
            <div class="col-sm-12 container pb-4">
                <div class="row justify-content-around align-center">
                    <div class="col-12 col-sm-5 col-xl-3" v-for="listing in getListings" :key="listing.id">
                        <div class="card" style="width: 100%;" >
                            <img :src="listing.primaryImageURL" class="card-img-top" alt="listing image" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <paginate 
                :page-count="maxPages" 
                :page-range="3"
                :click-handler="pageChange">
            </paginate>
            </div>
        </div>
    </div>
</template>

<script>
import vuejsPaginateNextUmd from 'vuejs-paginate-next';

    export default {
        name: "ProfileView",
        components: {paginate: vuejsPaginateNextUmd},
        data() {
            return {
                profile: {},
                displayName: '',
                firstName: '',
                lastName: '',
                listingsPerPage: 4,
                currentPage: 1,
                listings: [],
            }
        },
        mounted() {
            if (!localStorage.getItem('user_id')) {
                this.$router.push({name: "home"});
            }

            const id = localStorage.getItem('user_id');

            const url = `http://localhost:3000/api/get-profile/${id}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.profile = data;
                    this.displayName = data.displayName;
                    this.firstName= data.firstName;
                    this.lastName = data.lastName;
                    this.listings = data.listings;
                });
        },
        computed: {
            maxPages() {
                return Math.ceil(this.listings.length / this.listingsPerPage);
            },
            getListings() {
                if (this.listings.length === 0) {
                    return this.listings;
                }

                let current = this.currentPage * this.listingsPerPage;
                let start =  current - this.listingsPerPage;
                return this.listings.slice(start, current);
            }
        },
        methods: {
            pageChange(pageNum) {
                this.currentPage = Number(pageNum);
            }
        },
    }
</script>