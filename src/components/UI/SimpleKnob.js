import React from 'react';

/* STEPS

1. register mouse & touch events
2. find centerpoint of disc
3. calcuate angle of mouse position
4. convert to a value
5. handle value

*/

class SimpleKnob extends React.Component {

  isActive=0;
  centerpoint=[0,0];
  actualRotation=-45;
  maxAngle=270;
  max=100;
  min=0;
  value=0;
  activeKnob=false;
  direction="increase";

  constructor (props){
    super(props);
    this.begin = this.begin.bind(this);
    this.release = this.release.bind(this);
    this.move = this.move.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  componentDidMount() {
    this.AddEventListeners();
    (this.props.id)?this.activeKnob=document.getElementById(this.props.id):console.error("Knobs require an ID property");
    (typeof this.props.min !=="undefined")?this.min=this.props.min: console.error("Knobs require a 'min' property");
    (this.props.max)?this.max=this.props.max: console.error("Knobs require a 'max' property");
  }

  AddEventListeners=function(){

		window.addEventListener("mouseup", this.release);
		window.addEventListener("mousemove", this.move);
		window.addEventListener("touchstop", this.release, {passive:false});
		window.addEventListener("touchmove", this.move, {passive:false});

	}

  findCenterpoint=function(){

    let topPos = this.activeKnob.getBoundingClientRect().top ;
    let leftPos = this.activeKnob.getBoundingClientRect().left + window.scrollX;
    let w=this.activeKnob.clientWidth;
    let h=this.activeKnob.clientHeight;
    let y=topPos+(h/2);
    let x=leftPos+(w/2);

    this.centerpoint=[x,y];
  }

/*from: https://gist.github.com/conorbuck/2606166 */
findAngle=function(mouseX,mouseY){

  //use to determin direction of knob
  let lastRotation=this.rotation;

  let p1 = {
    x: this.centerpoint[0],
    y: this.centerpoint[1]
  };

  let p2 = {
    x: mouseX,
    y: mouseY
  };

  // angle in degrees
  this.rotation = parseInt(Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI)+180;

  if(this.rotation>this.maxAngle && this.direction==="increase"){
    this.props.adjustKnob(this.maxAngle);
  } else if(this.rotation>this.maxAngle && this.direction==="decrease"){
    this.props.adjustKnob(0);
  } else {
    if (this.rotation<lastRotation){
      this.direction="decrease";
    } else if (this.rotation>lastRotation){
      this.direction="increase";
    }
    this.props.adjustKnob(this.rotation);
  }

}

findValue=function(){
  var range=this.max-this.min;
  var ratio=range/this.maxAngle;
  this.value=parseInt((this.props.rotation*ratio)+this.min);
}

outputData=function(){
  if(this.activeKnob){
  //  this.activeKnob.querySelector('.marker').style.transform="rotate("+this.knobRotation+"deg)";
    this.activeKnob.querySelector('input').value=this.value;
    (this.props.action)? this.props.action(this.value):console.error("an 'action' handler prop must be assigned to SimpleKnob element");
  }
}

  /* listeners */

begin=function(e){
  e.preventDefault();
  if(this.activeKnob){
    this.isActive=1;
    this.findCenterpoint();
    this.findAngle(e.clientX, e.clientY);
    this.findValue();
    this.outputData();
  }
}

release=function(e){
  if(this.isActive){
    e.preventDefault();
    this.isActive=0;
  }
}

move=function(e){
    if(this.isActive){
      e.preventDefault();
      let x,y;

      if(e.type==="mousemove"){
        x=e.clientX;
        y=e.clientY;
      } else {
        x=e.changedTouches[0].clientX;
        y=e.changedTouches[0].clientY;
      }

      this.findAngle(x, y);
      this.findValue();
      this.outputData();
    }
  }

  inputHandler=function(){
    this.value=this.target.value;
    this.findAngleFromValue();
    this.outputData();
  }


render (){
  return <div className='simpleKnob' id={this.props.id}>
    <div className='groupTitle'>{this.props.label}</div>
		<button className='disc'
      onMouseDown={this.begin}
      onTouchStart={this.begin}
    >
    <div className='inner'><div className='marker' style={{transform:"rotate("+this.props.rotation+"deg)"}}></div></div></button>
		<input type='text' value='0' onChange={this.inputHandler} />
	</div>
  }
}

export default SimpleKnob;
