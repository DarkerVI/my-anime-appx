"use client"; // هذا السطر مهم

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب بيانات الأنمي من Jikan API
    fetch("https://api.jikan.moe/v4/top/anime")
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching anime data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">أحدث الأنميات</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} height={300} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {animeList.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={anime.images.jpg.image_url}
                alt={anime.title}
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{anime.title}</h2>
                <p className="text-gray-600">{anime.synopsis}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}