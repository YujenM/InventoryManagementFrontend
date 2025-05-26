<template>
    <v-card class="pa-4" elevation="0" max-width="400" color="bg-red-darken-1">
        <div class="d-flex align-center mb-2">
        <v-avatar size="80" class="me-4">
            <v-img src="https://res.cloudinary.com/dbozigpgf/image/upload/v1748252232/inventory_items/1748252225823-images.jpeg.jpg" alt="product" />
        </v-avatar>
        <div>
            <h3 class="text-subtitle-1 font-weight-bold mb-1">{{ ptitle }}</h3>
            <p class="text-body-1 font-weight-bold">₹{{ pprice }}</p>
        </div>
        <v-btn icon  variant="text" class="ms-auto" @click.stop="menu = true">
        <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
        <v-menu v-model="menu" activator="parent" location="bottom end">
        <v-list>
            <v-list-item @click="handleEdit(product)">
            <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="handleDelete(product.id)">
            <v-list-item-title class="text-red">Delete</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-menu>

        </div>

        <div class="mb-4">
        <p class="text-subtitle-2 font-weight-medium">Description</p>
        <p class="text-body-2 text-grey-darken-1">
           {{ pdescription }}
        </p>
        </div>

        <v-divider class="mb-3" />

        <v-row no-gutters>
        <v-col cols="12" class="d-flex justify-space-between align-center mb-2">
            <span class="text-caption">Sales</span>
            <div class="d-flex align-center">
            <v-icon size="16" color="green">mdi-arrow-up</v-icon>
            <span class="ms-1 text-caption font-weight-medium">1269</span>
            </div>
        </v-col>

        <v-col cols="12" class="d-flex justify-space-between align-center">
            <span class="text-caption">Remaining Products</span>
            <div class="d-flex align-center">
            <v-progress-linear
                model-value="100"
                height="6"
                color="orange"
                class="me-2"
                style="width: 50px"
            ></v-progress-linear>
            <span class="text-caption font-weight-medium">{{ pRemaning }}</span>
            </div>
        </v-col>
        </v-row>
    </v-card>
</template>
<script setup>
const props = defineProps({
    ptitle: {
        type: String,
        default: 'Product Name'
    },
    pprice:{
        type:String,
        default:"0"
    },
    pdescription:{
        type:String,
        default:"This is a Product"
    },
    pRemaning:{
        type:String,
        default:"0"
    }
    
});
import { ref } from 'vue';
import { stringifyQuery } from 'vue-router';
const menu=ref(false);
const editProductDialog = ref(false);
const selectedProduct = ref({});

const handleEdit = (product) => {
    selectedProduct.value = { ...product };  
    editProductDialog.value = true;
};
const handleDelete = (productId) => {
    // Call delete API here
    console.log('Deleting product with ID:', productId);
};

</script>