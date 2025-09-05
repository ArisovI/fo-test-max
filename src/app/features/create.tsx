import { http } from "../http/http";
import type { NewsBody } from "../types";
import Form from "./form";

const Create = () => {
  async function createFn(body: NewsBody) {
    await http.post("/news", body);
  }

  return <Form submit={createFn} title="Create" />;
};

export default Create;
