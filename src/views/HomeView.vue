<template>
    <div class="container">
        <div class="container container-xl">
            <div class="row justify-content-center align-items-center">
                <div class="col-12 col-lg-6 text-center">
                    <h1 class="display-1">QuickEstate</h1>
                </div>
                <div class="col-12 col-lg-6 mb-4">
                    <!-- created at: https://deepai.org/machine-learning-model/text2img -->
                    <img class="img-fluid img-thumbnail shadow-lg hero-image mx-auto d-block" src="../assets/output.jpg" alt="Dream house example">
                </div>
                <div class="col-12 gap-4">
                    <div class="row gap-4 justify-content-center align-content-center">
                        <div class="col-9 col-md-3 bg-body-secondary p-4 border border-black rounded shadow text-center">
                            <p class="col m-0 fs-4">Are you looking for your next house?</p>
                        </div>
                        <div class="col-9 col-md-3 bg-body-secondary p-4 border border-black rounded shadow text-center">
                            <p class="col m-0 fs-4">Perhaps you are looking to get the word out about an auction?</p>
                        </div>
                        <div class="col-9 col-md-3 bg-body-secondary p-4 border border-black rounded shadow text-center">
                            <p class="col m-0 fs-4">Need a location to find and auction houses, but without a third-party?</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container container-xl text-center mt-4 pt-2 pb-2 bg-body-secondary rounded shadow border border-black">
                <div class="row pb-2">
                    <h3>Trust Us Today!</h3>
                </div>
                <div class="row gap-4 justify-content-center">
                    <div class="col-8 d-grid">
                        <button type="button" class="btn btn-primary btn-lg">Login</button>
                    </div>
                    <div class="col-8 d-grid">
                        <button type="button" class="btn btn-primary btn-lg">Find Next Home!</button>
                    </div>
                    <div class="col-8 d-grid">
                        <button type="button" class="btn btn-outline-primary btn-lg">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeView",
    }
</script>

<style scoped>
    .hero-image {
        max-height: 500px;
    }
</style>