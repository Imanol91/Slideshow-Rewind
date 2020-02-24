/**
 * SlideshowRewind v1.0
 * 
 * Emanuel Rojas Vásquez
 * Copyright 2020, MIT License
 */

(function(win, doc){

    const Style = doc.createElement("style");
    doc.head.appendChild(Style);

    let Content = "* { margin: 0; padding: 0;  box-sizing: border-box; }";

    Content += 'erv-slideshow[data-type="Rewind"][data-orientation="Horizontal"]{ overflow: hidden; display: -ms-flexbox; display: -webkit-flex; display: flex; position: relative;}';
    Content += 'erv-slideshow *:not(erv-slide *){ position: absolute; }';
    Content += 'erv-slideshow [data-function="Controls"] *{ position: static; }';
    Content += 'erv-slideshow [data-function]{ position: absolute; }';
    Content += 'erv-slideshow[data-type="Rewind"][data-orientation="Horizontal"] erv-roll{ left: 0; width: 100%; height: 100%; white-space: nowrap; font-size: 0; }';
    Content += 'erv-slideshow[data-type="Rewind"][data-orientation="Horizontal"] erv-slide{ display: inline-block; vertical-align: top; height: 100%; width: 100%; font-size: 1rem; position: relative; overflow: hidden;}';
    Content += 'erv-slideshow erv-slide [data-function="Background-Full"]{ width: 100%; height: 100%; position: absolute; z-index: -1; }';
    Content += 'erv-slideshow erv-slide [data-function="Background-Cut"]{ height: 105%; position: absolute; z-index: -1; }';
    Content += 'erv-slideshow erv-slide > * { position: absolute; }';

    Content += 'erv-slideshow[data-type="Rewind"][data-orientation="Vertical"]{ overflow: hidden; display: -ms-flexbox; display: -webkit-flex; display: flex; position: relative;}';
    Content += 'erv-slideshow[data-type="Rewind"][data-orientation="Vertical"] erv-roll{ left: 0; width: 100%; height: 100%; white-space: nowrap; font-size: 0; }';
    Content += 'erv-slideshow[data-type="Rewind"][data-orientation="Vertical"] erv-slide{ display: block; vertical-align: top; height: 100%; width: 100%; font-size: 1rem; position: relative; overflow: hidden;}';

    Style.innerHTML = Content;

    const ervSlideshow = (function(win, doc){
        
        const Tag         = Symbol('erv-slideshow');
        const Name        = Symbol('data-name');
        const Roll        = Symbol('erv-roll');
        const Slides      = Symbol('erv-slide');
        const Transition  = Symbol('data-transition');
        const Callback    = Symbol('Callback');
        const Ratio       = Symbol('data-ratio');
        const Counter     = Symbol('Counter');
        const Next        = Symbol('Next()');
        const Previous    = Symbol('Previous()');
        const Index       = Symbol('Index');
        const Continuity  = Symbol('data-continuity');
        const Orientation = Symbol('data-orientation');
        const Flag        = Symbol('data-deletear');

        const Xi = Symbol('X-initial');
        const Xf = Symbol('X-final');
        const Yi = Symbol('Y-initial');
        const Yf = Symbol('Y-final');
        const Xis = Symbol('X-initial-static');
        const Yis = Symbol('Y-initial-static');
        const Xt = Symbol('X-traveled');
        const Yt = Symbol('Y-traveled');

        const Catch = Symbol('Catcher');
        const Overflow = Symbol('overflow');

        const isMobile = function(){
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
                return true;
            }
            return false;
        }

        const Slideshow = function(tag, options){

            if( tag.tagName !== "ERV-SLIDESHOW" || !tag.hasAttribute("data-name") ){
                alert("[tag] is not a valid tag!");
                throw "[tag] is not a valid tag!";
            }

            if(options){
                if( !options.Transition && !options.Ratio       && !options.Callback &&
                    !options.Next       && !options.Previous    && !options.Counter  &&
                    !options.Continuity && !options.Orientation && !options.Name     ){
                    alert("[options] is not a valid object!");
                    throw "[options] is not a valid object!";
                }
            }

            this[Tag] = tag;
            this[Tag].setAttribute("data-type", "Rewind");
            this[Name] = this[Tag].getAttribute("data-name");

            const tempOrientation = this[Tag].getAttribute("data-orientation");

            if(tempOrientation === "Horizontal" || tempOrientation === "Vertical"){
                this[Orientation] = tempOrientation;
            }
            
            this[Roll] = this[Tag].querySelector("erv-roll");    
            if(!this[Roll]){
                this[Roll] = doc.createElement("erv-roll");
                this[Tag].insertBefore(this[Roll], this[Tag].firstChild);
            } 

            this[Transition] = "0.4s";
            if(this[Tag].hasAttribute("data-transition")){
                const temp = parseFloat( this[Tag].getAttribute("data-transition") );
                if(!isNaN(temp) && temp > 0) this[Transition] = temp + "s";
            }
            else  this[Tag].setAttribute("data-transition", "0.4");
            
            if(this[Orientation] === "Horizontal") this[Ratio] = this[Tag].offsetWidth/4.5; //Holgura  => Ratio = 0.22222222...
            else                                   this[Ratio] = this[Tag].offsetHeight/4.5;

            if(this[Tag].hasAttribute('data-ratio')){
                const temp = parseFloat( this[Tag].getAttribute("data-ratio") );
                if(!isNaN(temp) && temp <= 1 && temp > 0 ){
                    if(this[Orientation] === "Horizontal") this[Ratio] = this[Tag].offsetWidth  * temp;
                    else                                   this[Ratio] = this[Tag].offsetHeight * temp;
                }
            }
            else  this[Tag].setAttribute("data-ratio", "0.22");

            this[Continuity] = "Rewind";
            if(this[Tag].hasAttribute('data-continuity')){
                const temp = this[Tag].getAttribute("data-continuity");
                if(temp === "Rewind" || temp === "Pseudo-continuous" || temp === "none") this[Continuity] = temp;
            }
            else   this[Tag].setAttribute("data-continuity", "Rewind");

            this[Index] = 0;            
            this[Callback] = function(index, element){  };
            this[Slides] = this[Tag].getElementsByTagName("erv-slide");

            if(options){ //Si el "options" tiene alguna propiedad validad sobreescriben los valores

                if(options.Orientation){

                    if(typeof options.Orientation === "string" ){
                        switch (options.Orientation) {
                            case "Horizontal": case "Vertical":
                                this[Orientation] = options.Orientation;
                                this[Tag].setAttribute("data-orientation", options.Orientation );
                                break;
                        }
                    }

                }

                if(options.Name){ 
                    if(typeof options.Name === "string" ){
                        this[Name] = options.Name;
                        this[Tag].setAttribute("data-name", options.Name );
                    }  
                }

                if(options.Transition){
                    const temp = parseFloat( options.Transition );
                    if(!isNaN(temp) && temp > 0){
                        this[Transition] = temp + "s";
                        this[Tag].setAttribute("data-transition", options.Transition );
                    } 
                }

                if(options.Ratio){
                    const temp = parseFloat( options.Ratio );
                    if(!isNaN(temp) && temp <= 1 && temp > 0 ){
                        if(this[Orientation] === "Horizontal") this[Ratio] = this[Tag].offsetWidth  * temp;
                        else                                   this[Ratio] = this[Tag].offsetHeight * temp;
                        this[Tag].setAttribute("data-ratio", options.Ratio );
                    } 
                }

                if(options.Callback){ if(options.Callback instanceof Function)  this[Callback] = options.Callback; }
                if(options.Next)    { if(options.Next.tagName)                  this[Next]     = options.Next;}
                if(options.Previous){ if(options.Previous.tagName)              this[Previous] = options.Previous; }
                if(options.Counter) { if(options.Counter.tagName)               this[Counter]  = options.Counter; }

                if(options.Continuity){
                    if(typeof options.Continuity === "string"){
                        switch (options.Continuity){
                            case "Rewind": case "Pseudo-continuous": case "none":
                                this[Continuity] = options.Continuity;
                                this[Tag].setAttribute("data-continuity", options.Continuity );
                                break;
                        }
                    }
                }            
            }

            if(!this[Orientation]){
                alert("[orientation] is not defined!");  
                throw "[orientation] is not defined!";
            }

            if(!this[Name]){
                lert("[Name] is not defined!");  
                throw "[Name] is not defined!";
            }

            if(this[Slides].length > 0){ //Se asegura que el primer Slide tenga la transición
                if(this[Orientation] === "Horizontal") this[Slides][0].style.marginLeft = "0px";
                else                                   this[Slides][0].style.marginTop  = "0px";
                
                this[Slides][0].style.transition = this[Transition];
            }

            this[Counter] = this[Tag].querySelector('[data-function="Counter"]');
            if(!this[Counter]) this[Counter] = doc.querySelector('[data-slideshow="'+ this[Name] +'"][data-function="Counter"]');
            
            if(this[Counter]){
                let asw = "";
                if(this[Slides].length === 0) asw = "0/0";
                else asw = (this[Index] + 1) + "/" + this[Slides].length;
                this[Counter].innerText = asw;
            }

            this[Next] = this[Tag].querySelector('[data-function="Next"]');
            if(!this[Next]) this[Next] = doc.querySelector('[data-slideshow="'+ this[Name] +'"][data-function="Next"]');

            this[Previous] = this[Tag].querySelector('[data-function="Previous"]');
            if(!this[Previous]) this[Previous] = doc.querySelector('[data-slideshow="'+ this[Name] +'"][data-function="Previous"]');

            this[Flag] = false; //Bandera para saber cuando se ha agregado un erv-slide de padding y asi eliminarlo de los resultados
            this[Overflow] = "";
        }

        //METODOS (declarando los metodos de esta forma, los protegemos de sobre-escritura)
        Object.defineProperties(Slideshow.prototype, {

            "Index":{ get(){ return this[Index]; }  },

            "Tag":{ 
                get(){ 
                    this.Slides;
                    return this[Tag]; 
                } 
            },

            "Name":{
                get(){ return this[Name]; },
                set(x){
                    if(typeof x !== "string") return;
                    this[Name] = x; 
                    this[Tag].setAttribute("data-name", x)
                },
            },

            "Roll": { 
                get(){ 
                    this.Slides;
                    return this[Roll]; 
                } 
            },

            "Slides": {
                get(){
                    
                    if(this[Flag]){
                        const del = this[Tag].querySelector('erv-slide[data-deletear]');
                        this[Flag] = false;
                        if(del) del.remove();
                        
                        for (let i = 0; i < this.Count; i++) {
                            this[Slides][i].style.transition = "";
                            this[Slides][i].style.marginLeft = "";
                            this[Slides][i].style.marginTop  = "";
                        }
                        if(this[Slides].length > 0){
                            this[Slides][0].style.transition = this[Transition];
                            if(this.Orientation === "Horizontal") this[Slides][0].style.marginLeft = "-" + this[Index] * this[Tag].offsetWidth + "px";
                            else                                  this[Slides][0].style.marginTop  = "-" + this[Index] * this[Tag].offsetHeight + "px";
                        } 
                    }

                    return this[Slides];
                }
            },

            "Count":{ get(){ return this.Slides.length; } },

            "Length":{ get(){ return this.Slides.length; }, },

            "Transition": {
                get(){ return parseFloat( this[Transition] ); },
                set(x){
                    const temp = parseFloat( x );
                    if(!isNaN(temp) && temp > 0){
                        this[Transition] = temp + "s";
                        this[Tag].setAttribute("data-transition", x );
                        this[Flag] = true;
                        this.Slides;
                    } 
                },
            },

            "Orientation":{
                get(){ return this[Orientation]; },
                set(x){
                    if(typeof x !== "string") return;
                    
                    switch (x) {
                        case "Horizontal": case "Vertical":
                            this[Orientation] = x;
                            this[Tag].setAttribute("data-orientation", x );
                            this.goSlide(this.Index);
                            this.Ratio = this.Ratio + 0;
                            break;
                    }
                }
            },

            "Continuity": {
                get(){ return this[Continuity]; },
                set(x){
                    if(typeof x !== "string") return;

                    switch ( x ) {
                        case "Rewind": case "Pseudo-continuous": case "none":
                            this[Continuity] = x;
                            this[Tag].setAttribute("data-continuity", x );
                            break;
                    }
                }
            },

            "Ratio": {
                get(){ return parseFloat( this[Tag].getAttribute("data-ratio") ); },
                set(x){
                    const temp = parseFloat( x );
                    if(!isNaN(temp) && temp <= 1 && temp > 0 ){
                        if(this[Orientation] === "Horizontal") this[Ratio] = this[Tag].offsetWidth * temp;
                        else                                   this[Ratio] = this[Tag].offsetHeight * temp;
                        this[Tag].setAttribute("data-ratio", x );
                    } 
                }
            },

            "Callback": {
                get(){ return this[Callback]; },
                set(x){ if(x instanceof Function)  this[Callback] = x; }
            },

            "Next": {
                get(){ return this[Next]; },
                set(x){ 
                    if(x.tagName){
                        this[Next] = x;
                        this.goSlide(this.Index);
                    } 
                }
            },

            "Previous": {
                get(){ return this[Previous]; },
                set(x){ 
                    if(x.tagName){
                        this[Previous] = x;
                        this.goSlide(this.Index);
                    } 
                }
            },

            "Counter": {
                get(){ return this[Counter]; },
                set(x){ 
                    if(x.tagName){
                        this[Counter] = x;
                        this.goSlide(this.Index);
                    }  
                }
            },

            "Setting":{
                value: function(options){

                    let mod = false;
                    for (const key in options){ if(this[key]){ this[key] = options[key]; mod = true; } }

                    if(mod) return;
                    
                    alert("[options] is not a valid object!");
                    throw "[options] is not a valid object!";
                },
                writable: false
            },

            "goSlide": {
                value: function(index, fireCallback){
                    const temp = parseInt(index);
                    if(this.Count === 0){ if(this[Counter]) this[Counter].innerText = "0/0"; return; }
                    if(isNaN(temp) || this.Count === 0 || temp > this.Count - 1 || temp < 0) return;
                    
                    this[Index] = temp;
                    //setCounter();
                    if(this[Counter]) this[Counter].innerText = (this.Index + 1) + "/" + this.Count;
        
                    if(this.Orientation === "Horizontal") this.Slides[0].style.marginLeft = "-" + index * this.Tag.offsetWidth + "px";
                    else                                  this.Slides[0].style.marginTop  = "-" + index * this.Tag.offsetHeight + "px";

                    if(fireCallback){
                        const Callbackk = this[Callback];
                        const element = this[Slides][index];
                        Callbackk(index, element);
                    }
                },
                writable: false
            },

            "removeSlides": {
                value: function(slidesIndexes){
                    const temp = [].slice.call(this.Slides);
                    const num  = temp.length - 1;
                    let deleted = false;
        
                    for (let i = 0; i < slidesIndexes.length; i++) {
                        const index = parseInt(slidesIndexes[i]);
                        if(index < 0 || temp.length === 0 || index > num) continue;
                        temp[index].remove();
                        deleted = true;
                    }
        
                    if(!deleted) return;
        
                    let cIndex = this.Index;
                    const mIndex = this.Count - 1
        
                    if(cIndex > mIndex) cIndex = mIndex;
                    if(cIndex < 0)      cIndex = 0;
        
                    //resetSlides();
                    for (let i = 0; i < this.Count; i++) {
                        this.Slides[i].style.transition = "";
                        this.Slides[i].style.marginLeft = "";
                        this[Slides][i].style.marginTop  = "";
                    }
                    if(this.Count > 0) this.Slides[0].style.transition = this[Transition];
                    
                    this.goSlide(cIndex, false);
                },
                writable: false
            },

            "removeSlide": {
                value:function(slideIndex){
                    this.removeSlides([slideIndex]);
                },
                writable: false
            },

            "clearRoll": {
                value: function(){
                    const array = [];
                    for(let i = 0; i < this.Slides.length; i++){ array.push(i); }
                    this.removeSlides(array);
                },
                writable: false
            },

            "addSlides":{
                value: function(HTMLElements){
                    for (let i = 0; i < HTMLElements.length; i++) {
                        const element = HTMLElements[i];
                        if( !(element instanceof Element) ) continue;

                        const Slide = doc.createElement("erv-slide");
                        Slide.appendChild(element);
                        this.Roll.appendChild(Slide);
                    }
                    this[Flag] = true;
                    this.goSlide(this.Index, false);
                },
                writable: false
            },

            "addSlide":{
                value: function(HTMLElement){ this.addSlides([HTMLElement]); },
                writable: false
            },

            "addSlidesBefore": {
                value: function(HTMLElements, index){

                    if( this.Count === 0 || typeof index !== "number" || index < 0 || index > this.Count - 1 ) return;
                    this[Flag] = true;
                    for (let i = 0; i < HTMLElements.length; i++) {
                        const element = HTMLElements[i];
                        if( !(element instanceof Element) ) continue;

                        const Slide = doc.createElement("erv-slide");
                        Slide.appendChild(element);
                        this.Roll.insertBefore(Slide, this.Slides[index]);
                    }
                    
                    this.goSlide(this.Index, false);
                },
                writable: false
            },

            "addSlideBefore": {
                value: function(HTMLElement, index){ this.addSlidesBefore([HTMLElement], index); },
                writable: false
            },

            "addSlidesAfter": {
                value: function(HTMLElements, index){
                    if( this.Count === 0 || typeof index !== "number" || index < 0 || index > this.Count - 1 ) return;
                    this[Flag] = true;
                    for (let i = 0; i < HTMLElements.length; i++) {
                        const element = HTMLElements[i];
                        if( !(element instanceof Element) ) continue;

                        const Slide = doc.createElement("erv-slide");
                        Slide.appendChild(element);
                        this.Roll.insertBefore(Slide, this.Slides[index].nextSibling);
                    }
                    this.goSlide(this.Index, false);
                },
                writable: false
            },

            "addSlideAfter": {
                value: function(HTMLElement, index){ this.addSlidesAfter([HTMLElement], index); },
                writable: false
            },

            "clickEvent": {
                value: function(event){

                    switch (event.target) {
                        case this[Next]:
                        case this[Tag].querySelector('[data-function="Next"]'): 
                        case doc.querySelector('[data-slideshow="'+ this[Name] +'"][data-function="Next"]'):
                            this.nextSlide();        
                            break;

                        case this[Previous]:
                        case this[Tag].querySelector('[data-function="Previous"]'):
                        case doc.querySelector('[data-slideshow="'+ this[Name] +'"][data-function="Previous"]'):
                            this.previousSlide();
                            break;
                    }
                }
            },

            "touchstartEvent":{
                value: function(event){

                    const Ss = event.target.closest('erv-slideshow[data-type="Rewind"][data-orientation="'+ this.Orientation +'"][data-name="'+ this.Name +'"]');

                    if(Ss === this.Tag) this[Catch] = true;
                    else                this[Catch] = false;

                    if(!this[Catch] || this.Count === 0) return;

                    if(doc.body.style.overflow !== "") this[Overflow] = doc.body.style.overflow + "";
                    doc.body.style.overflow = "hidden"; //Para evitar scroll (funciona a medias)

                    this.Slides;

                    this[Xi] = this[Xis] = event.touches[0].clientX;
                    this[Yi] = this[Yis] = event.touches[0].clientY;
                    
                    this[Xt] = 0;
                    this[Yt] = 0;
                },
                writable: false
            },

            "touchmoveEvent":{
                value: function(event){

                    if(!this[Catch] || this.Count === 0) return;

                    this.Slides[0].style.transition = "0s";

                    this[Xf] = event.touches[0].clientX;
                    this[Yf] = event.touches[0].clientY;

                    let px = this[Xi] - this[Xf];
                    let py = this[Yi] - this[Yf];

                    this[Xi] = event.touches[0].clientX;
                    this[Yi] = event.touches[0].clientY;

                    if(this.Orientation === "Horizontal" ) this.Slides[0].style.marginLeft = ( parseInt(this.Slides[0].style.marginLeft, 10) - px ) + "px";
                    else                                   this.Slides[0].style.marginTop = ( parseInt(this.Slides[0].style.marginTop, 10) - py ) + "px";

                    this[Xt] = this[Xis] - this[Xf];
                    this[Yt] = this[Yis] - this[Yf];
                },
                writable: false
            },

            "touchendEvent": {
                value: function(event){

                    if(!this[Catch] || this.Count === 0) return;

                    if(this[Overflow] !== "") doc.body.style.overflow = this[Overflow];
                    else                      doc.body.style.overflow = "";

                    this.Slides[0].style.transition = this[Transition];

                    if(this.Orientation === "Vertical"){
                        if(this[Yt] > 0 && this[Yt] > this[Ratio])  this.nextSlide();
                        else if(this[Yt] < 0 && -this[Yt] > this[Ratio]) this.previousSlide();
                        else  this.goSlide(this.Index);
                    }
                    else{
                        if(this[Xt] > 0 && this[Xt] > this[Ratio])  this.nextSlide();
                        else if(this[Xt] < 0 && -this[Xt] > this[Ratio]) this.previousSlide();
                        else  this.goSlide(this.Index);
                    }

                },
                writable: false
            },

            "resizeEvent":{
                value: function(event){ this.goSlide(this.Index); },
                writable: false
            },

            "activate": {
                value: function(){
                    const self = this;

                    doc.addEventListener("click", function(e){ self.clickEvent(e); }, false);
                    win.addEventListener("resize", function(e){ self.resizeEvent(e); }, false);

                    if(!isMobile()) return; //si no es un movil/Tablet, se evita crear eventos innecesarios

                    doc.addEventListener("touchstart", function(e){ self.touchstartEvent(e); }, false);
                    doc.addEventListener("touchmove", function(e){ self.touchmoveEvent(e); }, { passive: false });
                    doc.addEventListener("touchend", function(e){ self.touchendEvent(e); }, false);
                },
                writable: false
            },

            "nextSlide": {
                value: function(){
            
                    if(this.Count === 0) return;
                    let Indexx = this.Index;        
        
                    if(Indexx === this.Count - 1){
                        if(this.Continuity !== "none") Indexx = 0;

                        if(this.Continuity === "Pseudo-continuous" && this.Count > 2){

                            let sl = Array.from(this.Slides);

                            for (let i = 0; i < sl.length; i++) {
                                sl[i].style.transition = "";
                                sl[i].style.marginLeft = "";
                                sl[i].style.marginTop = "";
                                if(i !== sl.length - 1) sl[i].remove();
                            }
            
                            this.Slides[0].style.transition = this[Transition];
                            if(this.Orientation === "Horizontal") this.Slides[0].style.marginLeft = "-" + (1) * this.Tag.offsetWidth + "px";
                            else                                  this.Slides[0].style.marginTop = "-" + (1) * this.Tag.offsetHeight + "px";
            
                            for (let i = 0; i < sl.length; i++) {
                                if(i !== sl.length - 1) this.Roll.appendChild(sl[i]);
                            }

                            sl = Array.from(this.Slides);
                            this.Slides[1].style.transition = this[Transition];
            
                            const algo = doc.createElement("erv-slide");
                            algo.setAttribute("data-deletear", "");
            
                            this.Roll.insertBefore(algo, sl[0]);
            
                            sl[0].remove();
                            sl[0].style.transition = "";
                            sl[0].style.marginLeft = "";
                            sl[0].style.marginTop = "";
            
                            this.Roll.appendChild(sl[0]);
                            this.Slides[0].style.transition = this[Transition];
                            if(this.Orientation === "Horizontal") this.Slides[0].style.marginLeft = "-" + (1) * this.Tag.offsetWidth + "px";
                            else                                  this.Slides[0].style.marginTop = "-" + (1) * this.Tag.offsetHeight + "px";
            
                            this[Index] = Indexx;
                            if(this[Counter]) this[Counter].innerText = (this.Index + 1) + "/" + (this.Count - 1);
                            this.Callback(Indexx, this.Slides[1]);                            
                            this[Flag] = true;
                            
                            return;
                        }
                    }
                    else if(Indexx < this.Count - 1) Indexx++;
        
                    this.goSlide(Indexx, true);
                },
                writable: false
            },

            "previousSlide": {
                value: function(){
                    
                    if(this.Count === 0) return;
                    let Indexx = this.Index;
        
                    if(Indexx === 0){
                        if(this.Continuity !== "none") Indexx = this.Count - 1;

                        if(this.Continuity === "Pseudo-continuous" && this.Count > 2){

                            let sl = Array.from(this.Slides);

                            for (let i = 0; i < sl.length; i++) {
                                sl[i].style.transition = "";
                                sl[i].style.marginLeft = "";
                                sl[i].style.marginTop = "";
                            }

                            sl[sl.length - 1].remove();

                            
                            if(this.Orientation === "Horizontal") sl[sl.length - 1].style.marginLeft = "-" + this.Tag.offsetWidth + "px";
                            else                                  sl[sl.length - 1].style.marginTop = "-" + this.Tag.offsetHeight + "px";

                            this.Roll.insertBefore(sl[sl.length - 1], this.Slides[0]);

                            sl[sl.length - 1].style.transition = this[Transition];
                            if(this.Orientation === "Horizontal") sl[sl.length - 1].style.marginLeft = "-" + (0) * this.Tag.offsetWidth + "px";
                            else                                  sl[sl.length - 1].style.marginTop = "-" + (0) * this.Tag.offsetHeight + "px";

                            sl = Array.from(this.Slides);

                            for (let i = 0; i < sl.length; i++) {
                                if(i !== 0){
                                    sl[i].remove();
                                    sl[i].style.transition = "";
                                    sl[i].style.marginLeft = "";
                                    sl[i].style.marginTop = "";
                                } 
                            }

                            sl[1].style.transition = this[Transition];
                            if(this.Orientation === "Horizontal") sl[1].style.marginLeft = "-" + (sl.length - 1) * this.Tag.offsetWidth + "px";
                            else                                  sl[1].style.marginTop = "-" + (sl.length - 1) * this.Tag.offsetHeight + "px";

                            let it = sl.length - 1;

                            while(it > 0){
                                this.Roll.insertBefore(sl[it], this.Slides[0]);
                                it--;
                            }
                        }
                    }
                    else if(Indexx > 0) Indexx--;
        
                    this.goSlide(Indexx, true);
                },
                writable: false
            },            

        });

        //Metodo estatico para delegación de eventos (declarando el metodo de esta forma, lo protegemos de sobre-escritura)
        Object.defineProperty(Slideshow, "createEvents",{
            value: function(delegate){

                if(!delegate) return;
    
                if(delegate.click) doc.addEventListener("click", function(e){ delegate.click(e); }, false);
                if(delegate.resize) win.addEventListener("resize", function(e){ delegate.resize(e); }, false);            

                if(!isMobile()) return; //si no es un movil/Tablet, se evita crear eventos innecesarios

                if(delegate.touchstart) doc.addEventListener("touchstart", function(e){ delegate.touchstart(e); }, false);
                if(delegate.touchmove)  doc.addEventListener("touchmove", function(e){ delegate.touchmove(e); }, { passive: false });
                if(delegate.touchend) doc.addEventListener("touchend", function(e){ delegate.touchend(e); }, false);
            },

            writable: false
        });

        return Slideshow;

    })(win, doc);

    //Exposicion de la clase
    win.SlideshowRewind = ervSlideshow;    

})(window, document);