import React from "react"
import styles from "./index.module.css"
import empty from "../../assets/imgs/empty.png"

const NoData = () => {
	return (
		<>
			<div className={styles.noData}>Not thing to see here</div>
			<img src={empty} className={styles.emptyImg} alt="empty" />
		</>
	)
}

export default NoData
