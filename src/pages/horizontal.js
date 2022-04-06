import React, { Component } from "react";
import { PhotoSlider } from 'react-photo-view'
import styles from './style.module.scss';
import img1 from '../static/images/1.jpg'
import img2 from '../static/images/2.jpg'
import img3 from '../static/images/3.jpg'
import img4 from '../static/images/4.jpg'
import img5 from '../static/images/5.jpg'
import img6 from '../static/images/6.jpg'
import img7 from '../static/images/7.jpg'
import img8 from '../static/images/8.jpg'
import img9 from '../static/images/9.jpg'
import img10 from '../static/images/10.jpg'
import img11 from '../static/images/11.jpg'
import img12 from '../static/images/12.jpg'
import img13 from '../static/images/13.jpg'
import img14 from '../static/images/14.jpeg'
import img15 from '../static/images/15.jpeg'

const data = [
  {
    id: 1,
    url: img1,
    width: 900,
    height: 1200,
  },
  {
    id: 2,
    url: img2,
    width: 1200,
    height: 1200,
  },
  {
    id: 3,
    url: img3,
    width: 1200,
    height: 800,
  },
  {
    id: 4,
    url: img4,
    width: 1200,
    height: 1200,
  },
  {
    id: 5,
    url: img5,
    width: 1200,
    height: 800,
  },
  {
    id: 6,
    url: img6,
    width: 1200,
    height: 1200,
  },
  {
    id: 7,
    url: img7,
    width: 900,
    height: 1200,
  },
  {
    id: 8,
    url: img8,
    width: 1200,
    height: 800,
  },
  {
    id: 9,
    url: img9,
    width: 1200,
    height: 900,
  },
  {
    id: 10,
    url: img10,
    width: 1600,
    height: 1067,
  },
  {
    id: 11,
    url: img11,
    width: 1000,
    height: 1346,
  },
  {
    id: 12,
    url: img12,
    width: 690,
    height: 539,
  },
  {
    id: 13,
    url: img13,
    width: 1600,
    height: 900,
  },
  {
    id: 14,
    url: img14,
    width: 1280,
    height: 851,
  },
  {
    id: 15,
    url: img15,
    width: 1280,
    height: 884,
  },
]
class Horizontal extends Component {
  constructor() {
    super();
    this.state = {
      list: data,
      visible: false,
      photoIndex: 0,
    };
  }
  componentDidMount() {
    // console.log(this.state)
  }
  handleOpenSlider = (e, index) => {
    this.setState({
      visible: true,
      photoIndex: index,
    })
  }
  handleCloseSlider = () => {
    this.setState({
      visible: false
    })
  }
  setPhotoIndex = (index) => {
    this.setState({
      photoIndex: index
    })
  }

  render() {
    const { list, visible, photoIndex } = this.state
    const itemList = list.map((v, i)=> {
      const w = v.width*200/v.height
      return (
        <div 
          className={styles.item} 
          key={v.id}
          style={{ width: w, flexGrow: w }}
          onClick={(e) => this.handleOpenSlider(e, i)}
        >
          <i style={{ paddingBottom: `${v.height/v.width*100}%` }}></i>
          <img src={v.url} alt="" />
        </div>
      )
    })
    const images = list.map(v => ({ src: v.url, key: v.id }))
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Horizontal Waterfall</h2>
        </div>
        <section className={styles.wrapper}>
          {itemList}
        </section>
        <PhotoSlider 
          images={images}
          visible={visible}
          maskOpacity={0.75}
          onClose={this.handleCloseSlider}
          index={photoIndex}
          onIndexChange={this.setPhotoIndex}
        />
      </div>
    )
  }
}
export default Horizontal