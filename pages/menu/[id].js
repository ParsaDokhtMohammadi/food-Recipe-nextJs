import { useRouter } from 'next/router';
import React from 'react';
import styles from ""
const Details = ({ data }) => {
    const router = useRouter()
    if(router.isFallback){
        return(
            <h2>loading page...</h2>
        )
    }


  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </div>
  );
};




export default Details;

export async function getStaticPaths() {
  const response = await fetch("http://localhost:4000/data");
  const json = await response.json();
  const data = json.slice(0, 7);

  const paths = data.map((food) => ({
    params: { id: food.id.toString() },
  }));

  return {
    paths, 
    fallback: true, 
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(`http://localhost:4000/data/${params.id}`);
  const data = await response.json();

  if (!data || !data.name) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}
