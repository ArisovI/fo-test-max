import { Button, Flex, Group, Stack, Table, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import Create from "./features/create";
import Update from "./features/update";
import { http } from "./http/http";
import { useEffect, useState } from "react";
import type { NewsBody } from "./types";
import NewsContent from "./components/NewsContent";
import { useTranslation } from "react-i18next";

const App = () => {
  const [news, setNews] = useState<NewsBody[] | null>(null);

  async function getNews() {
    await http("/news").then(({ data }) => setNews(data));
  }

  useEffect(() => {
    getNews();
  }, []);

  function createFn() {
    modals.open({ title: "Create", children: <Create /> });
  }

  function updateFn(id: string) {
    modals.open({ title: "Update", children: <Update id={id} /> });
  }
  const { i18n } = useTranslation();

  const rows = news?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.title[i18n.language as "ru" | "uz" | "en"]}</Table.Td>
      <Table.Td>
        {element.description[i18n.language as "ru" | "uz" | "en"]}
      </Table.Td>
      <Table.Td>
        <Group>
          <Button onClick={() => element?.id && updateFn(element.id)}>
            Update
          </Button>
          <Button>Delete</Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack w={1000} m="auto" mt={10}>
      <Stack>
        <Flex justify={"space-between"} align={"center"}>
          <Title>News</Title>
          <Button onClick={createFn}>Create</Button>
        </Flex>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title ({i18n.language})</Table.Th>
              <Table.Th>Description ({i18n.language})</Table.Th>
              <Table.Th>Actives</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Stack>

      <NewsContent />
    </Stack>
  );
};

export default App;
