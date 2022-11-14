import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const { data: session, status } = useSession();

  const [postItem, setPostItem] = useState({
    name: "",
    price: "",
    picture: "",
    collection: "",
  });

  const [updateItem, setUpdateItem] = useState({
    name: "",
    price: "",
    picture: "",
    collection: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const [getItem, setgetItem] = useState({
    name: "",
    collection: "",
  });

  const [deleteItem, setDeleteItem] = useState({
    name: "",
    collection: "",
  });

  const [item, setItem] = useState(null);

  const handleinput3 = (e) => {
    setDeleteItem((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit3 = async (e) => {
    try {
      e.preventDefault();
      if (deleteItem === null) {
        alert("empty field");
      } else {
        const response = await fetch(
          `/api/admin?collection=${deleteItem.collection}&name=${deleteItem.name}`,
          {
            method: "DELETE",
            headers: {
              "content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.data.deletedCount === 0) {
          alert("Item does not exist");
        } else {
          alert("item deleted");
        }
        setDeleteItem({
          name: "",
          collection: "",
        });
      }
    } catch (error) {
      console.log(err.message);
      setErrMsg(data.msg);
    }
  };

  const handleinput = (e) => {
    setPostItem((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      if (postItem === null) {
        alert("empty field");
      } else {
        const response = await fetch("/api/admin", {
          method: "POST",
          body: JSON.stringify({ postItem }),
          headers: {
            "content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPostItem({
          name: "",
          price: "",
          picture: "",
          collection: "",
        });
        alert(data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleinput4 = (e) => {
    setUpdateItem((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesubmit4 = async (e) => {
    try {
      e.preventDefault();
      if (updateItem === null) {
        alert("empty field");
      } else {
        const response = await fetch("/api/admin", {
          method: "PATCH",
          body: JSON.stringify({ updateItem }),
          headers: {
            "content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setUpdateItem({
          name: "",
          price: "",
          picture: "",
          collection: "",
        });
        alert(data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleinput2 = (e) => {
    setgetItem((prevItem) => ({
      ...prevItem,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesubmit2 = async (e) => {
    try {
      e.preventDefault();
      if (getItem === null) {
        alert("empty field");
      } else {
        const response = await fetch(
          `/api/admin?collection=${getItem.collection}&name=${getItem.name}`,
          {
            method: "GET",
            headers: {
              "content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setgetItem({
          name: "",
          collection: "",
        });
        if (!data) {
          alert("item does not exist");
        }
        setItem(data.data);
      }
    } catch (error) {
      console.log(err.message);
    }
  };
  if (session && session.role === "admin") {
    //add get collection , update one, post new one, delete one, get one
    return (
      <div className="min-h-screen">
        <div className="text-center">
          <h1 className="m-2 text-xl font-bold">Admin</h1>
          <p className="m-2 text-2xl font-sans font-bold text-green-600">
            Welcome to the Admin Portal!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="flex flex-col justify-center items-center m-3 ">
            <p className="m-2 font-bold text-xl text-center">
              UPLOAD A NEW ITEM
            </p>
            <label className="m-2 ">
              Name
              <input
                type="text"
                name="name"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={postItem.name}
                onChange={handleinput}
              />
            </label>
            <label className="m-2 ">
              Price
              <input
                type="text"
                name="price"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={postItem.price}
                onChange={handleinput}
              />
            </label>
            <label className="m-2 ">
              Picture
              <input
                type="text"
                name="picture"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={postItem.picture}
                onChange={handleinput}
              />
            </label>
            <label className="m-2 ">
              Collection
              <select
                type="text"
                name="collection"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={postItem.collection}
                onChange={handleinput}
              >
                <option value="">select a collection</option>
                <option value="bedroom">bedroom</option>
                <option value="bathroom">bathroom</option>
                <option value="dining">dining</option>
                <option value="kitchen">kitchen</option>
                <option value="laundryroom">laundryroom</option>
                <option value="livingroom">livingroom</option>
                <option value="lounge">lounge</option>
                <option value="workspace">workspace</option>
              </select>
            </label>
            <button
              onClick={handlesubmit}
              className="bg-slate-800 p-1 text-white rounded-md shadow-lg"
            >
              Upload
            </button>
          </div>
          <div className="flex flex-col justify-center items-center m-3 ">
            <p className="m-2 font-bold text-xl text-center">
              GET AN ITEM BY NAME
            </p>
            <div className="flex flex-col justify-center items-center m-3">
              <label className="m-2 ">
                Item-name
                <input
                  type="text"
                  name="name"
                  className="border-2 ml-1 p-1 border-black rounded-md"
                  value={getItem.name}
                  required
                  onChange={handleinput2}
                />
              </label>
              <label className="m-2 ">
                Collection
                <select
                  type="text"
                  name="collection"
                  className="border-2 ml-1 p-1 border-black rounded-md"
                  value={getItem.collection}
                  onChange={handleinput2}
                  required
                >
                  <option value="">select a collection</option>
                  <option value="bedroom">bedroom</option>
                  <option value="bathroom">bathroom</option>
                  <option value="dining">dining</option>
                  <option value="kitchen">kitchen</option>
                  <option value="laundryroom">laundryroom</option>
                  <option value="livingroom">livingroom</option>
                  <option value="lounge">lounge</option>
                  <option value="workspace">workspace</option>
                </select>
              </label>
              <button
                onClick={handlesubmit2}
                className="bg-slate-800 p-1 text-white rounded-md shadow-lg"
              >
                Get Item
              </button>
            </div>
          </div>
          <div>
            <p className="m-2 font-bold text-xl text-center">DELETE AN ITEM</p>
            <div className="flex flex-col justify-center items-center m-3">
              <label className="m-2 ">
                Item-name
                <input
                  type="text"
                  name="name"
                  className="border-2 ml-1 p-1 border-black rounded-md"
                  required
                  value={deleteItem.name}
                  onChange={handleinput3}
                />
              </label>
              <label className="m-2 ">
                Collection
                <select
                  type="text"
                  name="collection"
                  className="border-2 ml-1 p-1 border-black rounded-md"
                  value={deleteItem.collection}
                  onChange={handleinput3}
                  required
                >
                  <option value="">select a collection</option>
                  <option value="bedroom">bedroom</option>
                  <option value="bathroom">bathroom</option>
                  <option value="dining">dining</option>
                  <option value="kitchen">kitchen</option>
                  <option value="laundryroom">laundryroom</option>
                  <option value="livingroom">livingroom</option>
                  <option value="lounge">lounge</option>
                  <option value="workspace">workspace</option>
                </select>
              </label>
              <button
                onClick={handlesubmit3}
                className="bg-slate-800 p-1 text-white rounded-md shadow-lg"
              >
                Delete Item
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center m-3 ">
            <p className="m-2 font-bold text-xl text-center">
              UPDATE A NEW ITEM
            </p>
            <label className="m-2 ">
              Name
              <input
                type="text"
                name="name"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={updateItem.name}
                onChange={handleinput4}
              />
            </label>
            <label className="m-2 ">
              Price
              <input
                type="text"
                name="price"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={updateItem.price}
                onChange={handleinput4}
              />
            </label>
            <label className="m-2 ">
              Picture
              <input
                type="text"
                name="picture"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={updateItem.picture}
                onChange={handleinput4}
              />
            </label>
            <label className="m-2 ">
              Collection
              <select
                type="text"
                name="collection"
                className="border-2 ml-1 p-1 border-black rounded-md"
                value={updateItem.collection}
                onChange={handleinput4}
              >
                <option value="">select a collection</option>
                <option value="bedroom">bedroom</option>
                <option value="bathroom">bathroom</option>
                <option value="dining">dining</option>
                <option value="kitchen">kitchen</option>
                <option value="laundryroom">laundryroom</option>
                <option value="livingroom">livingroom</option>
                <option value="lounge">lounge</option>
                <option value="workspace">workspace</option>
              </select>
            </label>
            <button
              onClick={handlesubmit4}
              className="bg-slate-800 p-1 text-white rounded-md shadow-lg"
            >
              Update
            </button>
          </div>
        </div>
        {item != null && (
          <div className="flex flex-col text-xl m-2 font-bold justify-center items-center">
            <div>{item.name}</div>
            <div>
              <Image
                src={item.picture}
                alt="pic"
                width={400}
                height={400}
                placeholder="blur"
                blurDataURL={item.picture}
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-500 text-justify ">
                HOMELAND COMPANY
              </p>

              <p className="font-bold text-slate-800 text-xl  ">
                {" "}
                Price: {item.price}.00
              </p>
            </div>
            <button
              className="bg-slate-800 hover:bg-white text-white hover:text-red-600 border-2 p-1 m-1 rounded-md shadow-lg"
              onClick={() => setItem(null)}
            >
              close
            </button>
          </div>
        )}
        {errMsg != "" && <div>ITEM NOT FOUND</div>}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen">
        <h1>You are not authorized to view this page!</h1>
      </div>
    );
  }
}
