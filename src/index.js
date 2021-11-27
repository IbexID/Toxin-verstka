import $ from 'jquery'
import '../src/styles/jquery-ui.css'
import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import './js/jquery-ui.min'
import './js/jquery.inputmask.min'
import '../src/styles/item-quantity-dropdown.min.css'
import './styles/style.scss'
import '../src/js/item-quantity-dropdown.min'
import './pug/index.pug'

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
let arrival, departure;
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
    buttons: ['clear', apply]

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

})


$("#masked-text-field").inputmask({
    alias: "datetime",
    placeholder: "ДД.ММ.ГГГГ",
    showMaskOnFocus: false,
    inputFormat: "dd.mm.yyyy",
    min: "01.01.1930",
    max: "31.12.2021"
});

//range-slider
$("#slider").slider({
    animate: "slow",
    range: true,
    min: 0,
    max: 17000,
    step: 100,
    values: [5000, 10000],
    slide: function (event, ui) {
        $("#result").text(ui.values[0] + "₽" + " — " + ui.values[1] + "₽");
    }
});
$("#result").text($("#slider").slider("values", 0) + "₽" + " — " + $("#slider").slider("values", 1) + "₽");



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
     setSelectionText: function(itemCount, totalItems) {
         let text = this.selectionText;
         text = declOfNum(totalItems, ['гость', 'гостя', 'гостей']);
         return `${totalItems} ${text}`;
     },
  });