var view = {
  createDivider: function () {
    var divider = document.createElement("div");
    var span = document.createElement("span");
    divider.appendChild(span);
    $(divider).addClass('divider');
    return divider;
  },

  createImageElement: function () {
    var wrapper = document.createElement("div");
    wrapper.className ='element-wrapper';
    var image = document.createElement("div");
    image.className ='element-image';
    var span = [];
    for (var i=0; i<4; i++) {
      span[i]=document.createElement('span');
    }
    var textnodeImage = document.createTextNode("ADD IMAGE "),
    textnodePlus = document.createTextNode("+");
    span[0].appendChild(textnodePlus);
    span[1].className = 'icon-image-placeholder';
    span[2].className = 'add-image-text';
    span[2].appendChild(textnodeImage);
    span[2].appendChild(span[0]);
    span[3].className = 'icon-delete';

    image.appendChild(span[1]);
    image.appendChild(span[2]);
    image.appendChild(span[3]);

    wrapper.appendChild(image);
    return wrapper;
  },

  createTextElement: function() {
    var wrapper = document.createElement('div');
    wrapper.className ='element-wrapper';
    var text = document.createElement('div');
    text.className ='element-text';
    text.contentEditable = true;
    text.dataset.placeholder = "Click here to edit"; 
    var textNode = document.createTextNode(''),
    span = document.createElement('span');
    span.className = 'icon-delete';
    text.appendChild(textNode);
    wrapper.appendChild(span);
    wrapper.appendChild(text);
    return wrapper;
  }
}

module.exports = view;

