import $ from 'jquery'
import '../src/styles/jquery-ui.css'
import AirDatepicker from 'air-datepicker'
import slick from 'slick-carousel'
import 'air-datepicker/air-datepicker.css'
import './js/jquery-ui.min'
import './js/jquery.inputmask.min'
import '../src/styles/item-quantity-dropdown.min.css'
import './styles/style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../src/js/item-quantity-dropdown.min'
import './pug/index.pug'

$(".like__input").click(function(){
    if ($(this).hasClass('clicked')) {
        $(this).removeClass('clicked');
        $(this).find('span.like__num').html(parseInt($(this).find('span.like__num').html()) - 1);
        $(this).find('.like__label').html('');
    }
    else {
        $(this).addClass('clicked');
        $(this).find('span.like__num').html(parseInt($(this).find('span.like__num').html()) + 1);
        $(this).find('.like__label').html('');
        
    }
});
//masked text input

$("#masked-text-field").inputmask({
    alias: "datetime",
    placeholder: "ДД.ММ.ГГГГ",
    showMaskOnFocus: false,
    inputFormat: "dd.mm.yyyy",
    min: "01.01.1930",
    max: "31.12.2021"
});
$("#datedropdown").inputmask({
    alias: "datetime",
    placeholder: "ДД.ММ.ГГГГ",
    showMaskOnFocus: true,
    inputFormat: "dd.mm.yyyy",
    min: "01.01.1930",
    max: "31.12.2021"
});
// apply button for air-datepicker
let apply = {
    content: 'Применить',
    className: 'datepicker-here',
    inline: false,
    onClick: (dp) => {
        let date = new Date(dp.selectedDates);
        dp.selectDate(date);
        dp.setViewDate(date);
        dp.hide();
    }
}
// calendars for registration-form
let arrival, departure, datedropdown;
arrival = new AirDatepicker('#arrival', {
    onSelect({
        date
    }) {
        departure.update({
            minDate: date
        })
    },
    minDate: new Date(),
    autoClose: false,
    buttons: ['clear', apply],
    range: true,
})

departure = new AirDatepicker('#departure', {
    onSelect({
        date
    }) {
        arrival.update({
            maxDate: date
        })
    },
    autoClose: false,
    buttons: ['clear', apply],
    range: true,

})
departure = new AirDatepicker('#arrival2', {
    onSelect({
        date
    }) {
        arrival.update({
            maxDate: date
        })
    },
    autoClose: false,
    buttons: ['clear', apply],

})
departure = new AirDatepicker('#departure2', {
    onSelect({
        date
    }) {
        arrival.update({
            maxDate: date
        })
    },
    autoClose: false,
    buttons: ['clear', apply],

})
departure = new AirDatepicker('#august', {
    onSelect({
        date
    }) {
        arrival.update({
            maxDate: date
        })
    },
    inline: true,
    autoClose: false,
    buttons: ['clear', apply],

})
datedropdown = new AirDatepicker('#datedropdown', {
    onSelect({
        date
    }) {
        datedropdown.update({
            minDate: new Date(),
        })
    },
    navTitles: {
        days: 'MMMM <i>yyyy</i>',
    },
    buttons: ['clear', apply],
    minDate: new Date(),
    autoClose: true,
    range: false,

})
datedropdown = new AirDatepicker('#filterdate', {
    onSelect({
        date
    }) {
        datedropdown.update({
            minDate: new Date(),
        })
    },
    dateFormat: 'dd MMM',
    multipleDatesSeparator: " - ",
    navTitles: {
        days: 'MMMM <i>yyyy</i>',
    },
    buttons: ['clear', apply],
    minDate: new Date(),
    autoClose: true,
    range: true,

})



//range-slider
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
$("#slider").slider({
    animate: "slow",
    range: true,
    min: 0,
    max: 15700,
    step: 100,
    values: [5000, 10000],
    slide: function (event, ui) {
        $("#result").text(ui.values[0] + "₽" + " - " + ui.values[1] + "₽");
    }
});
$("#result").text(numberWithSpaces($("#slider").slider("values", 0)) + "₽" + " - " + numberWithSpaces($("#slider").slider("values", 1) + "₽"));



//dropdown menu
function declOfNum(itemCount, totalItems) {
    var cases = [2, 0, 1, 1, 1, 2];
    return totalItems[(itemCount % 100 > 4 && itemCount % 100 < 20) ? 2 : cases[(itemCount % 10 < 5) ? itemCount % 10 : 5]];
}


$(".iqdropdown").iqDropdown({
    setSelectionText: function (itemCount, totalItems) {
        let text1 = this.selectionText;
        text1 = declOfNum(itemCount.item1, ['спальня', 'спальни', 'спален']);
        let text2 = this.selectionText;
        text2 = declOfNum(itemCount.item2, ['кровать', 'кровати', 'кроватей']);
        let text3 = this.selectionText;
        text3 = declOfNum(itemCount.item3, ['ванная комната', 'ванные комнаты', 'ванных комнат']);
        return `${itemCount.item1} ${text1}, ${itemCount.item2} ${text2}, ${itemCount.item3} ${text3}`;
    }
});
/* 
  function declOfNum2(itemCount, totalItems) {  
     var cases = [2, 0, 1, 1, 1, 2];  
     return totalItems[ (itemCount%100>4 && itemCount%100<20)? 2 : cases[(itemCount%10<5)?itemCount%10:5] ];  
 } */

$(".iqdropdown-guest").iqDropdown({
    setSelectionText: function (itemCount, totalItems) {
        let text = this.selectionText;
        text = declOfNum(totalItems, ['гость', 'гостя', 'гостей']);
        return `${totalItems} ${text}`;
    },
});

//slick carousel slider
$('.room__img').slick({
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    dots: true,
    speed: 500,
    arrows: true,

});
