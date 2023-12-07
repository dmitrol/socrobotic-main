import type { Form } from "@/types/general";
import type { User } from "@/types/user";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<User | null>(null);
    const loading = ref<boolean>(false);
    const status = ref<string>("");

    const login = async (data: Form): Promise<void> => {
      const { login, password } = data;
      status.value = "";
      loading.value = true;
      try {
        console.log("Test");
        const res = await axios.post("auth/login", {
          login,
          password,
        });
        console.log(res);
        user.value = {
          name: res.data.name,
          email: res.data.email,
          token: res.data.token,
          userRole: res.data.role,
          userName: res.data.name,
        };

        localStorage.setItem("token", user.value.token);

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + user.value.token;

        status.value = "success";
      } catch (error) {
        status.value = "error";
        user.value!.token = "";
      } finally {
        loading.value = false;
      }
    };

    const logout = (): void => {
      status.value = "";
      user.value = null;
      delete axios.defaults.headers.common["Authorization"];
    };

    return {
      user,
      login,
      status,
      loading,
      logout,
    };
  },
  { persist: true }
);

// export const useUserStore = defineStore("user", {
//   state: () => ({
//     user: ref<User | null>(null),
//     loading: ref<boolean>(false),
//     status: ref<string>(""),
//   }),
//   actions: {
//     async login(data: Form): Promise<void> {
//       const { login, password } = data;
//       this.status = "";
//       this.loading = true;
//       try {
//         console.log("Test");
//         const res = await axios.post("auth/login", {
//           login,
//           password,
//         });
//         console.log(res);
//         this.user = {
//           name: res.data.name,
//           email: res.data.email,
//           token: res.data.token,
//           userRole: res.data.role,
//           userName: res.data.name,
//         };

//         localStorage.setItem("token", this.user.token);

//         axios.defaults.headers.common["Authorization"] =
//           "Bearer " + this.user.token;

//         this.status = "success";
//       } catch (error) {
//         this.status = "error";
//         this.user!.token = "";
//       } finally {
//         this.loading = false;
//       }
//     },
//     logout () {
//       console.log("logout");
//     },
//   },
// });
