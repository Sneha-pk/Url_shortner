import React, { useEffect, useState } from "react";
import FormContainer from "../FormContainer/FormContainer";
import axios from "axios";
import { serverURL } from "../../helpers/Constants";
import DataTable from "../DataTable/DataTable";
import { UrlData } from "../../interface/UrlData";

const Container = () => {
  const [data, setData] = useState<UrlData[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const fetchUrlData = async () => {
    const response = await axios.get(`${serverURL}/shortUrl`);
    console.log("res", response);
    setData(response?.data);
  };
  const updateReload = () => {
    setReload(true);
  };

  useEffect(() => {
    fetchUrlData();
  }, [reload]);
  return (
    <div>
      <FormContainer updateReload={updateReload} />
      <DataTable data={data} updateReload={updateReload} />
    </div>
  );
};

export default Container;
