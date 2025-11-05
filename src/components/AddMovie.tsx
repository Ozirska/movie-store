import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, message } from "antd";
import { fetchRequests } from "../utils/fetchRequests";

interface Movie {
  id: string;
  ToWatch: boolean;
  Favorite: boolean;
  Title: string;
  imdbRating?: string;
  Released?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Poster?: string;
  Plot?: string;
}

interface AddMovieProps {
  isModalOpen: boolean;
  handleClose: () => void;
  refreshMovies: () => void;
}

const AddMovie: React.FC<AddMovieProps> = ({
  isModalOpen,
  handleClose,
  refreshMovies,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const generateRandomId = () => Math.random().toString(36).substring(2, 9);

  const onFinish = async (values: Omit<Movie, "id">) => {
    const newMovie = {
      ...values,
      id: generateRandomId(),
      ToWatch: values.ToWatch || false,
      Favorite: values.Favorite || false,
    };

    try {
      setLoading(true);
      const createdMovie = await fetchRequests.createMovie(newMovie);
      message.success(`Movie "${createdMovie.Title}" added successfully!`);
      form.resetFields();
      handleClose();
    } catch (error: any) {
      console.error(error);
      message.error(error.message || "Failed to create movie");
    } finally {
      setLoading(false);
      refreshMovies();
    }
  };

  return (
    <Modal
      title="Add a New Movie"
      open={isModalOpen}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ ToWatch: false, Favorite: false }}
      >
        <Form.Item name="Title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter movie title" />
        </Form.Item>

        <Form.Item name="imdbRating" label="IMDb Rating">
          <Input placeholder="e.g. 7.8" />
        </Form.Item>

        <Form.Item name="Released" label="Released">
          <Input placeholder="e.g. 30 Sep 2016" />
        </Form.Item>

        <Form.Item name="Genre" label="Genre">
          <Input placeholder="e.g. Action, Crime, Drama" />
        </Form.Item>

        <Form.Item name="Director" label="Director">
          <Input placeholder="e.g. Cheo Hodari Coker" />
        </Form.Item>

        <Form.Item name="Actors" label="Actors">
          <Input placeholder="e.g. Mahershala Ali, Mike Colter..." />
        </Form.Item>

        <Form.Item name="Poster" label="Poster URL">
          <Input placeholder="https://example.com/poster.jpg" />
        </Form.Item>
        <Form.Item label="Description" name="Plot">
          <Input.TextArea rows={3} placeholder="Enter movie description" />
        </Form.Item>

        <Form.Item name="ToWatch" valuePropName="checked">
          <Checkbox>Plan to watch</Checkbox>
        </Form.Item>

        <Form.Item name="Favorite" valuePropName="checked">
          <Checkbox>Favorite</Checkbox>
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Movie
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMovie;
