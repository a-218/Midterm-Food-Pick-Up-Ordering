$(document).ready(function() {
  const loadOrderItems = () => {
    $.ajax({
      url: '/api/foods_orders',
      method: 'get'
    }).then((result) => {
      renderCheckout(result);
    });
  };

  const renderCheckout = (items) => {
    $('.itemsList').empty();
    for (const item of items.foods_orders) {
      const orderItem = createCheckoutElement(item);
      $('.itemsList').append(orderItem);
    }
  };

  const createCheckoutElement = (orderItem) => {

    const $item = $(
      `
      <div class="item">
        <div>
          <h3>${orderItem.name}</h3>
          <text>${orderItem.description}</text>
        </div>
        <div class="qty-price">
          <select class="qty"></select>
          <text>$ ${orderItem.price}.00</text>
        </div>
      </div>
      `
    );
    return $item;
  };

  loadOrderItems();

});
