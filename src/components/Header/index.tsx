import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header(){
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/imagens/logo.svg" alt="Logo do ig.news" />
        <nav>
          <a href="http://" target="_blank" className={styles.active}>Home</a>
          <a href="http://" target="_blank">Posts</a>
        </nav>
        <SignInButton/>
      </div>
    </header>
  )
}