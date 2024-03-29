import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import photoService from '../services/photoService';

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

// Publish user photo
export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async (photo, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);

    // check for errors
    if (data.errors) {
      return thunkApi.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

// get photos
export const getUserPhotos = createAsyncThunk(
  'photo/userphotos',
  async (id, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);

    return data;
  },
);

// Delete a photo
export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (id, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    const data = await photoService.deletePhotos(id, token);

    return data;
  },
);

export const updatePhoto = createAsyncThunk(
  'photo/update',
  async (photoData, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token,
    );

    // check for errors
    if (data.errors) {
      return thunkApi.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const getPhotoById = createAsyncThunk(
  'photo/getphoto',
  async (id, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    const data = await photoService.getPhotoById(id, token);

    return data;
  },
);

export const like = createAsyncThunk('photo/like', async (id, thunkApi) => {
  const token = thunkApi.getState().auth.user.token;
  const data = await photoService.like(id, token);

  // check for errors
  if (data.errors) {
    return thunkApi.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const comment = createAsyncThunk(
  'photo/comment',
  async (commentData, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    const data = await photoService.comment(
      { comment: commentData.commentText },
      commentData.id,
      token,
    );

    // check for errors
    if (data.errors) {
      return thunkApi.rejectWithValue(data.errors[0]);
    }

    return data;
  },
);

export const getAllPhotos = createAsyncThunk(
  'photos/getall',
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;
    const data = await photoService.getAllPhotos(token);

    return data;
  },
);

export const searchPhotos = createAsyncThunk(
  'photos/search',
  async (query, thunkApi) => {
    const token = thunkApi.getState().auth.user.token;

    const data = await photoService.searchPhotos(query, token);

    return data;
  },
);

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = 'Foto publicada com sucesso!';
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = state.photos.filter(
          (photo) => photo._id !== action.payload.id,
        );
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos.map((photo) => {
          if (photo._id === action.payload.photo._id) {
            return (photo.title = action.payload.photo.title);
          }

          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getPhotoById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId);
        }

        state.photos.map((photo) => {
          if (photo._id === action.payload.photoId) {
            return photo.likes.push(action.payload.userId);
          }
          return photo;
        });

        state.message = action.payload.message;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.photo.comments.push(action.payload.comment);
        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
