<template>
    <v-container fluid class="fill-height pa-0">
        <v-row no-gutters>
            <!-- left login Form  -->
            <v-col cols="12" md="6" class="d-flex justify-center align-center">
                <v-card class="pa-6 pa-md-10 w-100 mx-4 mx-md-10" style="background-color: #fff;">
                    <h2 class="text-h4 text-center text-red ">Log In</h2>
                    
                    <v-text-field 
                        v-model="email"
                        label="Email"
                        variant="outlined"
                        density="comfortable"
                        class="mb-4 mt-4"
                        append-inner-icon="mdi-email">
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        variant="outlined"
                        density="comfortable"
                        class="mt-4"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showPassword = !showPassword"
                        />
                    
                    <div class="text-end  text-caption mb-4">
                        <a href="#" class="text-red">Forgot Password?</a>
                    </div>
                    <div class="d-flex justify-center">
                        <v-btn style="color:red" class="mb-3" @click="handleSubmit" >LogIn</v-btn>
                    </div>
                    <div class="text-center mt-5">
                        <p class="mt-2 ">Already Have An account?</p>
                        <router-link to="/UserSignup" class=" text-red" >
                            SignIn
                        </router-link>
                    </div>

                    <div class="d-flex align-center my-5">
                        <v-divider class="flex-grow-1 mx-4" color="red"></v-divider>
                        <span class="text-caption">or</span>
                        <v-divider class="flex-grow-1 mx-4" color="red"></v-divider>
                    </div>
        
                    <div class="d-flex justify-center">
                        <v-btn class="mx-2" icon color="red darken-1">
                            <v-icon>mdi-google</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" icon color="indigo darken-4">
                            <v-icon>mdi-facebook</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" icon color="blue lighten-2">
                            <v-icon>mdi-twitter</v-icon>
                        </v-btn>
                    </div>
                </v-card>
            </v-col>
            <!-- right login form -->
            <v-col cols="12" md="6" class="d-none d-md-flex pa-0" style="overflow: hidden;">
                <v-img
                    src="../src/assets/images/UserImage.png"
                    class="full-height full-width"
                    cover>
                </v-img>

            </v-col>
            <v-col>
                
            </v-col>
        </v-row>    

    </v-container>

</template>
<style scoped>
    .fill-height {
    min-height: 100vh;
    }
    .full-height {
    height: 100vh !important;
    }
    .full-width {
    width: 100% !important;
    }
</style>

<script setup>
import { ref } from 'vue'
import { loginUser } from '../src/Api/login.js';
import {useRouter} from 'vue-router';
const password = ref('')
const showPassword = ref(false)

const router=useRouter();
const email=ref('');
const errorMessage=ref('');

const handleSubmit=async()=>{
    const response = await loginUser({
        email:email.value,
        password:password.value 
    });

    if(response.status === 200){
        router.push('/UserDashboard');
    }
    else {
        console.log("Status Code", response.status);
        console.log("Error Message", response.message);
    }
}
</script>