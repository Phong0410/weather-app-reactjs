import React from "react"
import styles from "./index.module.css"

const NoData = () => {
	return (
		<>
			<div className={styles.noData}>Not thing to see here</div>
			<img src="/empty.png" alt="empty" className={styles.emptyImg} />
		</>
	)
}

export default NoData
