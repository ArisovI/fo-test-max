import { useEffect, useState } from "react";
import type { NewsBody } from "../types";
import { http } from "../http/http";
import { Flex, Group, Image, Select, Stack, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const NewsContent = () => {
  const [news, setNews] = useState<NewsBody[] | null>(null);

  async function getNews() {
    await http("/news").then(({ data }) => setNews(data));
  }

  useEffect(() => {
    getNews();
  }, []);

  const { i18n } = useTranslation();

  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Title>News</Title>
        <Select
          data={[
            { label: "Русский", value: "ru" },
            { label: "English", value: "en" },
            { label: "Ozbek", value: "uz" },
          ]}
          defaultValue={i18n.language}
          onChange={(lang) => {
            if (lang) {
              i18n.changeLanguage(lang);
            }
          }}
        />
      </Flex>

      <Stack gap={10}>
        {news?.map((el) => (
          <Group
            style={{ border: "1px solid black", borderRadius: "10px" }}
            p={10}
          >
            <Title order={3}>
              {el.title[i18n.language as "ru" | "uz" | "en"]}
            </Title>
            <Text>{el.description[i18n.language as "ru" | "uz" | "en"]}</Text>
            <Image src={el?.image} />
          </Group>
        ))}
      </Stack>
    </Stack>
  );
};

export default NewsContent;
