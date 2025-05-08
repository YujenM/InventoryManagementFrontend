<template>
    <div class="landing-wrapper">
      <!-- Admin Section -->
      <div class="half-section admin-section">
        <v-card class="portal-card" elevation="10" color="deep-purple-lighten-2">
          <v-card-title class="text-h5 text-center">Admin Portal</v-card-title>
          <v-card-text class="text-center">Manage inventory and add products.</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="btnColor" to="/AdminSignup">continue</v-btn>
          </v-card-actions>
        </v-card>
      </div>
  
      <!-- User Section -->
      <div class="half-section user-section">
        <v-card class="portal-card" elevation="10" color="blue-accent-1">
          <v-card-title class="text-h5 text-center">User Portal</v-card-title>
          <v-card-text class="text-center">Browse and purchase products easily.</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="btnColor" to="/UserSignup">continue</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>
  
  <script setup>
  // No logic needed
  </script>
  
  <style scoped>
  .btnColor{
    background-color:#2E7D32;
    color: white;
  }
  .landing-wrapper {
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
  }
  
  .half-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-size: cover;
    background-position: center;
  }
  
  /* Admin background */
  .admin-section {
    background-image: url('https://res.cloudinary.com/dbozigpgf/image/upload/v1746427902/admin_wjprtz.webp');
  }
  
  /* User background */
  .user-section {
    background-image: url('https://res.cloudinary.com/dbozigpgf/image/upload/v1746427903/user_yyabsi.webp');
  }
  
  /* Card styling */
  .portal-card {
    max-width: 400px;
    width: 100%;
    padding: 20px;
  }
  
  @media (max-width: 960px) {
    .landing-wrapper {
      flex-direction: column;
    }
  
    .half-section {
      height: 50vh;
      padding: 20px;
    }
  
    .portal-card {
      max-width: 90%;
    }
  }
  
  @media (max-width: 480px) {
    .half-section {
      height: auto;
      padding: 15px;
    }
  
    .portal-card {
      padding: 16px;
      font-size: 0.9rem;
    }
  
    .v-btn {
      width: 100%;
    }
  }
  </style>
  