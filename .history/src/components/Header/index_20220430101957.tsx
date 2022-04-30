import { SignInButton } from '../SignInButton'
import Link from 'next/link'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { ActiveLink } from '../ActiveLink'

export function Header () {
  const { asPath } = useRouter()

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src='/imagens/logo.svg' alt='Logo do ig.news' />
        <nav>
          <ActiveLink activeClassName={styles.active} href='/'>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href='/posts' prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}