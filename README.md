# mudguard
Prevent elements hijacking wheel events as they scroll past

Essentially, this takes any element you specify and hides it behind a transparent `div` whenever the page scrolls. If the page stops scrolling for any length of time, or the mouse leaves and enters the target element, the `div` is removed. The idea is that any element which accepts scroll-wheel events (such as an embedded scrolling region or Google Map) will only do so when you specifically point the mouse at it and scroll – it will not hijack your existing scroll simply because that scroll brings it under your pointer.
