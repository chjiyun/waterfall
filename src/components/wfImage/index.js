import React, { useState } from "react";
import classNames from 'classnames';
import styles from './index.module.scss';

const WfImage = (probs) => {
  const [status, setStatus] = useState(false)
  // 加载完成
  const imageOnLoad = (e) => {
    // console.log(probs.id, e.timeStamp)
    setStatus(true)
  }

  return (
    <div className={styles.wrapper}>
      <a className={styles.link} target="_blank">
        <img className={status ? '' : 'blur' } src={probs.url} alt="" onLoad={imageOnLoad}/>
        <div className={styles.cover}></div>
        <div className={styles.top}>
          <span className={classNames(styles.tag, "tag-img-type")}>{probs.type}</span>
          <span className={classNames(styles.tag, "tag-resolution-ratio")}>
            {`${probs.width} x ${probs.height}`}
          </span>
        </div>
        <div className={styles.info}>
          <div className={styles["img-title"]}>这是图片备注。</div>
        </div>
      </a>
    </div>
  )
}
export default WfImage