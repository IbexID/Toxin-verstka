import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'
import '../src/styles/jquery-ui.css'
/*import localeRu from 'air-datepicker/locale/ru'*/
import $ from 'jquery'
import jQuery from 'jquery'
import './js/jquery-ui.min'
import './js/jquery.inputmask.min'
import './styles/style.scss'
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
    onSelect({date}) {
        departure.update ({
            minDate: date
        })
    },
    minDate: new Date(),
    autoClose: false,
    buttons: ['clear', apply]
    
})

departure = new AirDatepicker('#departure', {
    onSelect({date}){
        arrival.update({
            maxDate: date
        })
    },
    autoClose: false,
    buttons: ['clear', apply],
    
})


$("#masked-text-field").inputmask({ alias: "datetime", placeholder: "ДД.ММ.ГГГГ", showMaskOnFocus: false, inputFormat: "dd.mm.yyyy", min: "01.01.1930", max: "31.12.2021"});

//range-slider
$("#slider").slider({
    animate: "slow",
    range: true,    
    min: 0,
    max: 17000,
    step: 100,
    values: [ 5000, 10000 ],
    slide : function(event, ui) {    
        $("#result").text( ui.values[ 0 ] + "₽" + " — " + ui.values[ 1 ] + "₽");        
    }
});
$( "#result" ).text($("#slider").slider("values", 0)+ "₽"  + " — " + $("#slider").slider("values", 1)+ "₽");