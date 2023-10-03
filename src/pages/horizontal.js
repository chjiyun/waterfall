import React, { Component } from "react";
import { PhotoSlider } from 'react-photo-view'
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
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
import img16 from '../static/images/16.jpg'
import img17 from '../static/images/17.jpg'
import img18 from '../static/images/18.jpg'
import img19 from '../static/images/19.jpg'

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
  {
    id: 16,
    url: img16,
    width: 1365,
    height: 2048,
  },
  {
    id: 17,
    url: img17,
    width: 1920,
    height: 1080,
  },
  {
    id: 18,
    url: img18,
    width: 1920,
    height: 1126,
  },
  {
    id: 19,
    url: img19,
    width: 1920,
    height: 1080,
  },
]
// 计算每个图片的缩放后的宽度
function calculate(source, contentWidth, baseHeight, margin= 8) {
  source.forEach((v, i) => {
    v.aspectRatio = v.width / v.height
    v.index = i
  })
  const data = [[]]
  let i = 0
  // 每行图片宽度累加值
  let width = 0
  for (const item of source) {
    const imgWidth = baseHeight * item.aspectRatio
    width += imgWidth
    //如果每行图片累加宽度大于容器宽度，去掉多余的宽度，整体进行缩放适应容器让右边对齐
    if (width > contentWidth) {
      // 减去边距
      const cw = contentWidth - (data[i].length - 1) * margin
      width -= imgWidth
      // 缩放后的高
      const height = baseHeight * cw / width
      data[i].forEach(v => {
        v.rw = v.aspectRatio * height
        v.rh = height
      })
      width = imgWidth
      i++
      data[i] = []
    }
    data[i].push({
      ...item,
      rw: imgWidth,
      rh: baseHeight,
      row: i,
    })
  }
  let left = 0
  let top = 0
  const dataLength = data.length
  for (let i = 0; i < dataLength; i++) {
    data[i].forEach(v => {
      v.left = left
      v.top = top
      left += v.rw + margin
    })
    left = 0
    top += data[i][0].rh + margin
  }
  return data
}

class Horizontal extends Component {
  constructor() {
    super();
    this.state = {
      list: data,
      visible: false,
      photoIndex: 0,
      datas: [], //用二维数组保存每一行数据
      baseHeight: 300, //每一行的基础高度
      margin: 8,
      contentHeight: 0,
      contentWidth: 0,
      loading: false,
    };
    this.source = []
    this.onResize = debounce(this.onResize, 400)
    this.onScroll = throttle(this.onScroll, 400)
    // 300: 基础高度 200：最小基础高度
    this.decreaseUnit = (1600-300)/(300 - 100)
  }
  componentDidMount() {
    this.fetchData()
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
  }
  
  renderData = () => {
    const contentWidth = this.wrapperRef.clientWidth
    console.log(contentWidth)
    let { baseHeight, margin } = this.state
    // 最小基础高度：200
    baseHeight = baseHeight - (1600-contentWidth) / this.decreaseUnit
    const datas = calculate(this.source, contentWidth, baseHeight, margin)
    let contentHeight = datas.reduce((res, cur) => {
      return res + cur[0].rh
    }, 0)
    // 加上边距
    contentHeight += (datas.length - 1) * margin
    this.setState({
      datas: datas.flat(),
      contentHeight,
      contentWidth,
      loading: false,
    })
  }
  
  onResize = () => {
    this.renderData()
  }

  // 滚动无限加载
  onScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const { loading } = this.state
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      console.log(scrollTop, clientHeight, scrollHeight)
      console.log('Almost to the end')
      this.setState({ loading: true })
      setTimeout(this.fetchData, 1500)
    }
  }
  // 拉取数据
  fetchData = () => {
    let id = 0
    if (this.source.length > 0) {
      id = this.source[this.source.length-1].id
    }
    const newData = data.map(v => {
      id++
      return {
        ...v,
        id,
      }
    })
    this.source.push(...newData)
    this.renderData()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.wrapperRef.clientWidth)
  //   if (prevState.contentWidth !== this.state.contentWidth) {
  //     this.onResize()
  //   }
  // }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  saveWrapperRef = (ref) => {
    this.wrapperRef = ref
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
    const { list, visible, photoIndex, datas, margin, contentHeight, loading } = this.state
    // const itemList = list.map((v, i)=> {
    //   const w = v.width*300/v.height
    //   return (
    //     <div 
    //       className={styles.item} 
    //       key={v.id}
    //       style={{ width: w, flexGrow: w }}
    //       onClick={(e) => this.handleOpenSlider(e, i)}
    //     >
    //       <i style={{ paddingBottom: `${v.height/v.width*100}%` }}></i>
    //       <img src={v.url} alt="" />
    //     </div>
    //   )
    // })
    const imgList = datas.map(v => {
      return (
        <div 
          className={styles["justified-layout-item"]} 
          onClick={(e) => this.handleOpenSlider(e, v.index)} 
          key={v.id}
          style={{ width: v.rw, height: v.rh, left: v.left, top: v.top }}
        >
          <img src={v.url} alt="" />
        </div>
      )
    })
    const images = datas.map(v => ({ src: v.url, key: v.id }))
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Horizontal Waterfall</h2>
        </div>
        {/* <div className={styles.wrapper} >
          {itemList}
        </div> */}
        <div className={styles["justified-layout"]} ref={this.saveWrapperRef} style={{ height: contentHeight }}>
          {imgList}
        </div>
        <div className={styles.loading} style={{ display: loading ? null : 'none' }}>
          <div className="loading-dot"></div>
        </div>
        <div className={styles.pagination}></div>
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