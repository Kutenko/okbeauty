var InsalesThemeSettings = {"color_background_primary":"#ffffff","color_text_primary":"#000000","color_link_primary":"#000000","color_link_primary_hover":"#c2a284","color_border_primary":"#ffebd8","color_background_secondary":"#c2a284","color_text_secondary":"#ffffff","color_link_secondary":"#ffffff","color_link_secondary_hover":"#c2a284","color_border_secondary":"#ffebd8","body_background_color":"#ffffff","body_background_type":"default","font_family_primary":"google:Exo 2","font_size_primary":"16px","logotype_type":"image","logotype_font_family":"google:Open+Sans","logotype_font_size":"40px","instafeed_accesstoken":"2284475115.1677ed0.0a20498bdae84611af26705f436a5e24","phone":"from_settings","email":"from_settings","promo_slider_auto":"1","promo_slider_auto_time":"15","category_description_position":"after_products","product_not_available":"preorder","product_share_hide":"1","product_compare_hide":"1","_settings_version":1564559592.5094836};
(function () {
  $('.js-open-sidebar').on('click', function () {
    alertify.panel({
      target: $('[data-modal="mobile-sidebar"]').html(),
      position: 'left',
      onOpen: function (modal) {
        var $sidebarBlocks = $(modal).find('.sidebar-block-content');

        $sidebarBlocks.each(function () {
          var $menu = $(this).find('.mobile-sidebar-menu').first();

          InSalesUI.Menu.create($menu);
        });
        $( ".fa-angle-right" ).click(function(event) {
          event.preventDefault();
          $( ".mobile-sidebar-menu-subcollection" ).slideToggle( "fast", function() {

          });
        });
      }
      
    });
  });
  $('.js-open-contacts').on('click',function(){
    $('.contacts-top-menu-block').removeClass('hidden');
    $(this).addClass('is-active');
    // console.log('Открывается!');
  })
  $(document).on('click touchstart',function(elem){
    var contacts_top = $(elem.target).closest('.contacts-top-menu-block').length;
    var js_open_contacts = $(elem.target).closest('.js-open-contacts').length;
    if (!contacts_top && !js_open_contacts){
        $('.contacts-top-menu-block').addClass('hidden');
        $(".js-open-contacts").removeClass('is-active');
          // console.log('Закрывается!');
    }
  });

  var toggleForms = function(button, form){
    button.on('click', function(){
      form.toggle();

      if (form.is(":hidden")){
        button.addClass('is-unchecked');
        button.removeClass('is-checked');
        $('.js-comments-toggle-notice').hide()
      }
      else{
        button.addClass('is-checked');
        button.removeClass('is-unchecked');
      }
      var form_clear =  InSalesUI.Form.get(form);
      form_clear.clear();
    });
  };

  toggleForms($('.js-comments-toggle'),$('#comment_form'));
  toggleForms($('.js-reviews-toggle'),$('#review_form'));

  $('.js-open-search-panel').on('click', function (elem) {
    alertify.panel({
      target: $('[data-modal="search-form"]').html(),
      position: 'top', hideAfter: false
    });
  });

  if (window.innerWidth  <= 768){
    if ($('.hidden-breadcrumbs').hasClass("js-hidden-bread")){

      $('.breadcrumb-item').each(function(index){
        if ((index > 2) && (index != $(".breadcrumb-item").size() - 1))
        {
          $(this).addClass("hidden");
          // console.log($(this).text());
        }
      })
      $('.js-hidden-bread').click(function(){
        $('.breadcrumb-item').removeClass("hidden");
        $('.js-hidden-bread').parent().addClass("hidden");
      })
    }
  }
  
})();

(function () {
  if (Site.template != 'index') {
    return;
  }

  var _options = {
    loop: true,
    pagination: true,
  };

  if (_.get(InsalesThemeSettings, 'promo_slider_auto')) {
    _options.autoplay = _.get(InsalesThemeSettings, 'promo_slider_auto_time', 5) * 1000;
  }

  $('[data-slider="promo"]').each(function () {
    new Swiper (this, _options);
  })

  new Swiper('.reviews-blocks', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
});
})();

(function () {
  if (Site.template != 'index') {
    return;
  }

  if($('#instafeed').length > 0){
    var userFeed = new Instafeed({
      get: 'user',
      userId: $('#instafeed').data('userid'),
      accessToken: $('#instafeed').data('accesstoken'),
      limit: 6,
      resolution: 'standard_resolution',
      template: '<div class="cell-2 cell-4-md cell-6-sm"><a href="{{link}}" target="_blank" style="background-image: url({{image}});"><span class="foreground"><span>{{caption}}</span></span></a></div>',
      after: function() {
        $('#instafeed a').height($('#instafeed a').width());
      }
    });
    userFeed.run();
  }

  

  var _spOptions = {
    slidesPerView: 4,
    spaceBetween: 16,
    breakpoints: {
      380: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  };

  $('[data-slider="special-products"]').each(function () {
    new Swiper (this, _spOptions);
  });
})();

(function () {
  if (Site.template != 'index') {
    return;
  }

  var _blogOptions = {
    slidesPerView: 4,
    spaceBetween: 16,
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  };

  $('[data-slider="blogs"]').each(function () {
    new Swiper (this, _blogOptions);
  });
})();

(function(){
  $(window).scroll(function(){
    if (( window.pageYOffset > 250)&&(window.innerWidth  <= 768)){
      $('.js-top-panel-fixed').addClass("fixed");
      $('.top-panel-wrapper').addClass("z-index");
    }
    else{
      $('.js-top-panel-fixed').removeClass("fixed");
      $('top-panel-wrapper').removeClass("z-index");
    }
  });

  $('.js-arrow-up').click(function() {
    $('body,html').animate({
      scrollTop : 0
    }, 500);
  });




})();

(function(){

  if (Site.template != 'index') {
    return;
  }

  $(document).on('submit','.js-widget-feedback', function(event) {
    var $widgetFeedback = $(this);
    var msg = $widgetFeedback.serializeObject();
    var val_send;
    var max_send =  $(this).attr('data-max-send');

    event.preventDefault();
    sessionStorage.getItem('send_success') ? val_send  = sessionStorage.getItem('send_success') : val_send = 0;

    if (max_send <= val_send) {
      maxSendError();
      $(this).find('.button-widget-feedback').attr('disabled','disabled').addClass('is-secondary');
      return false;
    }
    Shop.sendMessage(msg)
    .done(function (response) {
      alertify.success(response.notice);
      $widgetFeedback.trigger('reset');
      val_send++;
      sessionStorage.setItem('send_success', val_send);
    })
    .fail(function (response) {
      $.each(response.errors, function (i, val) {
        alertify.error(val[0]);
      });
    });
  })

}())

;
function copySrc (self) {
  var src = $(self).attr('data-image-large');
  var href = $(self).attr('href');
  var title = $(self).attr('title');
  var count = $(self).attr('data-gallery-count');

  $(self).parent()
    .siblings()
    .find('a')
    .removeClass('is-checked');
  $(self).addClass('is-checked');

  $('#gallery').attr({
    href: href,
    title: title,
    'data-gallery-count': count
  })
    .find('img')
    .attr({
      src: src,
      alt: title
    });
}

(function () {
  if (Site.template !== 'product') {
    return;
  }

  $('#gallery').height($('#gallery').width());

  var _galleryThumbs = {
    slidesPerView: 6,
    spaceBetween: 4,
    autoHeight: true,
    breakpoints: {
      768: { slidesPerView: 1 },
      1024: { slidesPerView: 4 }
    }
  };

  var _productSliderOptions = {
    slidesPerView: 4,
    spaceBetween: 16,
    breakpoints: {
      380: { slidesPerView: 2, spaceBetween: 10 },
      480: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  };

  var SimillarSwiper = new Swiper('[data-slider="similar-products"]', _productSliderOptions);
  var RelatedSwiper = new Swiper('[data-slider="related-products"]', _productSliderOptions);
  var BundleSwiper = new Swiper('[data-slider="bundle-products"]', _productSliderOptions);

  if ($('[data-slider="gallery-thumbs"]').length) {
    var MainSwiper = new Swiper('[data-slider="gallery-thumbs"]', _galleryThumbs);
  }

  var MobileSwiper = new Swiper('[data-slider="gallery-thumbs-mobile"]', _galleryThumbs);

  EventBus.subscribe('update_variant:insales:product', function (variant) {
    if (!variant.first_image.from_variant) {
      return;
    }

    if (variant.action.quantityState.change) {
      return;
    }

    if(variant.action.product.is('[data-main-form]')){
      var currentSlideNumber = $('[data-slider="gallery-thumbs-mobile"]')
        .find('[href="' + variant.first_image.original_url + '"]')
        .attr('data-slide-number');

      var currentSlide = $('[data-slider="gallery-thumbs"]')
        .find('[href="' + variant.first_image.original_url + '"]');

      MobileSwiper.slideTo(currentSlideNumber - 1);

      if (MainSwiper) {
        MainSwiper.slideTo(currentSlideNumber - 1);
      }
    }
    copySrc(currentSlide);
  });
})();

// Copy src select image in main-image
(function () {
  if (Site.template !== 'product') {
    return;
  }

  $(document).on('click', '.js-copy-src', function (event) {
    event.preventDefault();
    copySrc(this);
    var product_id = $('.product-control').attr('data-compare');
    var select_variant;
    var href = $(this).attr('href');

    Products.get(product_id)
      .done(function (product) {
        select_variant = _.find(product.variants, function (variant) {
          return (href == variant.first_image.original_url);
        });

        if (!select_variant) {
          return;
        }
        Products.getInstance($('.product-form'))
          .done(function (_product) {
            return _product.variants.setVariant(select_variant.id);
          });
      });
  });

  // Find main-image in fancybox gallery, and emulate click on fancybox
  $(document).on('click', '#gallery', function (event) {
    event.preventDefault();

    var count = $('#gallery').attr('data-gallery-count');

    $('.mobile-wrapper').find('[data-slide-number="' + count + '"]')
      .trigger('click');

    return false;
  });
})();

$('.product-card-image').hover(function() {
  var sec_img = $(this).attr('second-image');
  if (sec_img) {
    $(this).attr('old-src',$(this).attr('src'));
    $(this).attr('src', sec_img);
  }
}, function() {
  var old_img = $(this).attr('old-src');
  if (old_img) {
    $(this).attr('src', old_img);
  }
});

EventBus.subscribe('update_variant:insales:product', function (variant) {
  if (!variant.action.product.is('[data-main-form]')) {
    return;
  }
  $('.product-prices.on-page').show();

  var $product = variant.action.product;
  var $buttonBuy = $('.js-variant-shown');
  var $buttonHidden = $('.js-variant-hidden');
  var $quickCheckout = $product.find('[data-quick-checkout]');
  var $buttonPreorder = $('.js-variant-preorder');
  var $priceCurrent = $product.find('.js-product-price');
  var $priceOld = $product.find('.js-product-old-price');
  var $skuWrapper = $product.find('.js-product-sku-wrapper');
  var $sku = $product.find('.js-product-sku');
  var $quantity = $product.find('.js-variant-counter');

  var notAvailable = InsalesThemeSettings.product_not_available;

  window.__savedVariant = variant;
  $buttonBuy.hide();
  $quantity.hide();
  $buttonHidden.hide();
  $buttonPreorder.hide();
  $quickCheckout
    .hide()
    .prop('disabled', true);

  $priceCurrent
    .html(Shop.money.format(variant.action.price));
  $priceOld
    .html(Shop.money.format((_.toFinite(variant.old_price) > _.toFinite(variant.price)) ? variant.old_price : null));

  if (variant.sku) {
    $skuWrapper.show();
    $sku.text(variant.sku);
  }
  else {
    $skuWrapper.hide();
  }

  if (variant.available) {
    $buttonBuy.show();
    $quantity.show();
    $quickCheckout
      .show()
      .prop('disabled', false);
  }
  else {
    switch (notAvailable) {
      case 'preorder':
        $buttonPreorder.show();
        $quickCheckout.hide();
        break;
      case 'hidden':
        $buttonHidden.show();
        $quickCheckout.hide();
        $quantity.hide();
        break;
      case 'shown':
        $buttonBuy.show();
        $quantity.show();
        $quickCheckout
          .show()
          .prop('disabled', false);
        break;
    }
  }
});

(function () {
  $(document).on('click', '.js-variant-preorder', function (event) {
    event.preventDefault();

    var _variant = window.__savedVariant;
    var preorderForm = {
      fields: [
        {
          title: Site.messages.field_email,
          name: 'from',
          required: true,
        },
        {
          title: Site.messages.field_name,
          name: 'name',
          required: true,
        },
        {
          type: 'hidden',
          name: 'preorder_caption',
          value: Site.messages.preorder
        },
        {
          type: 'hidden',
          name: 'subject',
          value: Site.messages.preorder
        },
        {
          title: Site.messages.label_product,
          name: 'product',
          type: 'hidden',
          value: _variant.action.productJSON.title,
        },
        {
          title: 'Вариант',
          name: 'variant',
          type: 'hidden',
          value: _variant.title,
        },
      ],
      combineOrder: { content: { fields: [ 'preorder_caption', 'product', 'variant' ] } }
    };

    alertify.modal({ formDefination: preorderForm }).set('title', Site.messages.preorder);
  });
})();

EventBus.subscribe('update_variant:insales:product', function (data) {
  var _discountElement = $('[data-labels-id="' + data.action.productJSON.id + '"]').find('.js-label-discount');
  var _discount = null;

  if (!data.action.product.is('[data-main-form]')) {
    return;
  }

  if (data.old_price && _.toFinite(data.old_price) > _.toFinite(data.price)) {
    _discount = (data.price * -100) / data.old_price + 100;
    _discountElement
      .text(_.round(_discount, 0) + '%')
      .removeClass('hidden');
  }
  else {
    _discountElement.addClass('hidden');
  }
});
(function () {
  if (Site.template == 'article') {

    new Swiper ('[data-slider="article-related-products"]', {
      slidesPerView: 3,
      spaceBetween: 24,

      breakpoints: {
        380: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2
        },
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 2
        }
      }
    });

};

})();
// Пересчет суммы корзины
$(function(){
  
  
  //подарок при сумме корзины больше числа, указанного в блоке podarok-pri-summe-zakaza-bolshe
    if ( _gift ) {
    EventBus.subscribe('add_items:insales:cart', function (data) {
     console.log(data);
      
     var hasGift = _.findKey(data.order_lines, { 'variant_id': 260261334 });

     if (data.total_price >= _gift && (!hasGift)) {
        $.post('/cart_items.json', {
          variant_id: 260261334 ,
          quantity: 1,
          comment: "test comment"
        })
        .done(function (cart) {
            alertify.success("Вам подарок");
        })
    
     }


  });
  

  EventBus.subscribe('update_items:insales:cart', function (data) {

    var tt = $('[data-item-delete="260261334"]');
    var hasGift = _.findKey(data.order_lines, { 'variant_id': 260261334 });

    
    setTimeout(function run() {

    if (data.total_price < _gift && hasGift) {
      
        $(tt).click();

    }      
      
      
      
    }, 900);
    

    



  });
  
 
  if (Site.template == 'cart') {
      EventBus.subscribe('set_items:insales:cart', function (data) {
        var tt = $('[data-item-delete="260261334 "]');

        var hasGift = _.findKey(data.order_lines, { 'variant_id': 260261334 });

        if (data.total_price >= _gift && (!hasGift)) {
          alertify.success("Вам подарок");     
            $.post('/cart_items.json', {
              variant_id: 260261334,
              quantity: 1,
              comment: ""
            })
            .done(function (cart) {

                location.reload();


            })


        }


      });
  }
  
  }
  
  // конец подарка при сумме корзины больше чем указано в переменной _gift
  
  
  
  
  
  
  
  
  EventBus.subscribe('update_items:insales:cart', function (data) {
    if (Site.template != 'cart') {
      return false;
    }
    //
    // console.log('cart: ', data);
    //  console.log(data.total_price);
    $('.js-shopcart-total-summ').html(Shop.money.format(data.total_price));
  });

  // пересчет актуальной цены за товар и общей стоимости позиции
  EventBus.subscribe('update_variant:insales:item', function (data) {
    if (Site.template != 'cart') {
      return false;
    }

    var $item = data.action.product;
    var $price = $item.find('.js-item-price');
    var $total = $item.find('.js-item-total-price');
    var total = data.action.price * data.action.quantity.current;

    $price.html(Shop.money.format(data.action.price));
    $total.html(Shop.money.format(total));
  });

  // Удаляем позицию
  EventBus.subscribe('delete_items:insales:cart', function (data) {
    if (Site.template != 'cart') {
      return false;
    }
    
    var $button = data.action.button;
    
    if (!$button) {
        var $button = $(`[data-item-delete='${data.action.items[0]}']`)	 
    }
    
    var $cartItem = $button.parents('.cart-item:first');
    var $emptyMessage = $('.js-cart-empty');
    var $cartForm = $('[data-cart-form]');

    $cartItem
      .slideUp(300, function () {
        $(this).remove();

        if (data.order_lines.length == 0) {
          $cartForm
            .addClass('hidden');
          $emptyMessage
            .removeClass('hidden');
        }
      });
  });

  // Выводим список применившихся скидок
  EventBus.subscribe('update_items:insales:cart', function (data) {
    if (Site.template != 'cart') {
      return false;
    }

    // console.log('>>', data);
    $('.js-discount-comment-list').html(Template.render(data, 'cart-discounts'));
  })

  // widget
  EventBus.subscribe('update_items:insales:cart', function (data) {
    $('.js-shopcart-widget-count').html(_.round(data.items_count, 3));
  });
});
$(function () {
  var $pass = $('#client_password, #client_password_confirmation');

  $('[name="client[change_password]"]').on('click', function () {
    if (this.checked) {
      $('#change_password_fields').show();
      $pass.prop('disabled', false);
    } else {
      $('#change_password_fields').hide();
      $pass.prop('disabled', true);
    }
  });

  $('#delivery_address .field, #checkout_buyer_fields .field').each(function () {
    var $field = $(this);

    if ($field.find('input[type="checkbox"]').length) {
      $field.addClass('is-checkbox');
    }
  });

  $('.field.is-checkbox').each(function () {
    var $field = $(this);
    $field
      .find('.small')
        .appendTo($field);
  });

  $('.field-content.small').removeClass('small');
});
(function(){
  $('.js-open-filter').on('click', function () {
    alertify.panel({
      target: $('[data-modal="collection-filter"]').html(),
      position: 'left',
      onOpen: function (modal) {
        InSalesUI.Filter.create($(modal));
      }
    });
  });
}())
;
EventBus.subscribe('update_items:insales:compares', function (data) {
  $('.js-compares-widget-count').html(data.products.length);
});

EventBus.subscribe('update_items:insales:compares', function (data) {
  var $product = $('.product-form');
  var productId = $product.data('product-id');
  var $compareAdd = $product.find('.js-compare-add');
  var $compareDelete = $product.find('.js-compare-delete');

  var inCompare = _.find(data.products, function(product) {
    return product.id == productId;
  });

  if (inCompare) {
    $compareAdd.hide();
    $compareDelete.show();
  } else {
    $compareAdd.show();
    $compareDelete.hide();
  }
});
EventBus.subscribe('remove_item:insales:compares', function (data) {
  if (Site.template != 'compare') {
    return false;
  }

  $('[data-compared-id="'+ data.action.item +'"]').remove();

  if (data.products.length == 0) {
    $('#js-compare-inner').hide();
    $('.js-compare-empty').removeClass('hidden');
  };
});

$(function () {
  var compareWrapper = '#js-compare-wrapper';
  var compareInner = '#js-compare-inner';
  localforage.setItem('same_row', '0');
  $(document).on('click', '.js-same-toggle', function (event) {
    $(this).find('.link-text')
      .toggleClass('hide')
      .toggleClass('show');
    this.same_row = !this.same_row;
    localforage.setItem('same_row', (this.same_row ? '1' : '0'));
    $('.js-compare-table .same-row')
      .toggle();
  });

  EventBus.subscribe('update_items:insales:compares', function (data) {
    if (Site.template != 'compare') {
      return false;
    }
    if (data.products.length < 1) {
      return false;
    }

    var _now = new Date().getTime();
    var _url = '?' + _now;
    var _getNode = _url + compareWrapper + ' ' + compareInner;

    $(compareWrapper).load(_getNode, function () {

      if ($('.js-compare-table .same-row').length && (data.products.length > 1)){
        $('.compare-toolbar').removeClass('hidden');
        localforage.getItem('same_row')
          .then(function (same_row) {
            console.log('>>', same_row);
            setTimeout(function () {
              if (same_row == '1') {
                $('.js-same-toggle').find('.link-text')
                  .toggleClass('hide')
                  .toggleClass('show');
                $('.js-compare-table .same-row')
                  .hide();
              }
            }, 0)
          })
      }
      else{
        $('.compare-toolbar').addClass('hidden');
      }
    });
  });
});
class Gifts {
  constructor(items){
    this.GiftsState = items
    this.settings = { property: 22747625 }
    this.init()
  }
  async getVariant(product){
    return ( await $.get(`/products_by_id/${product}.json`) )
      .products[0].variants[0].id
  }
  async buildGiftState(){
    for ( let item in this.GiftsState ) {
      
      let Gift = this.GiftsState[item]
      Gift.currentProducts = 0;
      Gift.variant_id = await this.getVariant( Gift.product_id ) 
      
    }
  }
  async init() {
    await this.cartUpdate()
  }
  async cartUpdate(){
    this.Cart = Cart.order.order_lines
    await this.buildGiftState()
    await this.createProducts()
    await this.buildCart()
  }
  async createProducts(){
    this.products = _.uniq(
      this.Cart.map(item => item.product_id )
    )
    await this.getProducts()
  };
  async buildCart() {
    this.ProductsJSON.map( p => {              
      let chars      = p.characteristics
      let product_id =  p.id 
      chars.map( c => {
        if ( c.property_id == this.settings.property )
          this.Cart.map(item => {
            if ( item.product_id == product_id && !item.ready ) { 
              item.gift  = c.permalink
              item.ready = true 
            }
          })
      })          
    })

  };
  async getProducts() {
    let promises = []
    this.ProductsJSON = []
    let formRequests = ( products, promises ) => { 
      promises.push( 
        $.get(`/products_by_id/${products.join(',')}.json`)
      ) 
    }
    if ( this.products.length > 0 ) {
      if ( this.products.length > 25 ) {
        for ( let pack of _.chunk( this.products , 25 ) ) 
          formRequests( pack , promises )
      } else {
        formRequests( this.products , promises )
      }
      ( await Promise.all( promises ) ) 
        .map(
        pack => pack.products.map( 
          product => this.ProductsJSON.push( product ) 
        )
      )
    };
  };
  async CartObserver(){

    await this.cartUpdate()

    this.Cart.map(item => {
      if ( item.gift ) { 
        if ( this.GiftsState[item.gift].only_one ) { 
          this.GiftsState[item.gift].currentProducts = item.quantity
        } else {
		  this.GiftsState[item.gift].currentProducts = this.GiftsState[item.gift].currentProducts + 1
        }
      }
    })

    for ( let prop in this.GiftsState ) {

      let Gift = this.GiftsState[prop]

      if ( Gift.currentProducts > 1 ) {

        let inCart = false 

        this.Cart.map( item => {
          if ( Gift.product_id == item.product_id )
            inCart = true
        })

        if ( !inCart ) {
          Cart.set({items: {[Gift.variant_id]: 1}});
          alertify.success('Вам подарок')
        }

      } else {
        
        let inCart = false 

        this.Cart.map( item => {
          if ( Gift.product_id == item.product_id )
            inCart = true
        })

        if ( inCart ) 
          Cart.delete({items: [Gift.variant_id]})
        
      }
    }
    
	await this.StyleGift();
    
  }
  async StyleGift(){
    if ( Site.template == 'cart' )
     for ( let prop in this.GiftsState ) {
       let item = $(`[data-item-id=${this.GiftsState[prop].variant_id}]`)  	
       item.find('.item-counter').html(`<span style="color: gray;text-transform: uppercase;">Подарок</span>`)
       item.find('.item-prices').css('opacity', 0 )
       item.find('.is-item-delete').css('opacity', 0 ).prop('disabled',true)
     }
  }
}
;



















