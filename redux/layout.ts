import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    rowHeight: 32,
  },
  reducers: {
    zoomIn: (state) => {
      const eventBlocks = Array.from(
        document.querySelectorAll(
          '.eventBlock'
        ) as unknown as HTMLCollectionOf<HTMLElement>
      );
      eventBlocks.forEach((eb) => {
        eb.style.transition = '0.2s ease';
      });

      window.setTimeout(() => {
        eventBlocks.forEach((eb) => {
          eb.style.transition = 'none';
        });
      }, 200);

      if (state.rowHeight < 128) {
        localStorage.rowHeight = state.rowHeight + 8;
        state.rowHeight += 8;
      }
    },
    zoomOut: (state) => {
      const eventBlocks = Array.from(
        document.querySelectorAll(
          '.eventBlock'
        ) as unknown as HTMLCollectionOf<HTMLElement>
      );
      eventBlocks.forEach((eb) => {
        eb.style.transition = '0.2s ease';
      });

      window.setTimeout(() => {
        eventBlocks.forEach((eb) => {
          eb.style.transition = 'none';
        });
      }, 200);

      if (state.rowHeight > 32) {
        localStorage.rowHeight = state.rowHeight - 8;
        state.rowHeight -= 8;
      }
    },
  },
});

export const { zoomIn, zoomOut } = layoutSlice.actions;
export const getRowHeight = (state: { layout: { rowHeight: number } }) =>
  state.layout.rowHeight;
export default layoutSlice.reducer;
