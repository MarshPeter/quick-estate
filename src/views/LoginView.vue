<template>
    <div class="container-sm pt-4">
        <h1 class="pb-2 fs-4">Login</h1>
        <form @submit="login" class="container p-4 border border-black rounded shadow">
            <div class="row">
                <div class="col">
                    <div class="form-group pb-2">
                        <label for="exampleInputEmail1" class="pb-1">Display Name: </label>
                        <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Display Name" v-model="displayName" required>
                    </div>
                    <div class="form-group pb-4">
                        <label for="exampleInputPassword1" class="pb-1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password" required>
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
        props: {
            authenticated: Boolean
        },
        name: "LoginView",
        data() {
            return {
                displayName: "",
                password: "",
                errors: [],
            }
        },
        methods: {
            login(e) {
                e.preventDefault();
                this.errors = [];
                this.validateFields();
                if (this.errors.length !== 0) {
                    return;
                }

                this.getId();
            },
            validateFields() {
                this.validateDisplayName();
                this.validatePassword();
            },
            validateDisplayName() {
                console.log(this.displayName);
                const reg = /^[a-zA-Z0-9]+$/;
                if (this.displayName.length > 20) {
                    this.errors.push("Display Name is too long. Should a most contain 20 characters");
                }
                if (!this.displayName.match(reg)) {
                    this.errors.push("Display Name should only contain letters and numbers");
                }
            },
            validatePassword() {
                console.log(this.password);
                const reg = /^[a-zA-Z0-9]+$/;
                if (this.password.length > 20) {
                    this.errors.push("Password is too long. Should at most be 20 characters");
                }
                if (!this.password.match(reg)) {
                    this.errors.push("Password should only contain letters and numbers")
                }
            },
            getId() {
                const url = `http://localhost:3000/api/confirm-login/${this.displayName}/${this.password}`;
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        if (data.id) {
                            this.$emit("authenticated", true);
                            localStorage.setItem('user_id', data.id);
                            this.$router.go(0);
                        }

                        if (data.err) {
                            this.errors.push("Couldn't validate your credentials on server. Make sure you have entered the correct matching displayName and password");
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