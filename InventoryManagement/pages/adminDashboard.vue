<template>
  <v-app class="bg-grey-lighten-3">
    <h1 class="px-4 py-2">Dashboard</h1>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(item, i) in card"
          :key="i"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <AdminCard v-bind="item" />
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <h2 class="px-2 py-2">Recent Orders</h2>
      <v-table
        height="500px"
        fixed-header
      >
        <thead>
          <tr>
            <th class="text-left">
              Product
            </th>
            <th class="text-left">
              OrderId
            </th>
            <th class="text-left">
              Date
            </th>
            <th class="text-left">
              Customer Name
            </th>
            <th class="text-left">
              Status
            </th>
            <th class="text-left">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in desserts"
            :key="item.name"
          >
            <td>{{ item.name }}</td>
            <td>{{ item.orderId }}</td>
            <td>{{ item.Date }}</td>
            <td>{{ item.CustomerName }}</td>
            <td ><div class="bg-yellow-darken-1 rounded-xl d-flex justify-center w-50 h-50 py-1">{{ item.Status }}</div></td>
            <td>{{ item.Amount}}</td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </v-app>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import AdminCard from '@/components/AdminCard.vue';
import { getAdminOrder } from '@/Api/getAdminOrder';


const card = [
  {
    title: "Total Orders",
    icon: "mdi-shopping",
    amount: "₹126.500",
    percentage: "31%",
    percentageIcon: "mdi-arrow-up",
  },
  {
    title: "Total Sales",
    icon: "mdi-currency-usd",
    amount: "₹126.500",
    percentage: "34.7%",
    percentageIcon: "mdi-arrow-up",
  },
  {
    title: "Total Products",
    icon: "mdi-package-variant-closed",
    amount: "100",
    percentage: "34.7%",
    percentageIcon: "mdi-arrow-up",
  },
  {
    title: "Total Customers",
    icon: "mdi-account-multiple",
    amount: "200",
    percentage: "34.7%",
    percentageIcon: "mdi-arrow-up",
  }
];

const desserts = ref([]); 

onMounted(async () => {
  try {
    const res = await getAdminOrder();
    if (res.success && Array.isArray(res.response)) {
      desserts.value = res.response.map(order => ({
        name: order.Item?.name || 'N/A',
        orderId: order.Order.id,
        Date: new Date(order.Order.createdAt).toLocaleDateString(),
        CustomerName: order.Order.User.name || 'Unknown',
        Status: order.status || 'Pending',
        Amount: `₹${order.Item.price || 0}`
      }));
    }
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }
});
</script>

  