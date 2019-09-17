window.onload = function() {
  function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};

  if (queryString) {
      queryString = queryString.split('#')[0];
      var arr = queryString.split('&');

      for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      if (typeof paramValue === 'string') ;

      if (paramName.match(/\[(\d+)?\]$/)) {
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];

          if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
          } else {
          obj[key].push(paramValue);
          }
      } else {
          if (!obj[paramName]) {
          obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
          } else {
          obj[paramName].push(paramValue);
          }
      }
      }
  }

  return obj;
  }
 // ************************************************
  // Shopping Cart API
  // ************************************************
  
  var shoppingCart = (function() {
      // =============================
      // Private methods and propeties
      // =============================
      cart = [];
      
      // Constructor
      function Item(name, price, currency, count, pid) {
        this.name = name;
        this.price = price;
        this.currency =currency;
        this.count = count;
        this.pid = pid;
      }
      
      // Save cart
      function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
      }
      
        // Load cart
      function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
      }
      if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
      }
      
    
      // =============================
      // Public methods and propeties
      // =============================
      var obj = {};
      
      // Add to cart
      obj.addItemToCart = function(name, price, currency, count, pid) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count ++;
            saveCart();
            return;
          }
        }
        var item = new Item(name, price, currency, count, pid);
        cart.push(item);
        saveCart();
      }
      // Set count from item
      obj.setCountForItem = function(name, count) {
        for(var i in cart) {
          if (cart[i].name === name) {
            cart[i].count = count;
            break;
          }
        }
      };
      // Remove item from cart
      obj.removeItemFromCart = function(name) {
          for(var item in cart) {
            if(cart[item].name === name) {
              cart[item].count --;
              if(cart[item].count === 0) {
                cart.splice(item, 1);
              }
              break;
            }
        }
        saveCart();
      }
    
      // Remove all items from cart
      obj.removeItemFromCartAll = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart.splice(item, 1);
            break;
          }
        }
        saveCart();
      }
    
      // Clear cart
      obj.clearCart = function() {
        cart = [];
        saveCart();
      }
    
      // Count cart 
      obj.totalCount = function() {
        var totalCount = 0;
        for(var item in cart) {
          totalCount += cart[item].count;
        }
        return totalCount;
      }
    
      // Total cart
      obj.totalCart = function() {
        var totalCart = 0;
        for(var item in cart) {
          totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
      }
    
      // List cart
      obj.listCart = function() {
        var cartCopy = [];
        for(i in cart) {
          item = cart[i];
          itemCopy = {};
          for(p in item) {
            itemCopy[p] = item[p];
    
          }
          itemCopy.total = Number(item.price * item.count).toFixed(2);
          cartCopy.push(itemCopy)
        }
        return cartCopy;
      }
    
      // cart : Array
      // Item : Object/Class
      // addItemToCart : Function
      // removeItemFromCart : Function
      // removeItemFromCartAll : Function
      // clearCart : Function
      // countCart : Function
      // totalCart : Function
      // listCart : Function
      // saveCart : Function
      // loadCart : Function
      return obj;
    })();
    
    
    // *****************************************
    // Triggers / Events
    // ***************************************** 
    // Add item
    $('.add-to-cart').click(function(event) {
      event.preventDefault();
      var name = $(this).data('name');
      var pid = Number($(this).data('pid'));
      var currency = $(this).data('currency');
      var price = Number($(this).data('price'));
      shoppingCart.addItemToCart(name, price, currency, 1, pid);
      displayCart();
    });
    
    // Clear items
    $('.clear-cart').click(function() {
      shoppingCart.clearCart();
      displayCart();
    });
    
    
    function displayCart() {
      var cartArray = shoppingCart.listCart();
      var output = "";
      for(var i in cartArray) {
        output += "<div>"
          + "<div>" + cartArray[i].name + "</div>" 
          + "<div>('" + cartArray[i].price + "''"+ cartArray[i].currency + "')</div>"
          + "<td><div class='input__group'><button class='minus-item' name='cc_product_"+ cartArray[i].pid +"' data-pid="+ cartArray[i].pid +" data-name='" + cartArray[i].name + "'>-</button>"
          + "<input name='cc_product_"+ cartArray[i].pid +"' type='number' class='item__count' data-pid='" + cartArray[i].pid + "' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
          + "<button class='plus-item' name='cc_product_"+ cartArray[i].pid +"' data-pid="+ cartArray[i].pid +" data-name='" + cartArray[i].name + "'>+</button></div></td>"
          + "<td><button class='delete-item' name='cc_product_"+ cartArray[i].pid +"' data-pid="+ cartArray[i].pid +" data-name='" + cartArray[i].name + "'>X</button></td>"
          + " = " 
          + "<td>" + cartArray[i].total + " "+ cartArray[i].currency + "</td>" 
          +  "</div>";
      }
      $('.show-cart').html(output);
      $('.total-cart').html(shoppingCart.totalCart());
      $('.total-count').html(shoppingCart.totalCount());
    }
    
    // Delete item button
    
    $('.show-cart').on("click", ".delete-item", function(event) {
      var name = $(this).data('name')
      shoppingCart.removeItemFromCartAll(name);
      displayCart();
    })
    
    
    // -1
    $('.show-cart').on("click", ".minus-item", function(event) {
      var name = $(this).data('name')
      shoppingCart.removeItemFromCart(name);
      displayCart();
    })
    // +1
    $('.show-cart').on("click", ".plus-item", function(event) {
      var name = $(this).data('name')
      shoppingCart.addItemToCart(name);
      displayCart();
    })
    
    // Item count input
    $('.show-cart').on("change", ".item-count", function(event) {
       var name = $(this).data('name');
       var count = Number($(this).val());
      shoppingCart.setCountForItem(name, count);
      displayCart();
    });
    
    displayCart();   
    
    // param URL
    function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};

      if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
          var a = arr[i].split('=');
          var paramName = a[0];
          var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

          if (typeof paramValue === 'string') ;

          if (paramName.match(/\[(\d+)?\]$/)) {
            var key = paramName.replace(/\[(\d+)?\]/, '');
            if (!obj[key]) obj[key] = [];

            if (paramName.match(/\[\d+\]$/)) {
              var index = /\[(\d+)\]/.exec(paramName)[1];
              obj[key][index] = paramValue;
            } else {
              obj[key].push(paramValue);
            }
          } else {
            if (!obj[paramName]) {
              obj[paramName] = paramValue;
            } else if (obj[paramName] && typeof obj[paramName] === 'string'){
              obj[paramName] = [obj[paramName]];
              obj[paramName].push(paramValue);
            } else {
              obj[paramName].push(paramValue);
            }
          }
      }
    }

    return obj;
    }

var param = getAllUrlParams(window.url)

setParam = function() {
  var str = '?';
  Object.keys(param).forEach((elem) => {
      if (elem !== 'prod' && elem !== 'cart') {
          str !== '?' && (str += '&')
          str += elem + '=' + param[elem];
      }
  })
  return str;
}


if (!param.cart && !param.prod) {
$(document.getElementsByName('home')).show();
} else if (param.prod) {
$(document.getElementsByName('prod-' + param.prod)).show();
} else if (param.cart) {
$(document.getElementById('cart')).show();

}

$('.select_prod').click(function(event) {
var pid = Number($(this).data('pid'));
$(location).attr('href', location.origin + location.pathname + setParam() + '&prod=' + pid);
})

$('.home').click(function(event) {
$(location).attr('href', location.origin + location.pathname + setParam());

})

$('.cart__icon').click(function (event) {
$(location).attr('href', location.origin + location.pathname + setParam () + '&cart=0');
})

}
