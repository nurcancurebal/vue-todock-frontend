// ? Node modules.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

axios.interceptors.request.use(config => {

  const authToken = localStorage.getItem('token');

  if (authToken) {

    config.headers.Authorization = `Bearer ${authToken}`;
  };
  return config;
});

axios.interceptors.response.use(function (response) {

  return response;

}, function (error) {

  if (error?.response?.status == 401) {

    localStorage.removeItem("token");
    this.$router.push("SignIn");
  };
  return Promise.reject(error);
});

// ? Inits.
Vue.use(Vuex);

const state = {
  user: {},
  todo: [],
  todoItem: [],
};

const getters = {

  todo(state) {

    return state.todo
  },

  user(state) {
    return state.user
  }
};

const mutations = {

  TODO(state, context) {

    state.todo = context;
  },

  USER(state, context) {
    state.user = context
  }
};

const actions = {

  async getTodo(context) {

    try {

      const result = await axios
        .get("http://localhost:3000/todo");

      console.log("getTodo", result.data);

      context.commit("TODO", result.data);

      return result;

    } catch (error) {

      console.error("getTodo", error);

    };
  },

  async createTodo(context, payload) {

    try {

      const result = await axios.post("http://localhost:3000/todo", payload);

      console.log("createTodo", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("createTodo", error);

    };
  },

  async updateTodo(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/todo/${payload._id}`, payload);

      console.log("updateTodo", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("updateTodo", error);

    };
  },

  async deleteTodo(context, payload) {

    try {

      const result = await axios.delete(`http://localhost:3000/todo/${payload}`);

      console.log("deleteTodo", result.status);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("deleteTodo", error);

    };
  },

  async createTodoItem(context, payload) {

    try {

      const result = await axios.post(`http://localhost:3000/todo-item/${payload._id}`, payload);

      console.log("createTodoItem", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("createTodoItem", error);

    };
  },

  async updateTodoItem(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/todo-item/${payload.todoId}/${payload.itemId}`, payload.name);

      console.log("updateTodoItem", result.data);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("updateTodoItem", error);

    };
  },

  async deleteTodoItem(context, payload) {

    try {

      const result = await axios.delete(`http://localhost:3000/todo-item/${payload.todoId}/${payload.itemId}`);

      console.log("deleteTodoItem", result.status);

      context.dispatch("getTodo");

      return result;

    } catch (error) {

      console.error("deleteTodoItem", error);

    };
  },

  async signUp(context, payload) {

    try {

      return await axios.post("http://localhost:3000/auth/signup", payload);

    } catch (error) {

      console.error("signUp", error);

    };
  },


  async signIn(context, payload) {

    try {

      return await axios.post("http://localhost:3000/auth/signin", payload);

    } catch (error) {

      console.error(error);

    };
  },

  async updateUser(context, payload) {

    try {

      const result = await axios.put(`http://localhost:3000/user`, payload);

      console.log("updateUser", result.data);

      context.dispatch("getUser");

      return result;

    } catch (error) {

      console.error("updateUser", error);

    };
  },

  async getUser(context) {

    try {

      const result = await axios
        .get("http://localhost:3000/user");

      console.log("getUser", result.data);

      context.commit("USER", result.data);

      return result;

    } catch (error) {

      console.error("getUser", error);

    };
  },
};

export default new Vuex.Store({ state, getters, mutations, actions });