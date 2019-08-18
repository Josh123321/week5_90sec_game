import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Image, Group } from 'react-konva';
import Konva from 'konva';
import useImage from 'use-image';



class ColoredRect extends React.Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

const SwimmingPool = () => {
  const [image] = useImage(`${process.env.PUBLIC_URL}/images/img_BG.png`);
  const poolWidth = 750;
  return <Image
    image={image}
    x={window.innerWidth / 2 - poolWidth / 2}
    y={0}
    width={poolWidth}
    height={window.innerHeight}
  />;
};

const Duck = ({ moveX = 0, moveY = 0 }) => {
  const [image] = useImage(`${process.env.PUBLIC_URL}/images/duck_normal_01.png`);
  const duckWidth = 180;
  const duckHeight = 160;
  return <Image
    image={image}
    width={duckWidth}
    height={duckHeight}
    x={window.innerWidth / 2 - duckWidth / 2 + moveX}
    y={window.innerHeight / 2 + duckHeight * 1.25 + moveY}
  />
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moveX: 0,
      moveY: 0
    }

    this.duckKeyboardMove = this.duckKeyboardMove.bind(this);
    this.duckGoFoward = this.duckGoFoward.bind(this);
  }

  componentDidMount() {
    // window.addEventListener(keyu)
    document.addEventListener('keyup', (e) => {
      this.duckKeyboardMove(e)
    });

    setInterval(this.duckGoFoward,1000);
  }

  componentWillMount() {
    document.removeEventListener('keyup', (e) => {
      this.duckKeyboardMove(e)
    });
  }

  duckKeyboardMove(e) {
    let { moveX } = this.state;
    console.log(e);
    if (e.keyCode === 39 || e.keyCode === 37) {
      let position = e.keyCode === 39 ? 1 : -1;
      // 檢核是否超出游泳池
      // if (user.x >= 620 && position === 1) return; // 右邊界
      // if (user.x <= 180 && position === -1) return; // 左邊界
      moveX += 50 * position;
    }
    this.setState({ moveX });
  }

  duckGoFoward() {
    let { moveY } = this.state;
    moveY-=80;
    this.setState({moveY});
  }

  render() {
    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <SwimmingPool />
          <Duck moveX={this.state.moveX} moveY={this.state.moveY}/>
        </Layer>

      </Stage>
    );
  }
}

export default App;