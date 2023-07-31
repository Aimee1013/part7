import { useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const data = await axios.get(baseUrl).then((res) => res.data);
    console.log("111", data);
    setResources(data);
  };

  const create = async (resource) => {
    const personsData = await axios
      .post(baseUrl, resource)
      .then((res) => res.data);
    console.log("personsData", personsData);
    setResources([...resources, personsData]);
  };

  const service = {
    getAll,
    create,
  };

  return [resources, service];
};
