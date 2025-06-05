<template>
  <v-app class="bg-grey-lighten-3">
    <div class="d-flex flex-wrap justify-space-between align-center px-4 py-2">
      <h1>All Products</h1>
      <v-btn class="addBtn" @click="addProduct = true">
        Add Products
        <v-icon color="red-lighten-1">mdi-plus</v-icon>
      </v-btn>
    </div>

    <!-- Add Product Dialog -->
    <v-dialog v-model="addProduct" max-width="500">
      <v-card>
        <v-card-title class="d-flex justify-center mx-3 mt-3 text-red-darken-1">
          Add New Product
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="isFormValid">
            <v-text-field
              v-model="product.name"
              label="Product Name"
              append-inner-icon="mdi-shopping"
              :rules="[v => !!v || 'Product name is required']"
            />
            <v-textarea
              v-model="product.description"
              label="Product Description"
              append-inner-icon="mdi-file-multiple"
              :rules="[v => !!v || 'Product Description is required']"
            />
            <v-text-field
              v-model="product.price"
              label="Product Price"
              type="number"
              append-inner-icon="mdi-currency-inr"
              :rules="[v => !!v || 'Product price is required']"
            />
            <v-text-field
              v-model="product.stock"
              label="Product Stock"
              type="number"
              append-inner-icon="mdi-cube"
              :rules="[v => !!v || 'Product Stock is required']"
            />
            <v-file-input
              v-model="product.itemImage"
              label="Product Image"
              accept="image/*"
              :rules="[v => !!v || 'Product Image is required']"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              :disabled="submitting"
              :loading="submitting"
              @click="submitBtn"
            >
              Submit
            </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Product List Display -->
    <v-container fluid class="pa-4">
        <v-row dense>
            <v-col
            v-for="product in desserts"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            >
            <ProductCard
                :productId="product.id"
                :ptitle="product.name"
                :pprice="product.price"
                :pdescription="product.description"
                :pRemaning="product.stock"
                :pImage="product.itemImage"
                @deleted="removeProduct"
                @edited="updateProduct"
            />
            </v-col>
        </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { adminAddProduct } from '@/Api/adminAddProduct';
import { adminGetProduct } from '@/Api/adminGetProduct';

const isFormValid = ref(false);
const addProduct = ref(false);

// Product form data
const product = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  itemImage: null
});

// Reset product form
const resetProduct = () => {
  product.value = {
    name: '',
    description: '',
    price: '',
    stock: '',
    itemImage: null
  };
};

// Fetch all products
const desserts = ref([]);
const fetchProducts = async () => {
  try {
    const res = await adminGetProduct();

    if (res.success && Array.isArray(res.response)) {
      desserts.value = res.response.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        itemImage: product.itemImage || null 
      }));

    } else {
      console.warn('Response did not contain valid product data.');
    }
  } catch (err) {
    console.error('Error fetching products:', err);
  }
};

onMounted(fetchProducts);

// Submit new product
const submitting = ref(false);
const submitBtn = async () => {
  if (!isFormValid.value) {
    console.log('Please fill all the fields correctly.');
    return;
  }

  let imageFile = product.value.itemImage;

  if (!imageFile || !(imageFile instanceof File)) {
    console.log('Please upload a valid image.');
    return;
  }

  submitting.value = true; 

  const formData = new FormData();
  formData.append('name', product.value.name);
  formData.append('description', product.value.description);
  formData.append('price', product.value.price);
  formData.append('stock', product.value.stock);
  formData.append('itemImage', imageFile);

  const token = localStorage.getItem('token');
  const response = await adminAddProduct(formData, token);

  if (response.status === 200) {
    await fetchProducts();
  } else {
    console.error('Error adding product:', response);
  }

  submitting.value = false; 
  addProduct.value = false;
  resetProduct();
};


const removeProduct = (productId) => {
  desserts.value = desserts.value.filter((product) => product.id !== productId);
};

const updateProduct = (updatedProduct) => {
  const index = desserts.value.findIndex(product => product.id === updatedProduct.id);
  if (index !== -1) {
    const updated = {
      id: updatedProduct.id,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
      itemImage: updatedProduct.image,
    };
    desserts.value.splice(index, 1, updated);
  }
};

</script>

<style scoped>
.addBtn:active {
  background-color: #ef5350 !important;
  color: white !important;
}
</style>
