<template>
    <v-card class="px-5 py-5 my-1" elevation="2" rounded="xl" max-width="100%">
      <div class="d-flex justify-space-between align-center">
        <v-avatar color="red-darken-1" size="48">
          <v-icon size="28" color="white">{{ icon }}</v-icon>
        </v-avatar>
        <div class="text-right">
          <div class="text-subtitle-2 text-grey-darken-1">{{ title }}</div>
          <div class="text-h6 font-weight-bold">{{amount}}</div>
          <div class="d-flex align-center justify-end text-success text-caption">
            <v-icon size="16" class="me-1">{{ percentageicon }}</v-icon>
            {{percentage}}
          </div>
        </div>
      </div>
  
      <div class="text-caption text-grey-darken-1 mt-2">{{comparison}}</div>
    </v-card>
  </template>

  <script setup>
  defineProps({
    title:{
      type:String,
      default:"Total Orders"
    },
    icon:{
      type:String,
      default:"mdi-shopping"
    },
    amount:{
      type:String,
      default:"₹126.500"
    },
    percentage:{
      type:String,
      default:"34.7%"
    },
    comparison:{
      type:String,
      default:"Compared to last month"
    },
    percentageicon:{
      type:String,
      default:"mdi-arrow-up"
    }
  })
</script>
