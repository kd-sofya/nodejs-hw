
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  try {
    const { file, user } = req;

    if (!file) {
      throw createHttpError(400, 'No file');
    }

    console.log('Файл отримано. Користувач з токена:', user?._id);

    const result = await saveFileToCloudinary(file.buffer, user._id);
    console.log('Успішно завантажено в Cloudinary:', result.secure_url);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar: result.secure_url },
      { returnDocument: 'after' },
    );

    res.status(200).json({ url: updatedUser.avatar });
  } catch (error) {
    console.error('ПОМИЛКА:', error);
    throw error;
  }
};
