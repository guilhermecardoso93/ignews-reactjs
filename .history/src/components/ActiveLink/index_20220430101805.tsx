import Link, { LinkProps } from 'next/link'
import { ReactElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string
}

export function ActionLink({children, activeClassName, ...rest}: ActiveLinkProps){
  return (
    <Link { ...rest}>
    {children}
    </Link>
  )
}