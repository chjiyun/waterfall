import React from "react";
import classNames from 'classnames';
import styles from './index.module.scss';

const WfImage = (probs) => {

  return (
    <div className={styles.wrapper}>
      <a className={styles.link} target="_blank">
        <img src={probs.url} alt="" />
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