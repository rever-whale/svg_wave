window.Wave = (function () {
  const svgString = `
    <style></style>
     <defs>
     <path id="gentle-wave"
     d="M-160 44c30 0 
        58-18 88-18s
        58 18 88 18 
        58-18 88-18 
        58 18 88 18
        v44h-352z" />
      </defs>
      <g class="parallax">
       <use xlink:href="#gentle-wave" x="50" y="0" fill="#4579e2"/>
       <use xlink:href="#gentle-wave" x="50" y="3" fill="#3461c1"/>
       <use xlink:href="#gentle-wave" x="50" y="6" fill="#2d55aa"/>  
      </g>
`;

  class Wave {
    constructor(parent) {
      this.parent = parent;
      this._svg = null;
      this._top = null;
      this._bottom = null;
      this._wrapper = null;
      this.rate = 0;
    }

    init() {
      this.parent.style.overflow = 'hidden';
      this._svg = this._createSvg();
      this._wrapper = this._createDiv('wrapper');
      this._top = this._createDiv('top');
      this._bottom = this._createDiv('bottom');

      this.parent.append(this._wrapper, this._top, this._svg, this._bottom);
      this.setRate(0);

      return this;
    }

    setRate(rate) {
      this.rate = rate;
      this.changeWaterLevel();
    }

    changeWaterLevel() {
      const parentHeight = this.parent.clientHeight;
      this._top.style.height = `${parentHeight * (100 - this.rate) / 100 - this._svg.height.baseVal.value}px`;
    }

    _createDiv(idName) {
      const div = document.createElement('div');
      div.setAttribute('id', idName);

      return div;
    }

    draw() {

    }

    _createSvg() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('editorial');
      svg.setAttributeNS(null, 'viewBox', "0 10 20 28");
      svg.setAttributeNS(null, 'preserveAspectRatio', 'none');
      svg.style.display = 'block';
      svg.style.width = '100%';
      svg.style.height = '10em';
      svg.style.maxHeight = '100vh';
      svg.style.margin = 0;
      svg.innerHTML = svgString;

      return svg;
    }
  }

  return function (parent) {
    return new Wave(parent).init();
  }
})();
