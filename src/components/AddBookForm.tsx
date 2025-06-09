"use client";

import { useState } from "react";
import { useMutation } from "react-relay";
import toast from "react-hot-toast";
import { addBookMutation } from "@/mutations/AddBook";
import { AddBookMutation } from "@/mutations/__generated__/AddBookMutation.graphql";

type Props = {
  onBookAdded: () => void;
};

const CLOUDINARY_URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

export function AddBookForm({ onBookAdded }: Props) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [commit, isInFlight] = useMutation<AddBookMutation>(addBookMutation);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    if (!UPLOAD_PRESET || !CLOUDINARY_URL) {
      throw new Error("Cloudinary config is missing.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Cloudinary Upload Error:", JSON.stringify(data, null, 2));
      throw new Error(data?.error?.message || "Upload failed");
    }

    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim()) {
      toast.error("Title and Author are required.");
      return;
    }

    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    try {
      let imageUrl: string | undefined;

      if (file) {
        toast.loading("Uploading image...");
        imageUrl = await uploadToCloudinary(file);
        toast.dismiss();
      }

      commit({
        variables: {
          input: {
            title: form.title,
            author: form.author,
            description: form.description,
            price,
            imageUrl,
          },
        },
        onCompleted: () => {
          toast.success("Book added!");
          setForm({ title: "", author: "", description: "", price: "" });
          setFile(null);
          onBookAdded();
        },
        onError: (err) => {
          console.error("GraphQL mutation error:", err);
          toast.error("Something went wrong while adding the book.");
        },
      });
    } catch (err: any) {
      toast.dismiss();
      toast.error("Image upload failed: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border border-gray-300 rounded-lg shadow-sm bg-white text-black"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium mb-1">Author</label>
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author Name"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional description..."
          className="border border-gray-300 p-2 rounded w-full"
          rows={4}
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium mb-1">Price (€)</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="e.g., 12.99"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium mb-1">Cover Image</label>
        <div className="relative">
          <label
            htmlFor="file-upload"
            className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-200"
          >
            {file ? "Change Image" : "Choose Image"}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {file && (
          <p className="text-sm text-gray-600 mt-1 truncate">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isInFlight}
        className={`w-full py-2 px-4 rounded text-white font-semibold transition ${
          isInFlight
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isInFlight ? "Adding..." : "Add Book"}
      </button>
    </form>
  );
}
