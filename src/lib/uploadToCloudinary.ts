export async function uploadToCloudinary(file: File): Promise<string> {
  const preset = "your_unsigned_preset";
  const cloudName = "your_cloud_name";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Image upload failed");

  const data = await res.json();
  return data.secure_url;
}
