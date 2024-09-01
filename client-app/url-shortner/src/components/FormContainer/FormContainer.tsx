import React, { useState } from "react";
import axios from "axios";
import { serverURL } from "../../helpers/Constants";

interface Props {
  updateReload: () => void;
}

const FormContainer = ({ updateReload }: Props) => {
  const [fullUrl, setFullUrl] = useState<string>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullUrl(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${serverURL}/shortUrl`, { fullUrl });
      setFullUrl("");
      updateReload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mx-auto p-2">
      <div className="bg-banner my-8 bg-cover bg-center">
        <div className="w-full h-full rounded-xl p-20 pb-8 backdrop:brightness-50">
          <h2 className="text-white text-4xl text-center pb-8 pt-2">
            Url Shortner
          </h2>
          <p className="text-white text-center text-xl">
            Paste your untidy url here
          </p>
          <form onSubmit={handleSubmit}>
            <div className=" flex">
              <div className="relative w-full ">
                <div className="absolute inset-y-0 start-0 ps-4 text-black flex pointer-events-none items-center">
                  url.shortner/
                </div>
                <input
                  placeholder="Paste url here"
                  type="text"
                  value={fullUrl}
                  onChange={handleChange}
                  required
                  className="block w-full p-2 ps-32 border border-gray-800 rounded-lg"
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2 h-full text-white bg-blue-600 rounded-lg font-medium border border-blue focus:ring-2 focus:outline-none focus:ring-blue-700"
                >
                  Shorten Url
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
