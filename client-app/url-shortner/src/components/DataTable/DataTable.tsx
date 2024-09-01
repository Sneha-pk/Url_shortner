import React from "react";
import { UrlData } from "../../interface/UrlData";
import { Link } from "react-router-dom";
import { serverURL } from "../../helpers/Constants";
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";

interface DataTableProps {
  data: UrlData[];
  updateReload: () => void;
}

const DataTable = ({ data, updateReload }: DataTableProps) => {
  console.log("data", data);
  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${serverURL}/shortUrl/${url}`);
      alert(`Url copied.:${serverURL}/shortUrl/${url}`);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUrl = async (id: string) => {
    console.log("deleteUrl");
    const response = await axios.delete(`${serverURL}/shortUrl/${id}`);
    updateReload();
    console.log(response);
  };

  const renderTable = () => {
    return data.map((item) => {
      return (
        <tr
          key={item._id}
          className="border-b text-white hover:bg-white hover:text-black bg-gray-600"
        >
          <td className="px-2 py-3 break-words">
            <Link to={item.fullUrl} target="_blank">
              {item.fullUrl}
            </Link>
            {item.fullUrl}
          </td>
          <td className="px-2 py-3 ">
            <Link to={`${serverURL}/shortUrl/${item.shortUrl}`} target="_blank">
              {item.shortUrl}
            </Link>
          </td>
          <td className="px-2 py-3 ">{item.clicks}</td>
          <td className="px-6 py-3 ">
            <button
              className="mr-2"
              onClick={() => copyToClipboard(item.shortUrl)}
            >
              <FaRegCopy />
            </button>
            <button onClick={() => deleteUrl(item._id)}>
              <RiDeleteBin6Line />
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="container mx-auto pt-2 pb-10">
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full table-fixed text-sm text-left text-gray-500 rtl:text-right">
          <thead className="text-md uppercase text-gray-50 bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 w-6/12">
                FullUrl
              </th>
              <th scope="col" className="px-6 py-3 w-3/12">
                ShortUrl
              </th>

              <th scope="col" className="px-6 py-3 ">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
