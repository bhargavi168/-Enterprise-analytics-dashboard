import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currency, DateRange, FilterState } from '@/types/dashboard';

const initialState: FilterState = {
  currency: 'USD',
  dateRange: '30d',
  selectedRegion: 'all',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
    setSelectedRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
    },
    resetFilters: (state) => {
      state.currency = 'USD';
      state.dateRange = '30d';
      state.selectedRegion = 'all';
    },
  },
});

export const { setCurrency, setDateRange, setSelectedRegion, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
