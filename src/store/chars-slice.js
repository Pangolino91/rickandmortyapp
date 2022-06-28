import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'

export const CharactersSlice = createSlice({
  name: 'chars',
  initialState: {
    charsList: [],
    searchQuery: '',
    pagesInfo: {},
    favList: [],
    favChars: [],
    isInFavs: false,
    currentPage: 1,
    fetchError: ''
  },
  reducers: {
    addToFav(state, action) {
      const existingFav = state.favList.find(
        (item) => item === action.payload
      );
      if (existingFav) {
        return;
      }
      else {
        state.favList.push(action.payload);
      }
    },
    isInfavList(state, action) {
      const existingFav = state.favList.find(
        (item) => item === action.payload
      );
      if (existingFav) {
        state.isInFavs = true;
      }
      else {
        return;
      }
    },
    removeFromFav(state, action) {
      const existingFav = state.favList.find(
        (item) => item === action.payload
      );
      if (existingFav) {
        if ('id' in state.favChars) {
          state.favChars = [];
          state.favList = [];
        }
        else {
          const newArr = state.favChars.filter((item) => item.id !== action.payload);
          state.favChars = newArr;
          const newFavArr = state.favList.filter(favIndex => favIndex !== action.payload);
          state.favList = newFavArr;
        }
      }
      else {
        return;
      }

    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChars.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.charsList = action.payload.results;
        state.pagesInfo = action.payload.info;
      })
      .addCase(fetchChars.rejected, (state, action) => {

        console.log(action)
        state.fetchError = action.error.message;

      })
      .addCase(changePage.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.charsList = action.payload[0].results;
        state.pagesInfo = action.payload[0].info;
        state.currentPage = action.payload[1]

      })
      .addCase(changePage.rejected, (state, action) => {


        state.charsList = [];

        state.fetchError = action.error.message;

      })
      .addCase(prevPage.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.charsList = action.payload.results;
        state.pagesInfo = action.payload.info;

      })
      .addCase(prevPage.rejected, (state, action) => {

        state.charsList = [];

        state.fetchError = action.error.message;

      })
      .addCase(nextPage.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.charsList = action.payload.results;
        state.pagesInfo = action.payload.info;

      })
      .addCase(nextPage.rejected, (state, action) => {

        state.charsList = [];

        state.fetchError = action.error.message;

      })
      .addCase(searchChar.fulfilled, (state, action) => {
        state.status = 'succeeded'

        if (action.payload[0].results === undefined) {
          return;
        }
        state.charsList = action.payload[0].results;
        state.pagesInfo = action.payload[0].info;
        state.searchQuery = action.payload[1]

      })
      .addCase(searchChar.rejected, (state, action) => {

        state.fetchError = action.error.message;

      })
      .addCase(renderFav.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.favChars = action.payload;

      })
      .addCase(renderFav.rejected, (state, action) => {

        state.fetchError = action.error.message;

      })
  }
})

export const charsActions = CharactersSlice.actions;

export const fetchChars = createAsyncThunk('fetchChars', async () => {

  try {
    const apiCall = await fetch('https://rickandmortyapi.com/api/character');
    const charsJson = await apiCall.json();
    return charsJson
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)

  }

})
export const changePage = createAsyncThunk('changePage', async (pageNum, { getState }) => {
  const state = getState();

  const currentPage = pageNum;
  const searchString = state.chars.searchQuery;
  try {

    console.log(state.chars.searchQuery);

    if (searchString !== '') {
      const apiCall = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchString}&page=${pageNum}`);

      const charsJson = await apiCall.json();
      return [charsJson, currentPage]
    }
    else {
      const apiCall = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNum}`);
      console.log(apiCall);
      const charsJson = await apiCall.json();
      return [charsJson, currentPage]
    }

  } catch (error) {

    throw new Error(error.message)
  }

})
export const prevPage = createAsyncThunk('prevPage', async (prevPage, { getState }) => {
  try {

    const apiCall = await fetch(prevPage);
    const charsJson = await apiCall.json();
    return charsJson
  } catch (error) {

    throw new Error(error.message)
  }

})
export const nextPage = createAsyncThunk('nextPage', async (nextPage, { getState }) => {

  try {
    const apiCall = await fetch(nextPage);
    const charsJson = await apiCall.json();
    console.log(charsJson);
    return charsJson
  } catch (error) {
    throw new Error(error.message)
  }

})
export const searchChar = createAsyncThunk('searchChar', async (searchQuery, { getState }) => {


  try {
    const apiCall = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
    const charsJson = await apiCall.json();
    return [charsJson, searchQuery]
  } catch (error) {
    throw new Error(error.message)
  }

})
export const renderFav = createAsyncThunk('renderFav', async (param, { getState }) => {
  const state = getState();

  try {

    if (state.chars.favList.length < 1) {

      const charsJson = []
      return charsJson;
    }
    else {
      const apiCall = await fetch(`https://rickandmortyapi.com/api/character/${state.chars.favList.toString()}`);

      const charsJson = await apiCall.json();

      return charsJson
    }
  } catch (error) {

    throw new Error(error.message)
  }

})

export default CharactersSlice;