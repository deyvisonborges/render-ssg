import axios from "axios"
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next"
import Image from "next/image"
import { useRouter } from "next/router"


type MemberProps = {
  login: string
}

type ParamsProps = {
  login?: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await axios.get(`https://api.github.com/orgs/rocketseat/members`)
    const paths = data.map((member: MemberProps) => ({ params: { login: member.login.toString() } }))
    return {
      paths,
      fallback: true,
    }
  }
  catch {
    return { paths: [{ params: {} as ParamsProps }], fallback: false };
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext<ParamsProps>) => {
  try {
    const login = context.params?.login
    if (!login) return { props: { errorMessage: "algo deu errado" } }

    const { data } = await axios.get(`https://api.github.com/users/${login}`)

    return {
      props: {
        user: data?.data || {} as MemberProps
      }
    }
  }
  catch (error: any) {
    return {
      props: {
        error: error?.response?.status || ""
      },
      notFound: false
    }
  }
}


export default function Member({ user, error, errorMessage }: any) {
  const { query, isFallback } = useRouter()


  console.log(user, error, errorMessage, "sodkfwekoprkweopk")

  if (errorMessage) return <p>{errorMessage}</p>

  if ([401, 403, 404, 500].includes(error)) {
    return <p>nao foi possivel gerar essa pagina</p>
  }
  if (isFallback) return <p>Carregando...</p>

  return (
    <>
      <h1>{query.login}</h1>
      <p>{user.name}</p>
      <p>{user.bio}</p>
    </>
  )
}

