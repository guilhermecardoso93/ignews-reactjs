import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

export default function Post () {
  return <h1>Teste</h1>
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {
  const session = await getSession({ req })

 /* if(!session ){

  }*/
}F
