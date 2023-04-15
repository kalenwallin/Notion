import * as React from 'react'

import styles from './styles.module.css'

export const Loading: React.FC = () => (
  <div className={styles.loadingContainer}>
    <object
      className={styles.loadingContainer}
      type='image/svg+xml'
      data='/ball_logo.svg'
    ></object>
  </div>
)
