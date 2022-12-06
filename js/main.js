$(document).ready(function(){


    function UpdateClasses(a){
        $('.btn-pref-active').attr('class','btn-pref');
        $(a).addClass('btn-pref-active');
    }

    $('#1').click(function(){
        UpdateClasses(this);
        $('.img-pref').attr('src','./img/face.png');
        $('.text').html('Учитываются все особенности Вашего здоровья. Для нас важно, чтобы занятия не были во вред Вашему здоровью.');
    });

    $('#2').click(function(){
        UpdateClasses(this);
        $('.img-pref').attr('src','./img/hand.png');
        $('.text').html('Результат работы не заставит себя ждать! Уже через неделю вы увидите изменения в зеркале.');
    })

    $('#3').click(function(){
        UpdateClasses(this);
        $('.img-pref').attr('src','./img/calen.png');
        $('.text').html('Дни и время занятий подбираются индивидуально под Вас.');
    })

    $('#4').click(function(){
        UpdateClasses(this);
        $('.img-pref').attr('src','./img/cart.png');
        $('.text').html('Для более эффективного и быстрого результатамы составим для Вас фитнес-меню с учетом Ваших предпочтений.');
    })
    
    function UpdateClasses1(a){
        $('.active').attr('class','btn_mobile');
        $(a).addClass('active');
    }
    
    $('#5').click(function(){
        UpdateClasses1(this);
        $('.title_mobile').html('Учет особенностей здоровья');
        $('.img-pref-mobile').attr('src','./img/face.png');
        $('.text_mobile').html('Учитываются все особенности Вашего здоровья. Для нас важно, чтобы занятия не были во вред Вашему здоровью.');
    });
    
    $('#6').click(function(){
        UpdateClasses1(this);
        $('.title_mobile').html('Эффективность упражнений');
        $('.img-pref-mobile').attr('src','./img/hand.png');
        $('.text_mobile').html('Результат работы не заставит себя ждать! Уже через неделю вы увидите изменения в зеркале.');
    })
    
    $('#7').click(function(){
        UpdateClasses1(this);
        $('.title_mobile').html('Индивидуальный график');
        $('.img-pref-mobile').attr('src','./img/calen.png');
        $('.text_mobile').html('Дни и время занятий подбираются индивидуально под Вас.');
    })
    
    $('#8').click(function(){
        UpdateClasses1(this);
        $('.title_mobile').html('Персональное питание');
        $('.img-pref-mobile').attr('src','./img/cart.png');
        $('.text_mobile').html('Для более эффективного и быстрого результатамы составим для Вас фитнес-меню с учетом Ваших предпочтений.');
    })
     // вешаем маску на телефон
     $('.phone-field').inputmask("+375(99)999-99-99");
     $('.phone-field1').inputmask("+375(99)999-99-99");
    
     // добавляем правило для валидации телефона
     jQuery.validator.addMethod("checkMaskPhone", function(value, element) {
         return /\+\d{3}\(\d{2}\)\d{3}-\d{2}-\d{2}/g.test(value); 
     });
     
     // получаем нашу форму по class
     var form = $('.form-request');
     var form1 = $('.form-request1');
     // включаем валидацию в форме
     form.validate();
     form1.validate();
     // вешаем валидацию на поле с телефоном по классу
     $.validator.addClassRules({
         'phone-field': {
             checkMaskPhone: true,
         },
         'phone-field1': {
            checkMaskPhone: true,
        }
     });
     
     
     // Проверка на валидность формы при отправке, если нужно
     form.submit(function(e){
         e.preventDefault();
         if (form.valid()) {
             alert('Форма отправлена');
         }
         else
        {
            alert('Введите корректные значения');
        }
         return;
     });
     form1.submit(function(e){
        e.preventDefault();
        if (form1.valid()) {
                document.querySelector('.modal.active').classList.remove('active');
                document.querySelector('.overlay').classList.remove('active');
                //form1.remove();
        }
        else
        {
            alert('Введите корректные значения');
        }
        return;
    });
 
    
});
   
class Slider {
    constructor(slider, autoplay = true) {
        // элемент div.carousel
        this.slider = slider;
        // все кадры (слайды)
        this.allFrames = slider.querySelectorAll('.carousel-item');
        // цепочка кадров
        this.frameChain = slider.querySelector('.carousel-slides');
        // кнопка «вперед»
        this.nextButton = slider.querySelector('.carousel-next');
        // кнопка «назад»
        this.prevButton = slider.querySelector('.carousel-prev');

        this.index = 0; // индекс кадра, который сейчас в окне просмотра
        this.length = this.allFrames.length; // сколько всего есть кадров
        this.autoplay = autoplay; // включить автоматическую прокрутку?
        this.paused = null; // чтобы можно было выключать автопрокрутку

        this.init(); // инициализация слайдера
    }

    init() {
        this.dotButtons = this.dots(); // создать индикатор текущего кадра

        // все кадры должны быть одной ширины, равной ширине окна просмотра;
        // если кадров три, то ширина каждого кадра будет 100/3 = 33.33333%
        // от ширины контейнера .carousel-slides, то есть 900 пикселей
        this.allFrames.forEach(frame => frame.style.width = 100/this.length + '%');
        // ширина цепочки кадров должна равна ширине всех кадров, то есть
        // 900*3 = 2700 пикселей; но удобнее задать в процентах от родителя,
        // если кадров три, то ширина контейнера кадров будет 100*3 = 300%
        this.frameChain.style.width = 100 * this.length + '%';

        this.nextButton.addEventListener('click', event => { // клик по кнопке «вперед»
            event.preventDefault();
            this.next();
        });

        this.prevButton.addEventListener('click', event => { // клик по кнопке «назад»
            event.preventDefault();
            this.prev();
        });

        // клики по кнопкам индикатора текущего кадра
        this.dotButtons.forEach(dot => {
            dot.addEventListener('click', event => {
                event.preventDefault();
                const index = this.dotButtons.indexOf(event.target);
                if (index === this.index) return;
                this.goto(index);
            });
        });

        if (this.autoplay) { // включить автоматическую прокрутку?
            this.play();
            // когда мышь над слайдером — останавливаем автоматическую прокрутку
            this.slider.addEventListener('mouseenter', () => clearInterval(this.paused));
            // когда мышь покидает пределы слайдера — опять запускаем прокрутку
            this.slider.addEventListener('mouseleave', () => this.play());
        }
    }

    // перейти к кадру с индексом index
    goto(index) {
        // изменить текущий индекс...
        if (index > this.length - 1) {
            this.index = 0;
        } else if (index < 0) {
            this.index = this.length - 1;
        } else {
            this.index = index;
        }
        // ...и выполнить смещение
        this.move();
    }

    // перейти к следующему кадру
    next() {
        this.goto(this.index + 1);
    }

    // перейти к предыдущему кадру
    prev() {
        this.goto(this.index - 1);
    }

    // рассчитать и выполнить смещение
    move() {
        // на сколько нужно сместить, чтобы нужный кадр попал в окно
        const offset = 100/this.length * this.index;
        this.frameChain.style.transform = `translateX(-${offset}%)`;
        this.dotButtons.forEach(dot => dot.classList.remove('active'));
        this.dotButtons[this.index].classList.add('active');
    }

    // запустить автоматическую прокрутку
    play() {
        this.paused = setInterval(() => this.next(), 3000);
    }

    // создать индикатор текущего слайда
    dots() {
        const ol = document.createElement('ol');
        const children = [];
        for (let i = 0; i < this.length; i++) {
            let li = document.createElement('li');
        }
        this.slider.prepend(ol);
        return children;
    }
   
}
