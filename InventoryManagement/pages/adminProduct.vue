<template>
    <v-app class="bg-grey-lighten-3">
        <div class="d-flex flex-wrap justify-space-between align-center px-4 py-2">
            <h1>All Products</h1>
            <V-btn class="addBtn" @click="addProduct=true" >Add Products <v-icon color="red-lighten-1">mdi-plus</v-icon></V-btn>
        </div>
        <v-dialog v-model="addProduct" max-width="500">
            <v-card>
                <v-card-title class="d-flex justify-center mx-3 mt-3 text-red-darken-1" >Add New Product</v-card-title>
                <v-card-text>
                <v-form ref="form" v-model="isFormValid">
                    
                    <v-text-field v-model="product.name" label="Product Name" append-inner-icon="mdi-shopping" :rules="[v => !!v || 'Product name is required']" ></v-text-field>
                    <v-textarea v-model="product.description" label="Product Description" append-inner-icon="mdi-file-multiple" :rules="[v => !!v || 'Product Description is required']"></v-textarea>
                    <v-text-field v-model="product.price" label="Product Price" type="number" append-inner-icon="mdi-currency-inr" :rules="[v => !!v || 'Product price is required']"></v-text-field>
                    <v-text-field v-model="product.stock" label="Product Stock" type="number" append-inner-icon="mdi-cube" :rules="[v => !!v || 'Product Stock is required']"></v-text-field>
                    <v-file-input v-model="product.itemImage" label="Product Image" accept="image/*" :rules="[v => !!v || 'Product Image is required']" ></v-file-input>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click="submitBtn">Submit</v-btn>
                
            </v-card-actions>
            </v-card>
            
        </v-dialog>
        <ProductCard  />
        
        
    </v-app>

</template>

<style scoped>
.addBtn:active{
    background-color: #EF5350!important;
    color: white!important;
}
</style>
<script setup>
import { ref } from 'vue';
import { adminAddProduct } from '@/Api/adminAddProduct';
import ProductCard from '@/components/ProductCard.vue';
const isFormValid = ref(false);
const addProduct=ref(false);
const product=ref({
    name:'',
    description:'',
    price:'',
    stock:'',
    itemImage:null
})
const resetProduct = () => {
    product.value = {
        name: '',
        description: '',
        price: '',
        stock: '',
        itemImage: null
    };
};
const submitBtn=async()=>{
    if(!isFormValid.value) {
        console.log('Please Fill all the fields');
        return;
    }
    const response=await adminAddProduct({
        name: product.value.name,
        description: product.value.description,
        price: product.value.price,
        stock: product.value.stock,
        itemImage: product.value.itemImage
    })
    if (response.status===200){
        console.log('Product added successfully');
    } else {
        console.error('Error adding product:', response);
    }
    console.log('Product submitted', product.value);

    addProduct.value = false;
    resetProduct();
}


</script>
