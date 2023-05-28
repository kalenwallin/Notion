// components/LikeButton.tsx
import React, { useEffect, useState } from 'react'

import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart'
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart'

import styles from './styles.module.css'

type LikeButtonProps = {
  title: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ title }) => {
  const endpoint = 'https://likes.kalenwallin.workers.dev/'
  const [likes, setLikes] = useState(0)
  const [likeAdded, setLikeAdded] = useState(false)

  useEffect(() => {
    loadLikes()
  })

  const loadLikes = async () => {
    const res = await fetch(`${endpoint}?title=${title}`)
    const data = await res.json()
    setLikes(data.likes)
  }

  const postLike = async () => {
    if (!likeAdded) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })

      const data = await response.json()
      setLikes(data.likes)
      setLikeAdded(true)
    } else {
      // Remove like
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      })

      const data = await response.json()
      setLikes(data.likes - 1)
      setLikeAdded(false)
    }
  }

  return (
    <div
      className={styles.likeButton}
      style={{ '--likes': likes } as React.CSSProperties}
    >
      {likes > 0 && <p>{likes}</p>}
      <button onClick={() => postLike()}>
        {!likeAdded ? <AiOutlineHeart /> : <AiFillHeart />}
      </button>
    </div>
  )
}

export default LikeButton
