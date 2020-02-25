# Slideshow-Rewind
A simple library to create slideshow with rewind effect or pseudo continuous effect when we move from the last slide to the first slide and vice versa

NOTE: Touch event are activated only on mobile device

## Getting Started

Download SlideshowRewind.js or SlideshowRewind.min.js file, and on HTML file put this:

``` html
<script src="SlideshowRewind.min.js"></script>
```

or

``` html
<script src="SlideshowRewind.js"></script>
```

then follow the examples in "example" folder

## Options

| Options             | Type     | Default | Description                                                                                                                                                                                                      |
|---------------------|----------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**      | String  |        | Name of slideshow (it is mandatory)                                                                                                                                                                      |
| **Orientation**           | String  |      | "Horizontal" or "Vertical" (it is mandatory)                                                                                               |
| **Continuity**            | String  | "Rewind"  | "Rewind" or "Pseudo-continuous". effect when we pass from the first slice to last slice and vice versa |
| **Transition**      | Integer  | 0.4    | time between transitions |
| **Ratio**     | Integer  | 0.22   | a number from Ratio > 0 to Ratio <= 1 (touchRatio). default is aprox 1/4 slide |
| **Callback**   | Function  | null | a fire function whe slide change. Three parameters are passed to the function: `index` (the current slide index)`slide` (the current slide element) and `itself` (the current instance of slideshow). |
| **Next** | HTMLElement  | null   | a element which fire nextSlide() method. |
| **Previous** | HTMLelement  | null  | a element which fire previousSlide() method. |
| **Counter**  | HTMLElement | null    | a element which print  "current slide/total slides" |

the options above are accessible and configurable from the instance like properties.

## API

A SlideshowRewinde instance exposes the following public methods:

| Methods                  | Description                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `nextSlide()`            | slide to the next slide.                                                                                |
| `previousSlide()`        | slide to the previous slide.                                                                            |
| `goSlide(index, fireCallback)` | slide to the position matching the `index` (integer) (`fireCallback`: boolean for fire Callback function) |
| `addSlide(HTMLElement)`  | add slide to slideshow with HTMLElement inside |
| `addSlides(HTMLElements)`| add slides to slideshow with HTMLElement inside (`HTMLElement`: is a HTMLElement's array) |
| `addSlideBefore(HTMLElement, index)`| add slide to slideshow before slide to the position matching the `index` (integer) |
| `addSlidesBefore(HTMLElements, index)`| similar to previous method but with array's HTMLElements |
| `addSlideAfter(HTMLElement, index)` | add slide to slideshow after slide to the position matching the `index` (integer) |
| `addSlidesAfter(HTMLElements, index)` | similar to previous method but with array's HTMLElements |
| `removeSlide(index)` | remove the slide which matching the `index` (integer) |
| `removeSlide(indexes)` | similar to previous method but with array's index |
| `clearRoll()` | remove all slides from slideshow |
| `activate()`               | enable slideshow (creating five event listeners by each slideshow what used this method ). |

### Accessible and no configurable properties

| Properties               | Description                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `Index`            | Return the current index of the current slide.                                                                |
| `Tag`        | Return <erv-slideshow> tag        |
| `Roll` | Return <erv-roll> tag |
| `Slides`  | Return a nodeList of <erv-slide> |
| `Count`  | Return `Slides.length` |
| `Length` | Return `Slides.length` |

### Accessible and configurable properties



### Delegate methods
Slideshow Rewind allowing delegate events for better performance

| Methods                  | Description                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `clickEvent(event)`            | event for handling click events |
| `touchstartEvent(event)`       | event for handling touch start events |
| `touchmoveEvent(event)`        | event for handling touch move events |
| `touchendEvent(event)`         | event for handling touch end events |
| `resizeEvent(event)`           | event for handling resize events |

### Static methods
Slideshow Rewind have a one static methods for handling delegation events

| Methods                  | Description                                                                                             |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| `SlideshowRewind.createEvents(events)` | `events`: is a plain object with the following properties: { click, resize, touchstart, touchmove, touchend } |

go to example No.7 to see how to use it.

## Authors

* **Emanuel Rojas Vásquez** - *Initial work* - [Imanol91](https://github.com/Imanol91)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
