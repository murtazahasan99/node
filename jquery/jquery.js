function $(selector)
{
  const self = {
    element: document.querySelector(selector),
    html: ()=> self.element,
    on: (event, callback) => {
      self.element.addEventListener(event, callback)
    },
    hide: ()=> {
        console.log(this);
      self.element.style.display = 'none';
      return self;
    },
    log: ()=> {
        console.log(self);
      },
    attr: (name, value) => {
      if(value == null)
        return self.element.getAttribute(name)
      else
        self.element.setAttribute(name, value)
        return self;
    }
  }

  return self
}

// Example library calls
$('h1').attr('class', 'new-class')

console.log($('h1').attr('class'))

$('h2').hide().log();

$('h3').on('click', function()
{
  alert("I was clicked")
})