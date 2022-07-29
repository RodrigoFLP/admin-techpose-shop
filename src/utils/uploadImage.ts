import cloudinary from "../api/cloudinary";
import { CloudinaryResponse } from "../interfaces/cloudinary";

export const uploadImage = async (image: File) => {
  try {
    const bodyFormData = new FormData();
    bodyFormData.append("file", image);
    bodyFormData.append("upload_preset", "iyzwtop3");
    const { data }: { data: CloudinaryResponse } = await cloudinary.post(
      "",
      bodyFormData
    );
    console.log(data);
    return data.secure_url;
  } catch (error) {
    throw error;
  }
};
