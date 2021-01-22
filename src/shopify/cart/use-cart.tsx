export function emptyHook() {
  return {
    data: {
      base_amount: 0,
      cart_amount: 0,
      currency: {
        code: '',
      },
      line_items: {
        physical_items: [],
      },
    },
    isEmpty: true,
  }
}

export default emptyHook
