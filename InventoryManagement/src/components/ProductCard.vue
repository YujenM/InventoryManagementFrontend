<template>
  <v-card class="pa-4" elevation="0" height="300" max-height="400" max-width="400" color="bg-red-darken-1">
    <div class="d-flex align-center mb-2">
      <v-avatar size="80" class="me-4">
        <v-img :src="pImage" alt="product" />
      </v-avatar>
      <div>
        <h3 class="text-subtitle-1 font-weight-bold mb-1">{{ ptitle }}</h3>
        <p class="text-body-1 font-weight-bold">₹{{ pprice }}</p>
      </div>
      <v-btn icon variant="text" class="ms-auto" @click.stop="menu = true">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-menu v-model="menu" activator="parent" location="bottom end">
        <v-list>
          <v-list-item @click="openEditModal">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleDelete(productId)">
            <v-list-item-title class="text-red">Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="mb-10 h-25" color="bg-red-lighten-1">
      <p class="text-subtitle-2 font-weight-medium">Description</p>
      <p class="text-body-2 text-grey-darken-1">{{ sliceDescription(pdescription) }}</p>
    </div>
    <v-spacer></v-spacer>
    <v-divider class="mb-3" />
    
    <v-row no-gutters class="">
      
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
            :model-value="pRemaning"
            height="6"
            color="orange"
            class="me-2"
            style="width: 50px"
          ></v-progress-linear>
          <span class="text-caption font-weight-medium">{{ pRemaning }}</span>
        </div>
      </v-col>
    </v-row>

    <!-- Edit Modal -->
    <v-dialog v-model="editProductDialog" max-width="500">
      <v-card>
        <v-card-title class="justify-center text-red-darken-1">
          Edit Product
        </v-card-title>
        <v-card-text>
          <v-avatar size="100" class="mx-auto mb-3">
            <v-img :src="editForm.itemImagePreview || pImage" />
          </v-avatar>
          <v-form ref="editFormRef" v-model="isEditFormValid">
            <v-text-field v-model="editForm.name" label="Product Name" />
            <v-textarea v-model="editForm.description" label="Description" />
            <v-text-field v-model="editForm.price" label="Price" type="number" />
            <v-text-field v-model="editForm.stock" label="Stock" type="number" />
            <v-file-input
              v-model="editForm.itemImage"
              label="Product Image"
              accept="image/*"
              @change="handleImagePreview"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="red darken-1" @click="submitEdit(productId)">Save Changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { adminDeleteProduct } from '@/Api/adminDeleteProduct';
import { adminUpdateProduct } from '@/Api/adminUpdateProduct';
const sliceDescription=(description)=>{
  if (description.length > 100) {
    return description.slice(0, 100) + '...';
  }
  return description;
}

const props = defineProps({
  productId: [String, Number],
  ptitle: String,
  pprice: [String,Number],
  pdescription: String,
  pRemaning: [String,Number],
  pImage: String,
});

const emit = defineEmits(['deleted', 'edited']);

const menu = ref(false);
const editProductDialog = ref(false);
const isEditFormValid = ref(false);
const editFormRef = ref(null);

const editForm = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  itemImage: null,
  itemImagePreview: ''
});

const openEditModal = () => {
  editForm.value = {
    name: props.ptitle,
    description: props.pdescription,
    price: props.pprice,
    stock: props.pRemaning,
    itemImage: null,
    itemImagePreview: props.pImage
  };
  editProductDialog.value = true;
};

const handleDelete = (productId) => {
  adminDeleteProduct(productId).then(() => {
    emit('deleted', productId);
  });
};

const handleImagePreview = (file) => {
  if (file && file instanceof File) {
    const reader = new FileReader();
    reader.onload = e => {
      editForm.value.itemImagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitEdit = async (productId) => {
  const formData = new FormData();
  formData.append('name', editForm.value.name);
  formData.append('description', editForm.value.description);
  formData.append('price', editForm.value.price);
  formData.append('stock', editForm.value.stock);
  if (editForm.value.itemImage) {
    formData.append('itemImage', editForm.value.itemImage);
  }

  const response = await adminUpdateProduct(formData, productId);
  editProductDialog.value = false;
  emit('edited', {
      id: productId,
      name: editForm.value.name,
      description: editForm.value.description,
      price: editForm.value.price,
      stock: editForm.value.stock,
      image: editForm.value.itemImagePreview || props.pImage
    });
 
};
</script>
