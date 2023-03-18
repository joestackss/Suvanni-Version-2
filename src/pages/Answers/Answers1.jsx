import React, { useEffect, useState } from "react";
import { collection, getDocs, limit } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./Answers.css";
import { async } from "@firebase/util";
import { data } from "autoprefixer";

const AnswersComp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const colRef = collection(db, "Stocks");

      const snapshots = await getDocs(colRef);

      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();

        data.id = doc.id;
        return data;
      });

      // setProducts(docs);

      // console.log(docs);
    })();
  }, []);

  return (
    <div className="container">
      {/* <h1>Answers:</h1> */}
      {/* {posts.length > 0 ? (
        posts.map((post) => <div key={post.key}>{post.answer}</div>)
      ) : (
        <h1>no answers yet</h1>
      )} */}
    </div>
  );
};

export default AnswersComp;
