import { useEffect, useState } from "react";
import { http } from "../http/http";
import type { NewsBody } from "../types";
import Form from "./form";

type Props = {
  id: string;
};

const Update = ({ id }: Props) => {
  const [oneNews, setOneNews] = useState<NewsBody | null>(null);

  async function getOneNews() {
    await http(`/news/${id}`).then(({ data }) => setOneNews(data));
  }

  useEffect(() => {
    getOneNews();
  }, [id]);

  async function updateFn(body: NewsBody) {
    await http.patch(`/news/${id}`, body);
  }

  return (
    <>
      {oneNews !== null && (
        <Form
          title="Update"
          initialValues={{
            title: {
              ru: oneNews?.title.ru,
              en: oneNews?.title.en,
              uz: oneNews?.title.uz,
            },
            description: {
              ru: oneNews?.title.ru,
              en: oneNews?.title.en,
              uz: oneNews?.title.uz,
            },
            image: oneNews.image,
          }}
          submit={updateFn}
        />
      )}
    </>
  );
};

export default Update;
