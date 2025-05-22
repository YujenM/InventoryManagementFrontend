<template>
  <v-app class="bg-grey-lighten-3">
    <SideNav>
      <router-view />
    </SideNav>
  </v-app>
</template>

<script setup>
import SideNav from '@/components/Navbar.vue';
</script>
