import { GetServerSideProps, GetStaticProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'
import { getPrismicClient } from '../../../services/prismic'

import styles from "../post.module.scss";

interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export default function PostPreview ({ post }: PostPreviewProps) {
  const[session] = useSession()
  const router = useRouter()

  useEffect(()=>{}, [])
  
  return (
    <>
      <Head>
        <title>{post.title} | Ignews </title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href='/'>
              <a>Subscribe now!😉</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
