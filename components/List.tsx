import React, { useEffect, useState } from "react";
import openlibrary from "../apis/openLibrary";

export default function List() {
  const [data, setData] = useState<any>([]);
  const [query, setquery] = useState<string>("");
  const renderList = () => {
    if (data.length) {
      return data.map((element: any) => {
        console.log(element);
        return <div key={element.key}>{element.title}</div>;
      });
    }
  };

  const onSearch = async () => {
    console.log("search");
    const { data } = await openlibrary.get("/search.json", {
      params: {
        q: query,
      },
    });
    setData(data.docs.splice(1, 10));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await openlibrary.get("/search.json", {
        params: {
          q: query,
        },
      });
      setData(data.docs.splice(1, 10));
    };

    fetchData();
  }, []);

  return (
    <div>
      <label>Query: </label>
      <input value={query} onChange={(e) => setquery(e.target.value)} />
      <button onClick={onSearch}>Search</button>
      <div>{renderList()}</div>
    </div>
  );
}
