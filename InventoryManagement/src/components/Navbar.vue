<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <v-btn icon @click="closeSidebar" class="close-btn">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <div class="px-2 py-2 mt-10">
        <div class="sidebar-title">
          <h2 class="nav-title text-red-darken-1 mb-3">Admin</h2>
        </div>
        <nav>
          <ul>
            <!-- <li class="nav-li"><router-link to="/adminDashboard"class="router-li">Dashboard</router-link></li> -->
            <li v-for="item in navItem" :key="item.id" class="nav-li mt-5">
              <router-link :to="item.path" class="router-li">
                <v-icon class="">{{ item.icon }}</v-icon>
                {{ item.name }}
              </router-link>

            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <v-icon class="toggle-btn" @click="toggleSidebar">mdi-menu</v-icon>
      <slot /> 
    </div>
  </div>
</template>

<script>
import navItem  from '@/assets/json/navbar'
console.log(navItem)
export default {

  name: 'SideNav',
  data() {
    return {
      isSidebarOpen: true,
      navItem
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
  },
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 300px;
  background-color: white;
  padding: 1rem;
  transition: transform 0.3s ease;
  z-index: 1000;
  transform: translateX(-100%);
}
.sidebar.sidebar-open {
  transform: translateX(0);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  display:none;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.toggle-btn {
  display: none;
  margin-bottom: 1rem;
}
.nav-li{
  list-style: none;
  text-decoration: none !important;
  color: red;
  width: 100%;
}
.router-li {
  display: block;                  
  text-decoration: none !important;
  color: #616161;
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 100%;                     
  box-sizing: border-box;       
}
.router-li:hover{
  color: #F5F5F5;
  background-color: #D32F2F;
  padding:0.5rem;
  width: 100%;
  box-sizing: border-box;
  border-radius: 15px;
}

/* Show toggle button only on small screens */
@media (max-width: 768px) {
  .close-btn{
    display: block;
  }
  .toggle-btn {
    display: inline-block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
  }

  .main-content {
    padding: 1rem;
  }
}
</style>
