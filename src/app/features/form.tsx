import { Button, FileInput, Group, Stack, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import type { NewsBody } from "../types";
import { modals } from "@mantine/modals";

type Props = {
  submit: (body: NewsBody) => Promise<unknown>;
  initialValues?: NewsBody;
  title: string;
};

const INITIAL_VALUES: NewsBody = {
  title: { ru: "", en: "", uz: "" },
  description: { ru: "", en: "", uz: "" },
  image: null,
};

const Form = (props: Props) => {
  const { initialValues = INITIAL_VALUES, submit, title } = props;
  const form = useForm<NewsBody>({
    initialValues,
    validate: {
      title: {
        en: isNotEmpty("Required"),
        ru: isNotEmpty("Required"),
        uz: isNotEmpty("Required"),
      },
      description: {
        en: isNotEmpty("Required"),
        ru: isNotEmpty("Required"),
        uz: isNotEmpty("Required"),
      },
    },
  });

  console.log(initialValues);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  async function handleSubmit(values: typeof form.values) {
    await submit(values).then(() => modals.closeAll());
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Title (ru)"
          placeholder="Enter title (ru)"
          {...form.getInputProps("title.ru")}
        />
        <TextInput
          label="Title (en)"
          placeholder="Enter title (en)"
          {...form.getInputProps("title.en")}
        />
        <TextInput
          label="Title (uz)"
          placeholder="Enter title (uz)"
          {...form.getInputProps("title.uz")}
        />
        <TextInput
          label="Description (ru)"
          placeholder="Enter description (ru)"
          {...form.getInputProps("description.ru")}
        />
        <TextInput
          label="Description (en)"
          placeholder="Enter description (en)"
          {...form.getInputProps("description.en")}
        />
        <TextInput
          label="Description (uz)"
          placeholder="Enter description (uz)"
          {...form.getInputProps("description.uz")}
        />
        <FileInput
          label="Image"
          placeholder="Choose image"
          clearable
          onChange={async (file) => {
            if (file) {
              const base64 = await fileToBase64(file);
              form.setFieldValue("image", base64);
            } else {
              form.setFieldValue("image", "");
            }
          }}
        />

        {form.values.image && (
          <img
            src={form.values.image}
            alt="preview"
            style={{
              maxWidth: "200px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
        )}
        <Group justify="end">
          <Button onClick={() => modals.closeAll()} variant="outline">
            Cancel
          </Button>
          <Button type="submit">{title}</Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Form;
