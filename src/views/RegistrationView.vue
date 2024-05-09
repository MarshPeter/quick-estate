<template>
    <div class="container-sm pt-4">
        <h1 class="pb-2 fs-4">Registration</h1>
        <form @submit="register" class="container p-4 border border-black rounded shadow">
            <div class="row">
                <div class="col">
                    <div class="form-group pb-2">
                        <label for="firstname" class="pb-1">First Name: </label>
                        <input type="text" class="form-control" id="firstname" placeholder="Enter First Name" v-model="firstName" required>
                    </div>
                    <div class="form-group pb-2">
                        <label for="lastName" class="pb-1">Last Name: </label>
                        <input type="text" class="form-control" id="lastName" placeholder="Enter Display Name" v-model="lastName" required>
                    </div>
                    <div class="form-group pb-2">
                        <label for="email" class="pb-1">Email: </label>
                        <input type="email" class="form-control" id="email" placeholder="Enter Display Name" v-model="email" required>
                    </div>
                    <div class="form-group pb-2">
                        <label for="phoneNumber" class="pb-1">Phone Number (optional): </label>
                        <input type="text" class="form-control" id="phoneNumber" placeholder="Enter Display Name" v-model="phoneNumber" >
                    </div>
                    <div class="form-group pb-2">
                        <label for="displayName" class="pb-1">Display Name: </label>
                        <input type="text" class="form-control" id="displayName" placeholder="Enter Display Name" v-model="displayName" required>
                    </div>
                    <div class="form-group pb-2">
                        <label for="password" class="pb-1">Password: </label>
                        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" required>
                    </div>
                    <div class="form-group pb-4">
                        <label for="confirm-password" class="pb-1">Confirm Password: </label>
                        <input type="password" class="form-control" id="confirm-password" placeholder="Password" v-model="confirmPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    // TODO: IMPLEMENT POSTING ERRORS TO USER
    export default {
        name: "RegistrationView",
        data() {
            return {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                displayName: "",
                password: "",
                confirmPassword: "",
                errors: [],
            }
        },
        methods: {
            register(e) {
                e.preventDefault();
                this.validateInputs();
            },
            validateInputs() {
                this.errors = [];
                this.validateFirstName();
                this.validateLastName();
                this.validateEmail();
                this.validatePhoneNumber();
                this.validateDisplayName();
                this.validatePassword();

                if (this.errors.length !== 0) {
                    console.log(this.errors);
                    return;
                }

                this.createAccount();
            },
            validateFirstName() {
                const regex = /^[a-zA-Z]+$/;
                if (this.firstName.length > 20) {
                    this.errors.push("Cannot have a first name longer than 20 characters. Please shorten it.");
                }
                if (!this.firstName.match(regex)) {
                    this.errors.push("First name must only contain alphabetical characters");
                }
            },
            validateLastName() {
                const regex = /^[a-zA-Z]+$/;
                if (this.lastName.length > 20) {
                    this.errors.push("Cannot have a last name longer than 20 characters. Please shorten it.");
                }
                if (!this.lastName.match(regex)) {
                    this.errors.push("Last name must only contain alphabetical characters");
                }
            },
            validateEmail() {
                // TODO: IMPLEMENT THIS PROPERLY WHEN I HAVE TIME
            },
            validatePhoneNumber() {
                const regex = /^[0-9]+$/;

                if (!this.phoneNumber) {
                    return
                }

                if (!this.phoneNumber.match(regex)) {
                    this.errors.push("Phone Number must only inlclude digits");
                }

            },
            validateDisplayName() {
                const regex = /^[a-zA-Z0-9]+$/;
                if (this.displayName.length < 8) {
                    this.errors.push("Cannot have a display name shorter than 8 characters. Please increase it.");
                }
                if (this.displayName.length > 20) {
                    this.errors.push("Cannot have a display name longer than 20 characters. Please shorten it.");
                }
                if (!this.displayName.match(regex)) {
                    this.errors.push("Last name must only contain alphanumerical characters");
                }
            },
            validatePassword() {
                const regex = /^[a-zA-Z0-9]+$/;
                if (this.password.length < 8) {
                    this.errors.push("Cannot have a password shorter than 8 characters. Please increase it.");
                }
                if (this.password.length > 20) {
                    this.errors.push("Cannot have a password name longer than 20 characters. Please shorten it.");
                }
                if (!this.password.match(regex)) {
                    this.errors.push("Last name must only contain alphanumerical characters");
                }
                if (this.password !== this.confirmPassword) {
                    this.errors.push("Both password fields must match. Please check for mistakes");
                }
            },
            createAccount() {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: this.firstName,
                        lastName: this.firstName,
                        email: this.email,
                        displayName: this.displayName,
                        phone: this.displayName ? this.displayName : null,
                        password: this.password,
                    })
                }

                let status = null;

                fetch(`http://localhost:3000/api/create-account`, requestOptions)
                    .then(res => {
                        status = res.status;
                        return res.json();
                    })
                    .then(data => {
                        if (status !== 200) {
                            this.errors.push(data.err);
                        } else {
                            this.$emit("authenticated", true);
                            localStorage.setItem('user_id', data.id);
                            this.$router.go(0);
                        }
                    });
            }
        },
        mounted() {
            if (localStorage.getItem("user_id")) {
                this.$router.push({name: "home"});
            }
        }
    }
</script>