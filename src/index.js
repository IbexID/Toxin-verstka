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
import Chart from 'chart.js/auto';

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

//chart js
var ctx = document.getElementById("mychart").getContext("2d");
var orange = ctx.createLinearGradient(0, 0, 0, 400);
orange.addColorStop(0, 'rgba(255,227,156,1)');   
orange.addColorStop(1, 'rgba(255,186,156,1)');
var green = ctx.createLinearGradient(0, 0, 0, 400);
green.addColorStop(0, 'rgba(111, 207, 151, 1)');   
green.addColorStop(1, 'rgba(102, 210, 234, 1)');
var purple = ctx.createLinearGradient(0, 0, 0, 400);
purple.addColorStop(0, 'rgba(188, 156, 255, 1)');   
purple.addColorStop(1, 'rgba(139, 164, 249, 1)');
var black = ctx.createLinearGradient(0, 0, 0, 400);
black.addColorStop(0, 'rgba(144, 144, 144, 1)');   
black.addColorStop(1, 'rgba(61, 73, 117, 1)');



const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
      listContainer = document.createElement('ul');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'column-reverse';
      listContainer.style.margin = 0;
      listContainer.style.padding = '0';
      listContainer.style.position = 'absolute';
      listContainer.style.top = '-96px';
      listContainer.style.marginLeft = '251px';
      
  
      legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
  };
  
  const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);
  
      // Remove old legend items
      while (ul.lastChild) {
        ul.lastChild.remove();
      }
  
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
  
      items.forEach(item => {
        const li = document.createElement('li');
        li.style.alignItems = 'left';
        li.style.cursor = 'pointer';
        li.style.display = 'flex';
        li.style.flexDirection = 'row';
  
        li.onclick = () => {
          const {type} = chart.config;
          if (type === 'pie' || type === 'doughnut') {
            // Pie and doughnut charts only have a single dataset and visibility is per item
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          }
          chart.update();
        };
  
        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = 'linear-gradient(180deg, #FFE39C 0%, #FFBA9C 100%)';
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = 0;
        boxSpan.style.display = 'inline-block';
        boxSpan.style.height = '10px';
        boxSpan.style.marginRight = '5px';
        boxSpan.style.marginTop = '7px';
        boxSpan.style.width = '10px';
        boxSpan.style.borderRadius = '50%';
  
        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = 'rgba(31, 32, 65, 0.75)';
        textContainer.style.fontFamily = 'Montserrat, sans-serif';
        textContainer.style.fontSize = '14px';
        textContainer.style.lineHeight = '24px';
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
  
        const text = document.createTextNode(item.text);
        textContainer.appendChild(text);
  
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };
const datapoints = [0, 65, 65, 130 ];
  const counter = {
    id: 'counter',
    beforeDraw( chart, args, options ) {
        const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
        ctx.save();
        ctx.font = 'bold 24px Montserrat';
        ctx.lineHeight = '29px';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#BC9CFF';
        ctx.fillText(datapoints.reduce(function(a, b) { return a + b }, 0), width/2, top + (height / 2)-2);
        ctx.font = 'normal 15px Montserrat';
        ctx.lineHeight = '15px';
        ctx.fillText('голосов', width/2, top + (height / 2)+ 17);
    }
}; 

var mygraph = new Chart(ctx, {
    type: 'doughnut',
    data: {
        //labels: ['Великолепно', 'Хорошо', 'Удовлетворительно', 'Разочарован'],
        labels: ['Разочарован', 'Удовлетворительно', 'Хорошо', 'Великолепно'],
        datasets: [
            {
                label: 'голосов',
                //backgroundColor: [orange , green,  purple, black ],
                backgroundColor: [ black, purple, green , orange ],
                borderColor: '#fff',
                data: datapoints,
                //data: [130, 65, 65, 0 ]
            }]
        },
        options: {
            layout: {
                padding: {
                    right: 1,
                }
            },
            cutout: "90%",
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '260',
                position: 'bottom',
            },
            plugins: {
                htmlLegend: {
                    // ID of the container to put the legend in
                    containerID: 'chartjslegend',
                },
                legend: {
                    display: false
                    }
                }
        },
        plugins: [htmlLegendPlugin, counter],
});