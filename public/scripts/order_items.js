$(document).ready(function() {
  //Get data form database table
  const loadOrderItems = () => {
    $.ajax({
      url: '/api/foods_orders',
      method: 'get'
    }).then((result) => {
      renderCheckout(result);
      total();
    });
  };



  //Rendering elements
  const renderCheckout = (items) => {
    $('.itemsList').empty();
    for (const item of items.foods_orders) {
      const orderItem = createCheckoutElement(item);
      $('.itemsList').append(orderItem);
    }
  };

  //Creating table data
  const createCheckoutElement = (orderItem) => {
    let quantity = 1;
    const $item = $(
      `
      <tr>
        <td>${quantity}</td>
        <td class="itemInfo">
          <h3>${orderItem.name}</h3>
          <text>${orderItem.description}</text>
        </td>
        <td class="price-data">
          $<span class="amount">${orderItem.price * quantity}</span>
        </td>
      </tr>
      `
    );
    return $item;
  };

  const total = () => {
    let subtotal = 0;

    $('.amount').each(function(index, value) {
      subtotal += parseInt($(value).text());
    });
    $('.subtotal').text(`$${subtotal}`);

    const tax = subtotal * 0.05;
    $('.tax').text(`$${tax}`);

    const total_amount = subtotal + tax;
    $('.total_amount').text(`$${total_amount}`);

  };

  loadOrderItems();

});
