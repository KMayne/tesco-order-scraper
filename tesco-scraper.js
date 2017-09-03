{
  const names = [
    'Put Names', 
    'To Split',
    'In Here'
  ];
  
  class Item {
    constructor(name, quantity, individualPrice) {
      this.name = name;
      this.quantity = quantity;
      this.price = individualPrice;
    }
    
    toSplitwiseString() {
      const totalPrice = this.price * this.quantity;
      const quantityString = this.quantity != 1 ? `${this.quantity}x ` : '';
      return `${quantityString}${this.name} - ${totalPrice.toFixed(2)} ()`;
    }
    
    static fromTescoData(itemData) {
      return new Item(itemData.productItem.name, itemData.quantity, 
        itemData.productItem.product.price);
    }
  }
  
  function processOrderData(orderData) {
    const zeroedNames = names.map(name => name + ' - 0.00').join(', ');
    const items = orderData.items.map(Item.fromTescoData);
    console.log(items);
    items.push(new Item('Multi-buy savings', 1, -orderData.promotionSavings));
    return items.map(item => item.toSplitwiseString()).join('\n') + '\nTax: '
    + zeroedNames + '\nTip: ' + zeroedNames;
  }
  
  const htmlElement = document.getElementsByTagName('html')[0];
  const data = JSON.parse(htmlElement.getAttribute('data-props'));
  const orderHTML = processOrderData(data.order).replace(new RegExp('\\n', 'g'),
    '\n<br>\n');
  document.write('<!DOCTYPE html><html><head></head><body><p>' + orderHTML + 
    '</p></body></html>');
}
