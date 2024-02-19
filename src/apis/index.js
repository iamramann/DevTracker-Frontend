import axios from "axios";

const values = {
  taskTypes: "values/get-tasks-type",
  associates: "values/get-associates",
};

const workDetail = {
  get: "workDetail/get",
  add: "workDetail/add",
};

function getdata(endPoint) {
  return axios
    .get(`/api/${endPoint}`)
    .then(({ data }) => data)
    .catch(({ response }) => {
      throw new Error(response.data);
    });
}

function postdata(endPoint, payload) {
  return axios
    .post(`/api/${endPoint}`, payload)
    .then(({ data }) => data)
    .catch(({ response }) => {
      throw new Error(response.data);
    });
}

export default {
  getTaskTypes: function () {
    return getdata(values.taskTypes);
  },

  getAssociates: function () {
    return getdata(values.associates);
  },

  getWorkDetails: function (pageNumber = 1) {
    return getdata(`${workDetail.get}?pageNumber=${pageNumber}`);
  },

  addWorkDetails: function (payload) {
    return postdata(workDetail.add, payload);
  },
};
